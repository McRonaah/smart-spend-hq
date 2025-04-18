
# SmartSpendHQ Application Architecture

## Overview

SmartSpendHQ is built using a modern React architecture with TypeScript, focusing on component reusability, separation of concerns, and maintainable code structure. This document outlines the high-level architecture and design decisions.

## Architecture Diagram

```
┌─────────────────────────┐
│      Application        │
│    (React + Vite)       │
└───────────┬─────────────┘
            │
┌───────────▼─────────────┐
│     Component Layer      │
├─────────────────────────┤
│  - Pages                 │
│  - Layouts               │
│  - Feature Components    │
│  - UI Components         │
└───────────┬─────────────┘
            │
┌───────────▼─────────────┐
│      Business Logic      │
├─────────────────────────┤
│  - Custom Hooks          │
│  - State Management      │
│  - Service Layer         │
└───────────┬─────────────┘
            │
┌───────────▼─────────────┐
│       Data Layer         │
├─────────────────────────┤
│  - Supabase Client       │
│  - React Query           │
│  - API Integration       │
└───────────┬─────────────┘
            │
┌───────────▼─────────────┐
│    External Services     │
├─────────────────────────┤
│  - Supabase Auth         │
│  - Supabase Database     │
│  - Supabase Storage      │
└─────────────────────────┘
```

## Component Structure

SmartSpendHQ follows a hierarchical component structure:

1. **Pages**: Top-level components that represent routes in the application
   - Dashboard.tsx
   - Profile.tsx
   - Login.tsx
   - etc.

2. **Layout Components**: Provide structure and consistent UI elements
   - AppLayout.tsx
   - Header.tsx
   - Sidebar.tsx

3. **Feature Components**: Domain-specific components for particular features
   - StatCard.tsx
   - TransactionList.tsx
   - BudgetProgress.tsx

4. **UI Components**: Reusable UI elements from shadcn/ui
   - Button, Card, Dialog, etc.
   - Custom UI components

## State Management

SmartSpendHQ uses a combination of state management approaches:

1. **Component State**: Local React state with `useState` for component-specific state
2. **React Query**: For server state, caching, and synchronization
3. **Custom Hooks**: For reusable state logic and side effects

## Authentication Flow

```
┌─────────────┐        ┌─────────────┐         ┌─────────────┐
│  Login Page │        │  Supabase   │         │ Application │
└──────┬──────┘        └──────┬──────┘         └──────┬──────┘
       │                      │                       │
       │ Login Request        │                       │
       ├─────────────────────►│                       │
       │                      │                       │
       │                      │ Authenticate          │
       │                      ├───────────────────────┤
       │                      │                       │
       │ JWT Token            │                       │
       │◄─────────────────────┤                       │
       │                      │                       │
       │                      │                       │
       │ Store Token &        │                       │
       │ Redirect             │                       │
       ├──────────────────────┼───────────────────────►
       │                      │                       │
       │                      │ Fetch User Profile    │
       │                      │◄──────────────────────┤
       │                      │                       │
       │                      │ Profile Data          │
       │                      ├───────────────────────►
       │                      │                       │
       │                      │ Render Dashboard      │
       │                      │◄──────────────────────┤
```

## Data Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ UI Component │────►│ Custom Hook  │────►│ React Query  │────►│  Supabase    │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
       ▲                                         │                    │
       │                                         │                    │
       └─────────────────────────────────────────┴────────────────────┘
                              Data Return
```

1. UI Component triggers data fetching operation
2. Custom hook contains business logic
3. React Query handles caching, refetching, and optimistic updates
4. Supabase client communicates with the backend
5. Data flows back through the chain to the UI

## Folder Structure

```
src/
├── components/
│   ├── dashboard/
│   │   └── StatCard.tsx
│   ├── layout/
│   │   ├── AppLayout.tsx
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   └── ui/
│       └── (shadcn components)
├── data/
│   └── mockData.ts
├── hooks/
│   ├── useProfile.ts
│   └── (other custom hooks)
├── integrations/
│   └── supabase/
│       ├── client.ts
│       └── types.ts
├── lib/
│   └── utils.ts
├── pages/
│   ├── Dashboard.tsx
│   ├── Login.tsx
│   ├── Profile.tsx
│   └── (other pages)
├── App.tsx
└── main.tsx
```

## Security Considerations

1. **Authentication**: JWT-based authentication via Supabase Auth
2. **Row-Level Security**: PostgreSQL RLS policies restrict data access
3. **Client-side Validation**: Form validation before data submission
4. **Server-side Validation**: Database constraints and triggers

## Performance Optimization

1. **React Query Caching**: Reduces unnecessary network requests
2. **Code Splitting**: Lazy-loading of route components
3. **Memoization**: Preventing unnecessary re-renders
4. **Optimistic UI Updates**: Immediate feedback for user actions

## Accessibility

1. **Semantic HTML**: Proper use of HTML elements
2. **ARIA Attributes**: Where appropriate for complex components
3. **Keyboard Navigation**: Fully keyboard accessible
4. **Color Contrast**: Meeting WCAG guidelines

## Testing Strategy

1. **Unit Tests**: For utility functions and hooks
2. **Component Tests**: For UI components
3. **Integration Tests**: For feature workflows
4. **End-to-End Tests**: For critical user journeys
