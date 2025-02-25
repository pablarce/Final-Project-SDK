# Final project SDK

# 📚 Library Management System

This is a **Library Management System**, a web application built with **React** and **TypeScript**. It allows users to **borrow books**, manage their **loans**, and authenticate with **Supabase**. The app is styled using **ShadCN** and **Tailwind CSS**, and the backend is hosted in **Supabase**.

## 🚀 Features

### 🔐 **Authentication**

- **User Registration & Login**: Users can sign up and log in using Supabase authentication.
- **Roles**:
  - **Admin**: Can view all loans from every user.
  - **User**: Can only see their own loans.
- **Session Management**: The authentication token is stored in **local storage**, and Supabase automatically manages user sessions.

### 📖 **Library Functionality**

- **Borrow Books**: Users can request book loans by selecting:
  - **Book** (from available options)
  - **Quantity** (limited to stock availability)
  - **Start Date** & **End Date**
- **View Loans**:
  - Users can see **their own loans**.
  - Admins can see **all loans**.

### 🔄 **Navigation**

- **Login Page (`/login`)**: Allows users to register, log in, and authenticate.
- **Main Page (`/`)**:
  - **Tab 1**: Book borrowing functionality.
  - **Tab 2**: Loan history (filtered by user role).
- **Logout**: Users can log out at any time.

## 🛠️ Tech Stack

- **Frontend**: [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **UI Libraries**: [ShadCN](https://ui.shadcn.com/) + [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: [Supabase](https://supabase.com/) (Cloud-hosted, no local setup required)
- **Hosting**: [Vercel](https://vercel.com/) (You can access the live version)

## 📥 Installation & Setup

1. **Clone the repository**:
   ```sh
   git clone https://github.com/pablarce/Final-Project-SDK.git
   cd ./Final-Project-SDK/front
   ```
2. **Install dependencies**:
   ```sh
   Copiar
   Editar
   npm install
   ```
3. **Start the development server**:
   ```sh
   Copiar
   Editar
   npm run dev
   ```
4. **Open http://localhost:5163/ in your browser.**

## 🌐 Live Version

The app is also available on Vercel. You can access it without any setup.

## 📝 Notes

- No backend setup is required since Supabase is cloud-hosted.
- Ensure you have a valid Supabase project if you're setting up authentication or database operations.

🚀 Enjoy using the Library Management System! If you have any issues or suggestions, feel free to open an issue. 🎉
