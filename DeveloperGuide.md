
# SmartSpendHQ Developer Guide

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Key Components](#key-components)
5. [Authentication Flow](#authentication-flow)
6. [Database Schema](#database-schema)
7. [State Management](#state-management)
8. [API Integration](#api-integration)
9. [Styling System](#styling-system)
10. [Testing](#testing)
11. [Deployment](#deployment)
12. [Contributing Guidelines](#contributing-guidelines)

## Architecture Overview

SmartSpendHQ follows a modern client-server architecture:

- **Frontend**: React-based single-page application (SPA)
- **Backend**: Supabase for authentication, database, and storage
- **Authentication**: JWT-based authentication via Supabase Auth
- **Data Flow**: React Query for server state management with optimistic UI updates

The application uses a component-based architecture with reusable UI components and custom hooks for shared functionality. The separation of concerns is maintained through dedicated modules for data fetching, authentication, UI presentation, and business logic.

## Tech Stack

### Frontend
- **React**: UI library
- **TypeScript**: Static typing
- **Vite**: Build tool and development server
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: UI component library based on Radix UI
- **React Query**: Data fetching and caching
- **Recharts**: Data visualization
- **Lucide React**: Icon library

### Backend (Supabase)
- **PostgreSQL**: Database
- **Supabase Auth**: User authentication and management
- **Supabase Storage**: File storage
- **Row-Level Security**: Data access control
- **Database Functions**: Business logic in the database

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── dashboard/        # Dashboard-specific components
│   ├── layout/           # Layout components (Sidebar, Header)
│   └── ui/               # Shadcn UI components
├── data/                 # Mock data and constants
├── hooks/                # Custom React hooks
├── integrations/         # External integrations
│   └── supabase/         # Supabase client and types
├── lib/                  # Utility functions and helpers
├── pages/                # Page components
└── utils/                # Helper utilities
```

## Key Components

### Layout Components

- **AppLayout**: Main layout wrapper that includes the header and sidebar
- **Header**: Top navigation bar with profile dropdown and sidebar toggle
- **Sidebar**: Navigation sidebar with links to main sections

### Dashboard Components

- **StatCard**: Reusable card component for displaying financial metrics
- **Charts**: Line and pie charts for visualizing financial data
- **Budget Overview**: Progress bars for budget tracking

### Authentication Components

- **Login Form**: Email and password login with error handling
- **Signup Form**: New user registration with validation
- **Protected Routes**: Route guards that ensure authenticated access

## Authentication Flow

SmartSpendHQ uses Supabase Authentication with the following flow:

1. **User Registration**:
   - User submits signup form with email, password, and full name
   - Supabase creates a new user in the `auth.users` table
   - A trigger automatically creates an entry in the `profiles` table
   - User receives welcome message and is directed to the dashboard

2. **User Login**:
   - User enters email and password on the login form
   - Supabase authenticates and returns a JWT token
   - Token is stored for subsequent authenticated requests
   - User is redirected to the dashboard

3. **Session Management**:
   - Sessions are persisted in local storage
   - `onAuthStateChange` listener updates UI based on auth state
   - Automatic token refresh is handled by Supabase client

4. **Protected Routes**:
   - Routes requiring authentication check for valid session
   - Unauthenticated users are redirected to the login page

## Database Schema

### Tables

**profiles**
- `id`: UUID (references auth.users)
- `full_name`: TEXT
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

(Additional tables for expenses, budgets, transactions, etc. will be added as the application evolves)

### Row-Level Security Policies

- **profiles**:
  - Public read access for all profiles
  - Users can insert/update only their own profile

## State Management

SmartSpendHQ uses a combination of local React state and React Query for state management:

1. **Local State**: Used for UI state, form inputs, and component-specific state
2. **React Query**: Handles server state, caching, and synchronization
3. **Context API**: Used sparingly for global state like authentication

Example of authentication state management:

```typescript
// Auth state management in a component
const [user, setUser] = useState<User | null>(null);
const { profile, loading } = useProfile(user);

useEffect(() => {
  const fetchUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  fetchUser();

  const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
    setUser(session?.user ?? null);
  });

  return () => subscription.unsubscribe();
}, []);
```

## API Integration

### Supabase Client

The Supabase client is configured in `src/integrations/supabase/client.ts` and used throughout the application for data operations:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### Data Fetching Pattern

Data fetching is implemented using React Query hooks for automatic caching and refetching:

```typescript
// Example of a data fetching hook
const useTransactions = (userId) => {
  return useQuery({
    queryKey: ['transactions', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data;
    },
    enabled: !!userId
  });
};
```

## Styling System

SmartSpendHQ uses Tailwind CSS with shadcn/ui components:

1. **Base Styles**: Defined in `tailwind.config.ts`
2. **Component Styles**: Combination of Tailwind utility classes and shadcn/ui
3. **Theme Customization**: Available through Tailwind theme extension
4. **Responsive Design**: Using Tailwind's responsive prefixes (sm, md, lg, xl)

Example styling pattern:

```tsx
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
  <StatCard 
    title="Total Balance" 
    value="$12,580" 
    icon={<DollarSign className="h-4 w-4" />}
    className="bg-blue-50 dark:bg-blue-900/20"
  />
</div>
```

## Testing

(To be implemented)

Recommended testing strategy:
- Unit tests for utility functions and hooks
- Component tests with React Testing Library
- E2E tests with Cypress

## Deployment

SmartSpendHQ can be deployed to various platforms:

1. **Static Hosting**: Build with `npm run build` and deploy to Netlify, Vercel, or similar
2. **Environment Variables**: Set up the following in your deployment environment:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Contributing Guidelines

1. **Branch Naming**: Use `feature/`, `bugfix/`, `hotfix/`, or `release/` prefixes
2. **Commit Messages**: Follow conventional commits pattern
3. **Pull Requests**: Include description, screenshots, and testing steps
4. **Code Style**: Follow project ESLint and Prettier configurations
5. **Review Process**: All PRs require at least one code review

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Implement changes with tests
4. Ensure all tests pass
5. Submit a pull request
6. Address review feedback
7. Merge after approval
