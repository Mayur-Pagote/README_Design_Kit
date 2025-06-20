# 📂 Project Files Documentation

This document provides a comprehensive overview of all files and directories in the README Design Kit project.

## 📋 Table of Contents

- [🚀 Core Files](#-core-files)
- [⚛️ Source Code (`src/`)](#️-source-code-src)
- [🎨 Public Assets (`public/`)](#-public-assets-public)
- [📚 Documentation](#-documentation)
- [⚙️ Configuration Files](#️-configuration-files)
- [🔧 Development Tools](#-development-tools)

---

## 🚀 Core Files

### `package.json`
- **Purpose**: Node.js project configuration and dependency management
- **Contains**: Project metadata, scripts, dependencies (React, TypeScript, Vite, Tailwind CSS, etc.)
- **Key Scripts**: 
  - `npm run dev` - Start development server
  - `npm run build` - Build for production
  - `npm run preview` - Preview production build

### `index.html`
- **Purpose**: Main HTML entry point for the React application
- **Contains**: Root div for React app, meta tags, favicon links

### `vite.config.ts`
- **Purpose**: Vite build tool configuration
- **Contains**: Build settings, plugins, path aliases

### `vercel.json`
- **Purpose**: Vercel deployment configuration
- **Contains**: SPA routing rules, security headers, cache policies

---

## ⚛️ Source Code (`src/`)

### `main.tsx`
- **Purpose**: Application entry point
- **Function**: Renders the root App component into the DOM

### `App.tsx`
- **Purpose**: Main application component
- **Contains**: Router setup, theme provider, query client configuration
- **Routes**: Home, Elements, Dashboard, Drag & Drop Editor, etc.

### `App.css` & `index.css`
- **Purpose**: Global application styles
- **Contains**: CSS reset, global styles, custom properties

### `vite-env.d.ts`
- **Purpose**: TypeScript environment declarations for Vite

---

## 📁 Components (`src/components/`)

### Layout Components
- **`Layout.tsx`** - Main layout wrapper with navbar and footer
- **`Header.tsx`** - Site header component
- **`Navbar.tsx`** - Navigation bar component
- **`Footer.tsx`** - Site footer component
- **`Sidebar.tsx`** - Sidebar navigation component

### Editor Components
- **`EditorCanvas.tsx`** - Main canvas for drag-and-drop editor
- **`ElementPalette.tsx`** - Palette of draggable elements
- **`ElementEditor.tsx`** - Element property editor
- **`ElementRenderer.tsx`** - Renders README elements
- **`DraggableElement.tsx`** - Wrapper for draggable elements
- **`SimpleDraggableElement.tsx`** - Simplified drag component

### UI Components
- **`ComponentCard.tsx`** - Card component for displaying elements
- **`PreviewGrid.tsx`** - Grid layout for previewing elements
- **`ReadmePreview.tsx`** - Live README preview component
- **`UserInput.tsx`** - User input form component
- **`theme-provider.tsx`** - Theme context provider

### UI Library (`src/components/ui/`)
- Contains reusable UI components built with Radix UI and styled with Tailwind CSS
- Includes: buttons, cards, dialogs, inputs, tooltips, etc.

---

## 📄 Pages (`src/pages/`)

### `Home.tsx`
- **Purpose**: Landing page component
- **Features**: Project introduction, quick start guide

### `Elements.tsx`
- **Purpose**: Browse and preview README elements
- **Features**: Element gallery, search, categories

### `Dashboard.tsx`
- **Purpose**: User dashboard (if authentication is implemented)
- **Features**: User projects, saved templates

### `DragDropEditor.tsx`
- **Purpose**: Interactive README builder
- **Features**: Drag & drop interface, live preview, export

### `ComingSoon.tsx`
- **Purpose**: Placeholder for upcoming features
- **Features**: Feature announcements, newsletter signup

### Legal Pages
- **`PrivacyPolicy.tsx`** - Privacy policy content
- **`TermsOfService.tsx`** - Terms of service content
- **`NotFound.tsx`** - 404 error page

---

## 🎨 Public Assets (`public/`)

### `Assets/`
Contains various graphics and icons used throughout the application:

#### Icons & Favicons
- `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`
- `apple-touch-icon.png`
- `android-chrome-192x192.png`, `android-chrome-512x512.png`
- `site.webmanifest` - Web app manifest

#### Emoji & Graphics
- **Faces**: `Confused Face.png`, `Nerd Face.png`, `Smiling.png`, `Thinking Face.png`, `Yawn.png`, etc.
- **Objects**: `Brain.png`, `Bug.png`, `Rocket.png`, `Star.png`, `Hot Cup.png`, etc.
- **Animations**: `Hand Waving.gif`, `Pixel Cat.gif`, `RGB Line*.gif`, etc.
- **Social Icons**: `discord.gif`, `facebook.gif`, `instagram.gif`, `linkedin.gif`

#### Decorative Elements
- **Lines**: `Blue Line.gif`, `RGB Line Thin.gif`, `Multicolor Static Line.png`
- **Effects**: `Flame.png`, `Comet.png`, `Spiral.png`

---

## 📚 Documentation

### `README.md`
- **Purpose**: Main project documentation
- **Contains**: Project overview, setup instructions, contribution guide

### `READMEelements.md`
- **Purpose**: Comprehensive guide to README elements
- **Contains**: Code snippets, examples, various README components

### `docs/files.md` (this file)
- **Purpose**: Technical documentation of project structure
- **Contains**: File descriptions, component purposes, directory organization

### Legal & Community Files
- **`LICENSE`** - MIT license terms
- **`CODE_OF_CONDUCT.md`** - Community guidelines
- **`CONTRIBUTING.md`** - Contribution guidelines
- **`SECURITY.md`** - Security policy

---

## ⚙️ Configuration Files

### TypeScript Configuration
- **`tsconfig.json`** - Base TypeScript configuration
- **`tsconfig.app.json`** - App-specific TypeScript settings
- **`tsconfig.node.json`** - Node.js TypeScript settings

### Linting & Formatting
- **`eslint.config.js`** - ESLint configuration for code quality

### Component Library
- **`components.json`** - Shadcn/ui component configuration

### Build & Development
- **`vite.config.ts`** - Vite bundler configuration
- **`vercel.json`** - Deployment configuration for Vercel

---

## 🗂️ Configuration & Data (`src/`)

### `config/elements.ts`
- **Purpose**: Configuration for README elements
- **Contains**: Element definitions, categories, properties

### `data/demo.ts`
- **Purpose**: Demo data for the application
- **Contains**: Sample projects, example configurations

### `hooks/use-mobile.ts`
- **Purpose**: Custom React hook for mobile detection
- **Function**: Responsive design utility

### `lib/utils.ts`
- **Purpose**: Utility functions
- **Contains**: Helper functions, common utilities

### `types/`
- **Purpose**: TypeScript type definitions
- **Contains**: Interface definitions, type declarations

### `theme/`
- **Purpose**: Theme configuration
- **Contains**: Color schemes, theme utilities

---

## 🔧 Development Tools

### Testing & Validation
- **`validate-vercel-config.js`** - Validates Vercel configuration
- **`test-vercel-config.html`** - Test file for deployment
- **`VERCEL_TEST_RESULTS.md`** - Test results documentation

### Project Assets
- **`rdk.svg`**, **`rdkf.svg`**, **`rdkt.svg`** - Project logo variants

---

## 🏗️ Architecture Overview

```
README_Design_Kit/
├── 📄 Core Files (package.json, index.html, etc.)
├── 📁 src/
│   ├── ⚛️ React Components
│   ├── 📄 Pages & Routes
│   ├── ⚙️ Configuration
│   └── 🎨 Styles & Assets
├── 📁 public/
│   └── 🖼️ Static Assets
├── 📁 docs/
│   └── 📚 Documentation
└── ⚙️ Config Files
```

This structure follows React best practices with:
- **Component-based architecture**
- **TypeScript for type safety**
- **Vite for fast development**
- **Tailwind CSS for styling**
- **Radix UI for accessible components**

---

## 🤝 Contributing to Files

When contributing to this project:

1. **Follow naming conventions**: Use PascalCase for components, camelCase for utilities
2. **Document new files**: Update this documentation when adding new files
3. **Maintain structure**: Keep related files organized in appropriate directories
4. **Test changes**: Ensure new files work with existing build process

For detailed contribution guidelines, see [`CONTRIBUTING.md`](../CONTRIBUTING.md).
