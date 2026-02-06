import diff from 'microdiff';

// Generic type for a patch
export type Patch = ReturnType<typeof diff>;

/**
 * Calculates the difference between two states.
 */
export function getDiff<T extends object>(oldState: T, newState: T): Patch {
  return diff(oldState, newState);
}

/**
 * Applies a patch to a state to produce a new state.
 * This is a simplified patch applicator for microdiff.
 */
export function applyPatch<T>(state: T, patch: Patch): T {
  // Deep clone to avoid mutation
  const newState = JSON.parse(JSON.stringify(state));

  patch.forEach((change) => {
    const path = change.path;
    let current: any = newState;
    
    // Navigate to the parent of the target property
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }

    const key = path[path.length - 1];

    if (change.type === 'CREATE' || change.type === 'CHANGE') {
      current[key] = change.value;
    } else if (change.type === 'REMOVE') {
      if (Array.isArray(current)) {
        // Handle array removal
        current.splice(Number(key), 1);
      } else {
        delete current[key];
      }
    }
  });

  return newState;
}

/**
 * Compress/Decompress helpers (Optional: Add LZ-String here if needed later)
 */
export const saveToStorage = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error("Storage quota exceeded", e);
  }
};

export const loadFromStorage = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (e) {
    return null;
  }
};