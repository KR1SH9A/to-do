# Front-End Documentation

## Architecture

### Tech Stack
- **Vite:** Next-generation frontend tooling for fast development and bundling.
- **React (v18+):** For component-based UI development and state management.
- **TypeScript:** Ensuring type safety and maintaining strict contracts with the backend models.

### Directory Structure
```
frontend/
├── index.html        # Entry HTML file
├── vite.config.ts    # Vite config (contains the proxy to the backend)
└── src/
    ├── api/          # Centralized API fetch logic (todoApi.ts)
    ├── components/   # Reusable React components (TodoItem.tsx)
    ├── types/        # TypeScript interfaces mimicking backend models (todo.ts)
    ├── App.tsx       # Main application logic and layout
    └── index.css     # Global QWERTY/ASCII Art CSS styles
```

### Separation of Concerns
1. **API Layer (`src/api/todoApi.ts`):** 
   - Handles all HTTP requests (GET, POST, PUT, DELETE).
   - Keeps components clean from fetch logic.
   - Converts responses to strictly typed objects (`Todo`).
2. **Types (`src/types/todo.ts`):** 
   - Defines the exact shape of data expected by and received from the backend, ensuring compile-time safety.
3. **Components (`src/components/TodoItem.tsx`):** 
   - Stateless, presentational components that receive data and callbacks (`onToggle`, `onDelete`) as props.
4. **State Management (`src/App.tsx`):** 
   - Manages global list of todos.
   - Handles form state.
   - Coordinates API calls and UI updates.

## Connecting to Backend
The backend operates independently on `http://localhost:3000`. To circumvent CORS restrictions during development without modifying backend configurations, a **Vite proxy** is configured in `vite.config.ts`:

```typescript
server: {
  proxy: {
    '/todo': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    }
  }
}
```
All API calls inside `todoApi.ts` use relative URLs (e.g., `/todo`), which Vite proxies automatically.

### CSS Tokens (defined in `index.css`)
- **Background:** `var(--bg-color)` - Deep black (`#0d0d0d`)
- **Primary Text:** `var(--text-color)` - Bright phosphor green (`#00ff41`)
- **Secondary Text:** `var(--text-dark)` - Dimmer green for contrast (`#008f11`)
- **Font:** `'Fira Code', monospace` - Ensures strict column alignment for ASCII art.
