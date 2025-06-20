# 🚀 Setup & Development Guide

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Mayur-Pagote/README_Design_Kit.git
cd README_Design_Kit
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5174`

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reloading |
| `npm run build` | Build the application for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check code quality |

## Environment Setup

### Development Tools

1. **VS Code Extensions** (Recommended):
   - ES7+ React/Redux/React-Native snippets
   - TypeScript Importer
   - Tailwind CSS IntelliSense
   - Prettier - Code formatter
   - ESLint

2. **Browser Extensions** (Optional):
   - React Developer Tools
   - Redux DevTools (if using Redux)

### Code Formatting

The project uses ESLint for code quality. Run linting with:

```bash
npm run lint
```

## Project Structure Guide

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (buttons, inputs, etc.)
│   ├── Layout.tsx      # Page layout wrapper
│   └── ...
├── pages/              # Route components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── config/             # Application configuration
├── types/              # TypeScript type definitions
└── theme/              # Theme configuration
```

## Development Guidelines

### Component Creation

1. Use TypeScript for all components
2. Follow the existing naming conventions
3. Include proper props typing
4. Add JSDoc comments for complex components

Example component structure:
```tsx
import { type ComponentProps } from 'react'

interface MyComponentProps {
  title: string
  isActive?: boolean
}

export function MyComponent({ title, isActive = false }: MyComponentProps) {
  return (
    <div className="p-4">
      <h2>{title}</h2>
    </div>
  )
}
```

### Styling Guidelines

- Use Tailwind CSS utility classes
- Follow the established design system
- Use CSS variables for theme values
- Prefer composition over inheritance

### State Management

- Use React hooks for local state
- Use React Query for server state
- Keep state as close to where it's used as possible

## Testing

### Manual Testing

1. Test all routes work correctly
2. Verify responsive design on different screen sizes
3. Test drag and drop functionality
4. Ensure theme switching works
5. Validate form inputs

### Browser Testing

Test the application in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

### Local Build Testing

Before deploying, always test the production build locally:

```bash
npm run build
npm run preview
```

### Vercel Deployment

The project is configured for automatic deployment to Vercel:

1. Push changes to the main branch
2. Vercel automatically builds and deploys
3. Check the deployment logs for any issues

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill process using port 5174
   npx kill-port 5174
   ```

2. **Node modules issues**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **TypeScript errors**
   ```bash
   # Check TypeScript compilation
   npx tsc --noEmit
   ```

4. **Build failures**
   ```bash
   # Clear Vite cache
   rm -rf dist
   npm run build
   ```

### Getting Help

- Check the [Issues](https://github.com/Mayur-Pagote/README_Design_Kit/issues) page
- Read the [Contributing Guidelines](../CONTRIBUTING.md)
- Join our community discussions

## Next Steps

After setting up the project:

1. Explore the codebase structure
2. Try making small changes to understand the workflow
3. Read the [Files Documentation](./files.md) for detailed component information
4. Check out open issues to start contributing
