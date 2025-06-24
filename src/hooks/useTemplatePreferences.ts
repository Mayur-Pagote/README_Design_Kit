import { useState, useEffect } from 'react';
import type { UserTemplatePreferences } from '@/types/templates';

const STORAGE_KEY = 'readme-design-kit-template-preferences';

const defaultPreferences: UserTemplatePreferences = {
  favorites: [],
  recentlyUsed: [],
  recentlyViewed: [],
};

export function useTemplatePreferences() {
  const [preferences, setPreferences] = useState<UserTemplatePreferences>(defaultPreferences);

  // Load preferences from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedPreferences = JSON.parse(stored);
        setPreferences({ ...defaultPreferences, ...parsedPreferences });
      }
    } catch (error) {
      console.error('Error loading template preferences:', error);
    }
  }, []);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch (error) {
      console.error('Error saving template preferences:', error);
    }
  }, [preferences]);

  const addToFavorites = (templateId: string) => {
    setPreferences(prev => ({
      ...prev,
      favorites: [...prev.favorites.filter(id => id !== templateId), templateId],
    }));
  };

  const removeFromFavorites = (templateId: string) => {
    setPreferences(prev => ({
      ...prev,
      favorites: prev.favorites.filter(id => id !== templateId),
    }));
  };

  const toggleFavorite = (templateId: string) => {
    if (preferences.favorites.includes(templateId)) {
      removeFromFavorites(templateId);
    } else {
      addToFavorites(templateId);
    }
  };

  const addToRecentlyUsed = (templateId: string) => {
    setPreferences(prev => ({
      ...prev,
      recentlyUsed: [
        templateId,
        ...prev.recentlyUsed.filter(id => id !== templateId),
      ].slice(0, 10), // Keep only last 10
    }));
  };

  const addToRecentlyViewed = (templateId: string) => {
    setPreferences(prev => ({
      ...prev,
      recentlyViewed: [
        templateId,
        ...prev.recentlyViewed.filter(id => id !== templateId),
      ].slice(0, 20), // Keep only last 20
    }));
  };

  const clearPreferences = () => {
    setPreferences(defaultPreferences);
  };

  return {
    preferences,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    addToRecentlyUsed,
    addToRecentlyViewed,
    clearPreferences,
  };
}
