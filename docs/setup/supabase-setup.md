# 🔧 Supabase Setup

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and create an account or sign in
2. Click on "New Project"
3. Complete the project information:
   - Project name
   - Database password
   - Region (select the one closest to your users)
4. Wait for the project creation to complete (approximately 1-2 minutes)

## 2. Get Credentials

1. In your project dashboard, go to "Project Settings" (gear icon)
2. In the "API" section, you'll find:
   - Project URL (VITE_SUPABASE_URL)
   - anon/public key (VITE_SUPABASE_ANON_KEY)
3. Copy these values to your `.env` file

## 3. Database Configuration

### Required Tables

The project requires the following tables in Supabase:

1. **users**

   ```sql
   create table public.users (
     id uuid references auth.users on delete cascade,
     email text,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null,
     primary key (id)
   );
   ```

2. **profiles**
   ```sql
   create table public.profiles (
     id uuid references auth.users on delete cascade,
     username text,
     avatar_url text,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null,
     primary key (id)
   );
   ```

### Security Policies

For each table, you need to configure the following policies:

1. **users**

   ```sql
   create policy "Users can view their own data" on users
     for select using (auth.uid() = id);

   create policy "Users can update their own data" on users
     for update using (auth.uid() = id);
   ```

2. **profiles**

   ```sql
   create policy "Profiles are viewable by everyone" on profiles
     for select using (true);

   create policy "Users can update their own profile" on profiles
     for update using (auth.uid() = id);
   ```

## 4. Configuration Verification

To verify your configuration is correct:

1. Make sure the `.env` file exists and contains:

   ```env
   VITE_SUPABASE_URL=https://[YOUR-PROJECT-ID].supabase.co
   VITE_SUPABASE_ANON_KEY=[YOUR-ANON-KEY]
   ```

2. Run the verification script:

   ```sh
   pnpm run verify-supabase
   ```

3. If you see errors, verify:
   - The credentials in the `.env` file
   - Your internet connection
   - That tables and policies are correctly configured

## 5. Common Issues

### Error: "Invalid API Key"

- Verify you copied the correct key from the dashboard
- Make sure there are no extra spaces in the `.env` file

### Error: "Database connection failed"

- Verify your Supabase project is active
- Check that the project URL is correct

### Error: "Table does not exist"

- Run the SQL scripts provided above
- Verify you're in the correct Supabase project
