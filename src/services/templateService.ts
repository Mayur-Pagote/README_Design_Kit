import type { Template, TemplateCategory, TemplateFilter, TemplateMetadata } from '@/types/templates';
import { sampleTemplates } from '@/data/templates';

class TemplateService {
  private templates: Template[] = [...sampleTemplates];

  // Get all templates
  getTemplates(): Template[] {
    return this.templates;
  }

  // Get template by ID
  getTemplateById(id: string): Template | undefined {
    return this.templates.find(template => template.id === id);
  }

  // Filter templates
  filterTemplates(filter: TemplateFilter): Template[] {
    return this.templates.filter(template => {
      const matchesCategory = !filter.category || template.category === filter.category;
      const matchesTags = !filter.tags || filter.tags.every(tag => template.tags.includes(tag));      const matchesSearch = !filter.search || 
        template.name.toLowerCase().includes(filter.search.toLowerCase()) ||
        template.description.toLowerCase().includes(filter.search.toLowerCase()) ||
        template.tags.some(tag => tag.toLowerCase().includes(filter.search!.toLowerCase()));
      const matchesFeatured = filter.featured === undefined || template.featured === filter.featured;

      return matchesCategory && matchesTags && matchesSearch && matchesFeatured;
    });
  }

  // Get featured templates
  getFeaturedTemplates(): Template[] {
    return this.templates.filter(template => template.featured);
  }

  // Get templates by category
  getTemplatesByCategory(category: TemplateCategory): Template[] {
    return this.templates.filter(template => template.category === category);
  }

  // Search templates
  searchTemplates(query: string): Template[] {
    const lowerQuery = query.toLowerCase();
    return this.templates.filter(template => 
      template.name.toLowerCase().includes(lowerQuery) ||
      template.description.toLowerCase().includes(lowerQuery) ||
      template.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
      template.author.toLowerCase().includes(lowerQuery)
    );
  }

  // Get template metadata
  getTemplateMetadata(): TemplateMetadata {
    const totalTemplates = this.templates.length;
    
    const categoryCounts = this.templates.reduce((acc, template) => {
      acc[template.category] = (acc[template.category] || 0) + 1;
      return acc;
    }, {} as Record<TemplateCategory, number>);

    const categories = Object.entries(categoryCounts).map(([category, count]) => ({
      category: category as TemplateCategory,
      count,
    }));

    const tagCounts = this.templates.reduce((acc, template) => {
      template.tags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    const popularTags = Object.entries(tagCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 20)
      .map(([tag, count]) => ({ tag, count }));

    return {
      totalTemplates,
      categories,
      popularTags,
    };
  }

  // Get popular templates (by popularity score)
  getPopularTemplates(limit: number = 10): Template[] {
    return this.templates
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, limit);
  }

  // Get recently updated templates
  getRecentlyUpdatedTemplates(limit: number = 5): Template[] {
    return this.templates
      .sort((a, b) => b.updated.getTime() - a.updated.getTime())
      .slice(0, limit);
  }

  // Get template suggestions based on a given template
  getSuggestedTemplates(templateId: string, limit: number = 3): Template[] {
    const template = this.getTemplateById(templateId);
    if (!template) return [];

    // Find templates with similar tags or category
    const suggestions = this.templates
      .filter(t => t.id !== templateId)
      .map(t => {
        let score = 0;
        
        // Same category gets higher score
        if (t.category === template.category) score += 3;
        
        // Shared tags get points
        const sharedTags = t.tags.filter(tag => template.tags.includes(tag));
        score += sharedTags.length;
        
        // Featured templates get slight boost
        if (t.featured) score += 1;
        
        return { template: t, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(({ template }) => template);

    return suggestions;
  }

  // Clone a template with new ID
  cloneTemplate(templateId: string, newName?: string): Template | null {
    const original = this.getTemplateById(templateId);
    if (!original) return null;

    const clone: Template = {
      ...original,
      id: `${original.id}-clone-${Date.now()}`,
      name: newName || `${original.name} (Copy)`,
      created: new Date(),
      updated: new Date(),
      featured: false,
      popularity: 0,
    };

    this.templates.push(clone);
    return clone;
  }
}

// Export singleton instance
export const templateService = new TemplateService();
