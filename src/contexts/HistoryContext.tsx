import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { getDiff, applyPatch, type Patch, saveToStorage, loadFromStorage } from '@/utils/historyUtils';
import type { ElementType } from '@/types/elements';
import { toast } from 'sonner';

interface Checkpoint {
  id: string;
  name: string;
  timestamp: number;
  data: ElementType[];
}

interface HistoryState {
  past: Patch[];
  future: Patch[];
  checkpoints: Checkpoint[];
}

interface HistoryContextType {
  elements: ElementType[];
  setElements: (newState: ElementType[] | ((prev: ElementType[]) => ElementType[])) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  checkpoints: Checkpoint[];
  saveCheckpoint: (name: string) => void;
  restoreCheckpoint: (id: string) => void;
  deleteCheckpoint: (id: string) => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

const MAX_HISTORY = 50;
const STORAGE_KEY_PREFIX = 'readme-history-v2';

export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [elements, setElementsInternal] = useState<ElementType[]>(() => {
    const stored = loadFromStorage<ElementType[]>(`${STORAGE_KEY_PREFIX}-present`);
    return stored !== null ? stored : [];
  });

  const [history, setHistory] = useState<HistoryState>(() => {
    const stored = loadFromStorage<HistoryState>(`${STORAGE_KEY_PREFIX}-history`);
    return stored !== null ? stored : {
      past: [],
      future: [],
      checkpoints: [],
    };
  });

  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    saveToStorage(`${STORAGE_KEY_PREFIX}-present`, elements);
    saveToStorage(`${STORAGE_KEY_PREFIX}-history`, history);
  }, [elements, history]);

  const setElements = useCallback((newState: ElementType[] | ((prev: ElementType[]) => ElementType[])) => {
    setElementsInternal((currPresent) => {
      const resolvedState = newState instanceof Function ? newState(currPresent) : newState;

      if (JSON.stringify(resolvedState) === JSON.stringify(currPresent)) {
        return currPresent;
      }

      const undoPatch = getDiff(resolvedState, currPresent);

      setHistory((currHistory) => ({
        ...currHistory,
        past: [...currHistory.past, undoPatch].slice(-MAX_HISTORY),
        future: [],
      }));

      return resolvedState;
    });
  }, []);

  const undo = useCallback(() => {
    if (history.past.length === 0) return;

    const lastPatch = history.past[history.past.length - 1];
    const newPast = history.past.slice(0, -1);

    setElementsInternal((currPresent) => {
      const prevPresent = applyPatch(currPresent, lastPatch);
      const redoPatch = getDiff(prevPresent, currPresent);

      setHistory((currHistory) => ({
        ...currHistory,
        past: newPast,
        future: [redoPatch, ...currHistory.future].slice(0, MAX_HISTORY),
      }));

      return prevPresent;
    });
    toast.success('Undone');
  }, [history.past]);

  const redo = useCallback(() => {
    if (history.future.length === 0) return;

    const nextPatch = history.future[0];
    const newFuture = history.future.slice(1);

    setElementsInternal((currPresent) => {
      const nextPresent = applyPatch(currPresent, nextPatch);
      const undoPatch = getDiff(nextPresent, currPresent);

      setHistory((currHistory) => ({
        ...currHistory,
        past: [...currHistory.past, undoPatch].slice(-MAX_HISTORY),
        future: newFuture,
      }));

      return nextPresent;
    });
    toast.success('Redone');
  }, [history.future]);

  const saveCheckpoint = useCallback((name: string) => {
    const id = crypto.randomUUID();
    const newCheckpoint: Checkpoint = {
      id,
      name,
      timestamp: Date.now(),
      data: elements,
    };

    setHistory((curr) => ({
      ...curr,
      checkpoints: [...curr.checkpoints, newCheckpoint],
    }));
    toast.success(`Checkpoint "${name}" saved`);
  }, [elements]);

  const restoreCheckpoint = useCallback((id: string) => {
    const checkpoint = history.checkpoints.find((cp) => cp.id === id);
    if (checkpoint) {
      setElements(checkpoint.data);
      toast.success(`Restored "${checkpoint.name}"`);
    }
  }, [history.checkpoints, setElements]);

  const deleteCheckpoint = useCallback((id: string) => {
    setHistory((curr) => ({
      ...curr,
      checkpoints: curr.checkpoints.filter((cp) => cp.id !== id),
    }));
  }, []);

  const value = {
    elements,
    setElements,
    undo,
    redo,
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
    checkpoints: history.checkpoints,
    saveCheckpoint,
    restoreCheckpoint,
    deleteCheckpoint,
  };

  return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>;
};

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (context === undefined) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
};
