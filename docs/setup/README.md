# 🛠️ Setup & Installation Guide

## Prerequisites

- Node.js (v14 or higher)
- pnpm (preferibly), npm or yarn
- Git

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

   Create a `.env` file in the root directory:

   ```env
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Start Development Server**

   ```sh
   npm run dev
   ```

5. **Access the Application**
   - Open your browser
   - Navigate to `http://localhost:5163/`

## Development Notes

### Backend Configuration

- No local backend setup required
- Supabase is cloud-hosted
- Ensure you have:
  - Valid Supabase project
  - Correct environment variables

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

#### Deployment

- **Vercel**: Hosting platform
- Automatic deployments from main branch
- Environment variables must be configured in Vercel dashboard

## Troubleshooting

### Common Issues

1. **Environment Variables**

   - Ensure `.env` file exists
   - Verify Supabase credentials

2. **Build Errors**

   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules: `rm -rf node_modules`
   - Reinstall dependencies: `npm install`

3. **Authentication Issues**
   - Verify Supabase configuration
   - Check browser console for errors
   - Ensure correct API keys

### Getting Help

- Check the [Supabase Documentation](https://supabase.com/docs)
- Review [ShadCN Documentation](https://ui.shadcn.com/)
- Open an issue in the GitHub repository
