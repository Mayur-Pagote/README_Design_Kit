# 🏗️ Project Architecture

## Overview

README Design Kit is a modern React application built with TypeScript and Vite, designed to help developers create beautiful and functional README files for their projects.

## Tech Stack

### Core Technologies
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework

### UI Components
- **Radix UI** - Accessible component primitives
- **Shadcn/ui** - Pre-built component library
- **Lucide React** - Icon library

### Functionality
- **React Router** - Client-side routing
- **React Query** - Data fetching and caching
- **dnd-kit** - Drag and drop functionality
- **React Hook Form** - Form management

## Application Structure

```
├── User Interface Layer
│   ├── Pages (Route components)
│   ├── Layout Components
│   └── UI Components
├── Business Logic Layer
│   ├── Hooks (Custom logic)
│   ├── Utils (Helper functions)
│   └── Config (Application settings)
├── Data Layer
│   ├── Types (TypeScript definitions)
│   └── Demo Data
└── Asset Layer
    ├── Static Assets
    └── Styles
```

## Key Features

### 1. Element Library
- Pre-built README components
- Copy-paste code snippets
- Live preview functionality

### 2. Drag & Drop Editor
- Visual README builder
- Real-time preview
- Export functionality

### 3. Responsive Design
- Mobile-first approach
- Dark/light theme support
- Accessible UI components

## Development Workflow

1. **Development**: `npm run dev` - Hot reloading with Vite
2. **Building**: `npm run build` - TypeScript compilation + Vite build
3. **Preview**: `npm run preview` - Test production build locally
4. **Deployment**: Automatic deployment to Vercel

## Performance Optimizations

- **Code splitting** - Automatic route-based splitting
- **Tree shaking** - Remove unused code
- **Asset optimization** - Automatic image and bundle optimization
- **Caching** - React Query for data caching
