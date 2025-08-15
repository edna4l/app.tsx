# Supabase Vite React App

A React application built with Vite and configured to work with Supabase.

## Environment Variables

This project uses environment variables to configure the Supabase connection. The variables are stored in the `.env` file:

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build

## Project Structure

```
src/
├── App.jsx          # Main application component
├── App.css          # Application styles
├── main.jsx         # Application entry point
├── index.css        # Global styles
└── supabase.js      # Supabase client configuration
```

## Features

- ✅ Vite for fast development and building
- ✅ React 18 with modern hooks
- ✅ Supabase integration
- ✅ Environment variable configuration
- ✅ Connection status indicator
- ✅ Hot module replacement (HMR)

## Security

- The `.env` file is included in `.gitignore` to prevent committing sensitive information
- Only environment variables prefixed with `VITE_` are exposed to the client
- The anonymous key is safe for client-side use with proper RLS policies
