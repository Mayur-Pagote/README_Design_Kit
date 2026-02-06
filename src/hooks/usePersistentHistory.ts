import { useState, useCallback, useEffect, useRef } from 'react';
import { getDiff, applyPatch, type Patch, saveToStorage, loadFromStorage } from '@/utils/historyUtils';

interface Checkpoint<T> {
  id: string;
  name: string;
  timestamp: number;
  data: T;
}

interface HistoryState<T> {
  past: Patch[][]; // Store diffs instead of full states
  future: Patch[][];
  checkpoints: Checkpoint<T>[];
}

const MAX_HISTORY = 50; // Limit history depth

export function usePersistentHistory<T extends object>(key: string, initialState: T) {
  // 1. Lazy Initialization: Load from storage immediately during initialization
  const [present, setPresent] = useState<T>(() => {
    const stored = loadFromStorage<T>(`${key}-present`);
    return stored !== null ? stored : initialState;
  });
  
  const [history, setHistory] = useState<HistoryState<T>>(() => {
    const stored = loadFromStorage<HistoryState<T>>(`${key}-history`);
    return stored !== null ? stored : {
      past: [],
      future: [],
      checkpoints: [],
    };
  });

  // Ref to track if we've done the initial load to prevent saving defaults over storage
  // (Extra safety, though lazy init usually handles this)
  const isMounted = useRef(false);

  // 2. Persist state changes
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    saveToStorage(`${key}-present`, present);
    saveToStorage(`${key}-history`, history);
  }, [present, history, key]);

  const canUndo = history.past.length > 0;
  const canRedo = history.future.length > 0;

  const setState = useCallback((newState: T | ((prev: T) => T)) => {
    setPresent((currPresent) => {
      const resolvedState = newState instanceof Function ? newState(currPresent) : newState;

      // Equality check to prevent useless history entries
      if (JSON.stringify(resolvedState) === JSON.stringify(currPresent)) {
        return currPresent;
      }

      // Calculate diff from New -> Current (Undo Patch)
      const undoPatch = getDiff(resolvedState, currPresent);

      setHistory((currHistory) => ({
        past: [...currHistory.past, undoPatch].slice(-MAX_HISTORY),
        future: [], // New change clears future
        checkpoints: currHistory.checkpoints,
      }));

      return resolvedState;
    });
  }, []);

  const undo = useCallback(() => {
    if (!canUndo) return;

    setHistory((curr) => {
      const lastPatch = curr.past[curr.past.length - 1];
      const newPast = curr.past.slice(0, -1);

      setPresent((currPresent) => {
        // Apply patch to revert state
        const prevPresent = applyPatch(currPresent, lastPatch);
        
        // Calculate redo patch (Old -> New)
        const redoPatch = getDiff(prevPresent, currPresent);
        
        curr.future = [redoPatch, ...curr.future]; 
        
        return prevPresent;
      });

      return { ...curr, past: newPast };
    });
  }, [canUndo]);

  const redo = useCallback(() => {
    if (!canRedo) return;

    setHistory((curr) => {
      const nextPatch = curr.future[0];
      const newFuture = curr.future.slice(1);

      setPresent((currPresent) => {
        const nextPresent = applyPatch(currPresent, nextPatch);
        
        // Calculate undo patch (New -> Old)
        const undoPatch = getDiff(nextPresent, currPresent);
        
        curr.past = [...curr.past, undoPatch];
        
        return nextPresent;
      });

      return { ...curr, future: newFuture };
    });
  }, [canRedo]);

  // Checkpoint Management
  const saveCheckpoint = useCallback((name: string) => {
    const newCheckpoint: Checkpoint<T> = {
      id: crypto.randomUUID(),
      name,
      timestamp: Date.now(),
      data: present,
    };

    setHistory((curr) => ({
      ...curr,
      checkpoints: [...curr.checkpoints, newCheckpoint],
    }));
    
    // Force immediate save for checkpoints
    saveToStorage(`${key}-history`, {
      ...history,
      checkpoints: [...history.checkpoints, newCheckpoint]
    });
  }, [present, history, key]);

  const restoreCheckpoint = useCallback((id: string) => {
    const checkpoint = history.checkpoints.find((cp) => cp.id === id);
    if (checkpoint) {
      setState(checkpoint.data);
    }
  }, [history.checkpoints, setState]);

  const deleteCheckpoint = useCallback((id: string) => {
    setHistory((curr) => ({
      ...curr,
      checkpoints: curr.checkpoints.filter((cp) => cp.id !== id),
    }));
  }, []);

  return {
    state: present,
    setState,
    undo,
    redo,
    canUndo,
    canRedo,
    checkpoints: history.checkpoints,
    saveCheckpoint,
    restoreCheckpoint,
    deleteCheckpoint,
  };
}