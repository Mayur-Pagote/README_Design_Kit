import { useState, useCallback } from 'react';

export function useUndoRedo<T>(initialState: T) {
  const [states, setStates] = useState({
    past: [] as T[],
    present: initialState,
    future: [] as T[],
  });

  const canUndo = states.past.length > 0;
  const canRedo = states.future.length > 0;

  const undo = useCallback(() => {
    setStates((curr) => {
      if (curr.past.length === 0) return curr;
      
      const previous = curr.past[curr.past.length - 1];
      const newPast = curr.past.slice(0, curr.past.length - 1);
      
      return {
        past: newPast,
        present: previous,
        future: [curr.present, ...curr.future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    setStates((curr) => {
      if (curr.future.length === 0) return curr;
      
      const next = curr.future[0];
      const newFuture = curr.future.slice(1);
      
      return {
        past: [...curr.past, curr.present],
        present: next,
        future: newFuture,
      };
    });
  }, []);

  const setState = useCallback((newState: T | ((prev: T) => T)) => {
    setStates((curr) => {
      const resolvedState = newState instanceof Function ? newState(curr.present) : newState;
      
      // Prevent adding duplicate states to history
      if (JSON.stringify(resolvedState) === JSON.stringify(curr.present)) {
        return curr;
      }

      return {
        past: [...curr.past, curr.present],
        present: resolvedState,
        future: [], // Requirements: Adding a new state clears the redo stack
      };
    });
  }, []);

  return { 
    elements: states.present, 
    setElements: setState, 
    undo, 
    redo, 
    canUndo, 
    canRedo 
  };
}