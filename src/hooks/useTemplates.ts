import { useState, useEffect, useMemo } from 'react';
import { templateService } from '@/services/templateService';
import type { Template, TemplateCategory, TemplateFilter } from '@/types/templates';

export function useTemplates() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const allTemplates = templateService.getTemplates();
      setTemplates(allTemplates);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load templates');
      setLoading(false);
    }
  }, []);

  const getTemplateById = (id: string) => {
    return templateService.getTemplateById(id);
  };

  const filterTemplates = (filter: TemplateFilter) => {
    return templateService.filterTemplates(filter);
  };

  const searchTemplates = (query: string) => {
    return templateService.searchTemplates(query);
  };

  const getFeaturedTemplates = () => {
    return templateService.getFeaturedTemplates();
  };

  const getPopularTemplates = (limit?: number) => {
    return templateService.getPopularTemplates(limit);
  };

  const getSuggestedTemplates = (templateId: string, limit?: number) => {
    return templateService.getSuggestedTemplates(templateId, limit);
  };

  const getTemplatesByCategory = (category: TemplateCategory) => {
    return templateService.getTemplatesByCategory(category);
  };

  const getTemplateMetadata = () => {
    return templateService.getTemplateMetadata();
  };

  return {
    templates,
    loading,
    error,
    getTemplateById,
    filterTemplates,
    searchTemplates,
    getFeaturedTemplates,
    getPopularTemplates,
    getSuggestedTemplates,
    getTemplatesByCategory,
    getTemplateMetadata,
  };
}

export function useTemplate(id: string) {
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setTemplate(null);
      setLoading(false);
      return;
    }

    try {
      const foundTemplate = templateService.getTemplateById(id);
      setTemplate(foundTemplate || null);
      if (!foundTemplate) {
        setError(`Template with ID ${id} not found`);
      }
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load template');
      setLoading(false);
    }
  }, [id]);

  const suggestedTemplates = useMemo(() => {
    return template ? templateService.getSuggestedTemplates(template.id) : [];
  }, [template]);

  return {
    template,
    loading,
    error,
    suggestedTemplates,
  };
}
