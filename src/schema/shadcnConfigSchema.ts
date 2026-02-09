export interface ReadmeComponentItem {
  name: string;
  markdown: string;
}

export interface ReadmeComponent {
  title: string;
  description?: string;
  items: ReadmeComponentItem[];
}

export function validateShadcnConfig(config: any): void {
  if (typeof config !== "object" || config === null) {
    throw new Error("components.json must be an object");
  }

  if (typeof config.style !== "string") {
    throw new Error("components.json: 'style' must be a string");
  }

  if (typeof config.rsc !== "boolean") {
    throw new Error("components.json: 'rsc' must be a boolean");
  }

  if (typeof config.tsx !== "boolean") {
    throw new Error("components.json: 'tsx' must be a boolean");
  }

  if (!config.tailwind || typeof config.tailwind !== "object") {
    throw new Error("components.json: missing or invalid 'tailwind' config");
  }

  if (!config.aliases || typeof config.aliases !== "object") {
    throw new Error("components.json: missing or invalid 'aliases' config");
  }

  if (typeof config.iconLibrary !== "string") {
    throw new Error("components.json: 'iconLibrary' must be a string");
  }
}