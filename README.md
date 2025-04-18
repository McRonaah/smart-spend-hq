
# SmartSpendHQ - Personal Finance Management App

SmartSpendHQ is a comprehensive budgeting and expense tracking web application built with modern web technologies. It helps users manage their finances, track expenses, set budgeting goals, and gain insights into their spending habits.

## Features

- **User Authentication**: Secure signup and login with email/password
- **Dashboard**: Overview of financial health with key metrics
- **Expense Tracking**: Add, edit, delete, and categorize expenses
- **Budget Management**: Create and track budgets by category
- **Transaction History**: Comprehensive view of all financial transactions
- **Savings Goals**: Set and track progress towards savings targets
- **Financial Reports**: Visual analytics with charts and graphs
- **AI-powered Assistant**: Get answers to financial questions

## Technology Stack

### Frontend
- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Development environment
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - UI component library
- **Recharts** - Data visualization
- **React Query** - Data fetching and caching

### Backend (Planned Implementation with Supabase)
- **Supabase Authentication** - User management
- **Supabase Database** - PostgreSQL database for data storage
- **Supabase Functions** - Serverless functions for API endpoints

## Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── layout/     # Layout components (Sidebar, Header)
│   └── ui/         # UI components from shadcn
├── hooks/          # Custom React hooks
├── lib/            # Utility functions
├── pages/          # Page components
└── utils/          # Helper utilities
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd smartspendhq
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create .env file:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Connecting to Supabase

To fully utilize SmartSpendHQ's features, you need to connect it to Supabase:

1. Create a Supabase project at https://supabase.com
2. Set up the following tables in your Supabase database:
   - users
   - expenses
   - budgets
   - transactions
   - saving_goals
3. Set up authentication in the Supabase dashboard
4. Update the .env file with your Supabase credentials

## Planned Features

- **Bank Account Integration**: Connect to bank accounts to automatically import transactions
- **Recurring Expenses**: Set up and track recurring expenses
- **Notifications**: Get alerts for budget thresholds and goals
- **Data Export**: Export financial data in various formats
- **Multi-currency Support**: Support for multiple currencies
- **Mobile App**: React Native mobile application

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License.
