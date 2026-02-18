import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { ElementType } from '@/types/elements';
import { saveToStorage, loadFromStorage } from '@/utils/historyUtils';
import { toast } from 'sonner';

interface HistoryState {
  past: ElementType[][];
  present: ElementType[];
  future: ElementType[][];
}

interface HistoryContextType {
  state: ElementType[];
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
  commit: (newState: ElementType[]) => void;
  clearHistory: () => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

const STORAGE_KEY = 'readme_design_kit_history_v1';

export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<HistoryState>(() => {
    const saved = loadFromStorage<ElementType[]>(STORAGE_KEY);
    return {
      past: [],
      present: saved || [],
      future: [],
    };
  });

  // Persist to storage whenever present changes
  useEffect(() => {
    saveToStorage(STORAGE_KEY, history.present);
  }, [history.present]);

  const canUndo = history.past.length > 0;
  const canRedo = history.future.length > 0;

  const commit = useCallback((newState: ElementType[]) => {
    setHistory((prev) => {
      // Don't commit if identical to present
      if (JSON.stringify(prev.present) === JSON.stringify(newState)) return prev;

      return {
        past: [...prev.past, prev.present],
        present: newState,
        future: [],
      };
    });
  }, []);

  const undo = useCallback(() => {
    if (!canUndo) return;

    setHistory((prev) => {
      const newPast = [...prev.past];
      const lastState = newPast.pop()!;

      return {
        past: newPast,
        present: lastState,
        future: [prev.present, ...prev.future],
      };
    });
    toast.info('Undo successful');
  }, [canUndo]);

  const redo = useCallback(() => {
    if (!canRedo) return;

    setHistory((prev) => {
      const newFuture = [...prev.future];
      const nextState = newFuture.shift()!;

      return {
        past: [...prev.past, prev.present],
        present: nextState,
        future: newFuture,
      };
    });
    toast.info('Redo successful');
  }, [canRedo]);

  const clearHistory = useCallback(() => {
    setHistory((prev) => ({
      past: [],
      present: prev.present,
      future: [],
    }));
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  const value = useMemo(() => ({
    state: history.present,
    canUndo,
    canRedo,
    undo,
    redo,
    commit,
    clearHistory,
  }), [history.present, canUndo, canRedo, undo, redo, commit, clearHistory]);

  return (
    <HistoryContext.Provider value={value}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (context === undefined) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
};
