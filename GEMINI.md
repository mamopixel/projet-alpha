# Gemini Project Context: TechLunch.io

This document provides essential context for Gemini to understand and interact with the TechLunch.io project.

## Project Overview

-   **Purpose:** A modern React 19 landing page for a tech event series ("TechLunch.io"), featuring an interactive 3D background.
-   **Main Technologies:**
    -   **Framework:** React 19 (TypeScript)
    -   **Build Tool:** Vite
    -   **Styling:** Tailwind CSS (v3) with `class-variance-authority` and `tailwind-merge`.
    -   **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (using the "base-nova" style and `@base-ui/react`).
    -   **Icons:** [Lucide React](https://lucide.dev/).
    -   **Theming:** `next-themes` for dark/light mode support.
    -   **3D Graphics:** [Three.js](https://threejs.org/) for the animated `DottedSurface` background.
-   **Architecture:** A standard Vite-based React application with a centralized `src` directory, using path aliases for clean imports.

## Building and Running

The project uses standard `npm` scripts defined in `package.json`:

-   **Development:** `npm run dev` - Starts the Vite development server.
-   **Build:** `npm run build` - Compiles TypeScript and builds the production-ready assets.
-   **Linting:** `npm run lint` - Runs ESLint to check for code quality issues.
-   **Preview:** `npm run preview` - Serves the production build locally for testing.

## Development Conventions

-   **TypeScript:** All source files use TypeScript (`.ts`, `.tsx`). Stricter linting rules are recommended for production (see `README.md`).
-   **Path Aliases:** Use `@/` to reference the `src/` directory (e.g., `@/components/ui/button`).
-   **Styling:** 
    -   Prefer Tailwind utility classes.
    -   Use the `cn` utility from `@/lib/utils` for conditional class merging.
-   **Components:**
    -   UI components are located in `src/components/ui` and follow the shadcn/ui pattern.
    -   Custom complex components (like `DottedSurface`) are also found in the component tree.
-   **3D Effects:** The `DottedSurface` component uses Three.js and reacts to the current theme (light/dark).
-   **Theming:** The application is wrapped in a `ThemeProvider` from `next-themes` in `main.tsx`.

## Key Files

-   `src/main.tsx`: Application entry point and provider setup.
-   `src/App.tsx`: Main landing page layout and logic.
-   `src/components/ui/dotted-surface.tsx`: Three.js implementation for the animated background.
-   `tailwind.config.js`: Tailwind CSS configuration including theme extensions.
-   `components.json`: shadcn/ui configuration.
