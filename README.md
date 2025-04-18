
# SmartSpendHQ - Personal Finance Management App

SmartSpendHQ is a comprehensive budgeting and expense tracking web application built with modern web technologies. It helps users manage their finances, track expenses, set budgeting goals, and gain insights into their spending habits.

## 📱 Screenshots

### Dashboard
<img width="1280" alt="image" src="https://github.com/user-attachments/assets/f7bfa5fc-91ff-4724-92d9-c5874c8dd0b3" />
The dashboard provides a comprehensive overview of your financial health, with key metrics like total balance, monthly spending, savings, and investments. Interactive charts visualize spending patterns and category breakdown.

### Profile Page
<img width="1280" alt="image" src="https://github.com/user-attachments/assets/0c8b9c81-9503-4948-baa2-3801579ff19b" />
The profile page allows users to manage their personal information and account settings.

### Authentication
<img width="1280" alt="image" src="https://github.com/user-attachments/assets/bf2bf5f0-2a86-48e3-8a47-8980488a00c2" />
Secure login and signup pages with email authentication.

## ✨ Features

### User Authentication
- **Secure Signup and Login**: Create an account with email/password
- **User Profiles**: Personalized experience with user profile management
- **Session Persistence**: Stay logged in across browser sessions

### Dashboard
- **Financial Overview**: At-a-glance view of financial health with key metrics
- **Spending Trends**: Interactive line chart showing spending patterns over time
- **Spending Categories**: Visual breakdown of expenses by category
- **Budget Progress**: Track your progress against monthly budgets
- **Recent Transactions**: Quick view of your latest financial activities

### Expense Tracking
- **Add, Edit, Delete**: Full CRUD operations for expense management
- **Categorization**: Organize expenses by customizable categories
- **Filtering and Sorting**: Find expenses by date, amount, or category

### Budget Management
- **Monthly Budgets**: Set overall monthly spending limits
- **Category Budgets**: Allocate specific amounts to each spending category
- **Progress Tracking**: Visual indicators of budget utilization
- **Alerts**: Notifications when approaching or exceeding budget limits

### Transaction History
- **Comprehensive Log**: View all financial transactions in one place
- **Transaction Details**: Access full information about each transaction
- **Search and Filter**: Find specific transactions quickly

### Savings Goals
- **Goal Setting**: Create and track progress towards financial goals
- **Target Dates**: Set deadlines for achieving savings targets
- **Progress Tracking**: Visual representation of progress towards goals

### Financial Reports
- **Custom Date Ranges**: Generate reports for specific time periods
- **Category Analysis**: Break down spending by category
- **Trend Identification**: Spot patterns in your financial behavior
- **Data Export**: Download reports for offline analysis

### AI-powered Assistant
- **Financial Questions**: Get answers to your money-related questions
- **Personalized Advice**: Receive tailored financial guidance
- **Term Explanations**: Understand financial concepts and terminology

## 🔧 Technology Stack

### Frontend
- **React**: UI library for building interactive interfaces
- **TypeScript**: Type safety and improved developer experience
- **Vite**: Modern build tool for faster development
- **React Router**: Seamless client-side routing
- **Tailwind CSS**: Utility-first styling approach
- **shadcn/ui**: High-quality UI component library
- **Recharts**: Data visualization for financial insights
- **Tanstack Query**: Data fetching, caching, and synchronization

### Backend
- **Supabase Authentication**: Secure user management
- **Supabase Database**: PostgreSQL database with robust RLS policies
- **Supabase Storage**: File storage capabilities

## 🛠️ Architecture

SmartSpendHQ follows a modern, component-based architecture:

- **Pages**: Top-level route components representing different sections
- **Layout Components**: Consistent structure across the application
- **Feature Components**: Self-contained functional units
- **UI Components**: Reusable interface elements
- **Custom Hooks**: Encapsulated logic and state management
- **Service Layer**: API communication and data transformation
- **Utility Functions**: Helper methods for common operations

## 📋 Database Schema

### Key Tables

**profiles**
- `id`: UUID (references auth.users)
- `full_name`: TEXT
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

Additional tables for expenses, budgets, transactions, and savings goals will be implemented as the application evolves.

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm, yarn, or pnpm

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
# or
pnpm install
```

3. Set up environment variables:
Create a `.env` file with:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open your browser and navigate to `http://localhost:5173`

## 🔒 Authentication Setup

SmartSpendHQ uses Supabase Authentication. For development:

1. Create a Supabase project at [https://supabase.com](https://supabase.com)
2. Enable Email/Password authentication
3. (Optional) Disable email verification for faster testing
4. Update your `.env` file with your Supabase credentials

## 🔄 Development Workflow

1. Feature branches: Use `feature/`, `bugfix/`, `hotfix/` prefixes
2. Pull requests: Include description and screenshots
3. Code review: Required before merging
4. Testing: Ensure all tests pass before submission

## 📚 Documentation

For more detailed information:

- [User Manual](./UserManual.md): End-user guide to application features
- [Developer Guide](./DeveloperGuide.md): Technical documentation for contributors

## 🔮 Future Roadmap

- **Bank Integration**: Connect to financial institutions
- **Recurring Expenses**: Support for regular payments
- **Bill Reminders**: Notifications for upcoming payments
- **Financial Insights**: AI-powered analysis of spending habits
- **Multi-currency Support**: Handle different currencies
- **Mobile Application**: Native mobile experience

## 👥 Contributing

Contributions are welcome! Please check the [contributing guidelines](./CONTRIBUTING.md) for more information.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
