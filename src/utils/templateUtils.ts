import type { Template } from '@/types/templates';
import type { ElementType } from '@/types/elements';

export class TemplateUtils {
  /**
   * Clone template elements with new IDs to avoid conflicts
   */
  static cloneTemplateElements(template: Template): ElementType[] {
    return template.elements.map((element, index) => ({
      ...element,
      id: `${template.id}-element-${index}-${Date.now()}`,
    }));
  }

  /**
   * Generate unique element ID
   */
  static generateElementId(type: string): string {
    return `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Update element IDs in a template to ensure uniqueness
   */
  static refreshElementIds(elements: ElementType[]): ElementType[] {
    return elements.map(element => ({
      ...element,
      id: this.generateElementId(element.type),
    }));
  }

  /**
   * Validate template structure
   */
  static validateTemplate(template: Template): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!template.id) errors.push('Template must have an ID');
    if (!template.name) errors.push('Template must have a name');
    if (!template.elements || template.elements.length === 0) {
      errors.push('Template must have at least one element');
    }

    // Validate each element
    template.elements?.forEach((element, index) => {
      if (!element.id) errors.push(`Element at index ${index} must have an ID`);
      if (!element.type) errors.push(`Element at index ${index} must have a type`);
    });

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Merge template elements with existing elements
   */
  static mergeElements(existingElements: ElementType[], templateElements: ElementType[]): ElementType[] {
    const clonedTemplateElements = this.refreshElementIds(templateElements);
    return [...existingElements, ...clonedTemplateElements];
  }

  /**
   * Replace all elements with template elements
   */
  static replaceElements(templateElements: ElementType[]): ElementType[] {
    return this.refreshElementIds(templateElements);
  }

  /**
   * Insert template elements at specific position
   */
  static insertElementsAt(
    existingElements: ElementType[], 
    templateElements: ElementType[], 
    position: number
  ): ElementType[] {
    const clonedTemplateElements = this.refreshElementIds(templateElements);
    const result = [...existingElements];
    result.splice(position, 0, ...clonedTemplateElements);
    return result;
  }

  /**
   * Extract template data from elements (for saving as template)
   */
  static elementsToTemplate(
    elements: ElementType[],
    templateData: Partial<Template>
  ): Omit<Template, 'id' | 'created' | 'updated'> {
    return {
      name: templateData.name || 'Custom Template',
      description: templateData.description || 'A custom template created from elements',
      category: templateData.category || 'personal-projects',
      tags: templateData.tags || ['custom'],
      author: templateData.author || 'User',
      version: '1.0.0',
      popularity: 0,
      featured: false,
      thumbnail: templateData.thumbnail || '',
      elements: this.refreshElementIds(elements),
    };
  }

  /**
   * Get template statistics
   */
  static getTemplateStats(template: Template) {
    const elementTypes = template.elements.reduce((acc, element) => {
      acc[element.type] = (acc[element.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalElements: template.elements.length,
      elementTypes,
      estimatedReadTime: Math.ceil(template.elements.length * 0.5), // rough estimate in minutes
      complexity: template.elements.length > 10 ? 'complex' : template.elements.length > 5 ? 'medium' : 'simple',
    };
  }
}
