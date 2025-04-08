# 🛠️ Setup & Installation Guide

## Prerequisites

- Node.js (v14 or higher)
- pnpm (preferably), npm or yarn
- Git
- Supabase account (see [Supabase Setup](./supabase-setup.md))

## Installation Steps

1. **Clone the repository**

   ```sh
   git clone https://github.com/pablarce/Final-Project-SDK.git
   cd ./Final-Project-SDK/front
   ```

2. **Install dependencies**

   ```sh
   pnpm install
   ```

3. **Environment Configuration**

   Before continuing, make sure to:

   1. Have a Supabase account
   2. Have created a Supabase project
   3. Follow the detailed instructions in [Supabase Setup](./supabase-setup.md)

   Create a `.env` file in the root directory:

   ```env
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Verify Configuration**

   Run the verification script:

   ```sh
   pnpm run verify-supabase
   ```

   This script will verify:

   - The existence of the `.env` file
   - The validity of Supabase credentials
   - The correct database configuration
   - Required security policies

5. **Start Development Server**

   ```sh
   pnpm run dev
   ```

6. **Access the Application**
   - Open your browser
   - Navigate to `http://localhost:5163/`

## Development Notes

### Backend Configuration

- Backend configuration is done through Supabase
- See [Supabase Setup](./supabase-setup.md) for:
  - Creating a Supabase project
  - Database configuration
  - Security policy setup
  - Common troubleshooting

### Tech Stack Setup

#### Frontend

- **React + TypeScript**: Core framework
- **ShadCN + Tailwind**: UI components and styling
- **Vite**: Build tool and development server

#### Backend Services

- **Supabase**:
  - Database
  - Authentication
  - API endpoints
  - See [Supabase Setup](./supabase-setup.md) for details

#### Deployment

- **Vercel**: Hosting platform
- Automatic deployments from main branch
- Environment variables must be configured in Vercel dashboard

## Troubleshooting

### Common Issues

1. **Environment Variables**

   - Ensure `.env` file exists
   - Verify Supabase credentials
   - Run `pnpm run verify-supabase` to check configuration

2. **Build Errors**

   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules: `rm -rf node_modules`
   - Reinstall dependencies: `npm install`

3. **Authentication Issues**
   - Verify Supabase configuration
   - Check browser console for errors
   - Ensure correct API keys
   - Consult [Supabase Setup](./supabase-setup.md) for detailed troubleshooting

### Getting Help

- Check the [Supabase Documentation](https://supabase.com/docs)
- Review [ShadCN Documentation](https://ui.shadcn.com/)
- Open an issue in the GitHub repository
- Consult [Supabase Setup](./supabase-setup.md) for database-specific issues
