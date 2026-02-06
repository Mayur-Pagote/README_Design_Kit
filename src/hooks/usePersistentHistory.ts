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
  // Main state (Present)
  const [present, setPresent] = useState<T>(initialState);
  
  // History state (Past/Future/Checkpoints)
  const [history, setHistory] = useState<HistoryState<T>>({
    past: [],
    future: [],
    checkpoints: [],
  });

  // Load from storage on mount
  useEffect(() => {
    const storedHistory = loadFromStorage<HistoryState<T>>(`${key}-history`);
    const storedPresent = loadFromStorage<T>(`${key}-present`);

    if (storedPresent) {
      setPresent(storedPresent);
    }
    if (storedHistory) {
      setHistory(storedHistory);
    }
  }, [key]);

  // Persist state changes (Debounced ideally, but direct for now)
  useEffect(() => {
    saveToStorage(`${key}-present`, present);
    saveToStorage(`${key}-history`, history);
  }, [present, history, key]);

  const canUndo = history.past.length > 0;
  const canRedo = history.future.length > 0;

  const setState = useCallback((newState: T | ((prev: T) => T)) => {
    setPresent((currPresent) => {
      const resolvedState = newState instanceof Function ? newState(currPresent) : newState;

      if (JSON.stringify(resolvedState) === JSON.stringify(currPresent)) {
        return currPresent;
      }

      // Calculate diff from Current -> New (to store in Past? No, we need New -> Current to undo)
      // To Undo: We need a patch that turns New -> Old.
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
        // Apply the undo patch to get back to previous state
        const prevPresent = applyPatch(currPresent, lastPatch);
        
        // Calculate redo patch (Old -> Current) before switching
        const redoPatch = getDiff(prevPresent, currPresent);
        
        // Update future with the reverse patch
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
        
        // Calculate undo patch (New -> Old) to put back in past
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
      data: present, // Store full state for checkpoints
    };

    setHistory((curr) => ({
      ...curr,
      checkpoints: [...curr.checkpoints, newCheckpoint],
    }));
  }, [present]);

  const restoreCheckpoint = useCallback((id: string) => {
    const checkpoint = history.checkpoints.find((cp) => cp.id === id);
    if (checkpoint) {
      // Treating a checkpoint restore like a new action (so you can undo it)
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