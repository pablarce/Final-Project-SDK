# 📚 Library Management System

A modern web application for managing library resources, built with React and powered by Supabase.

[Live Demo](https://final-project-sdk.vercel.app/login)

## 🌟 Overview

The Library Management System is a full-featured web application that enables users to borrow books, manage loans, and handle library resources efficiently. Built with modern web technologies and a focus on user experience.

## 📱 Core Features

### Authentication & Authorization

- Secure user registration and login
- Role-based access (Admin/User)
- Session management via Supabase Auth

### 🔒 Security Measures

#### Authentication Security

- **Password Security**:
  - Argon2id hashing algorithm
  - Automatic password strength validation
  - Protection against brute force attacks

#### Session Management

- **JWT (JSON Web Tokens)**:
  - Secure token generation and validation
  - Automatic token refresh
  - Encrypted payload
  - Configurable expiration times

#### Data Protection

- **Row Level Security (RLS)**:
  - Fine-grained access control
  - Automatic data filtering based on user role
  - Prevention of unauthorized data access

#### API Security

- **CORS Protection**:
  - Configured allowed origins
  - Secure cross-origin requests
- **XSS Prevention**:
  - Content Security Policy (CSP) headers
  - Input sanitization
- **CSRF Protection**:
  - Token validation
  - Same-origin policy enforcement

#### Infrastructure Security

- **Supabase Platform**:
  - SOC2 Type 1 compliant
  - Regular security audits
  - Automated backup systems
  - 24/7 monitoring

### Library Operations

- Browse available books
- Manage book loans
- Track loan history
- Stock management

### User Interface

- Clean, modern design with ShadCN
- Responsive layout
- Intuitive navigation
- Role-specific views

## 🔧 Technology Stack

- **Frontend**: React + TypeScript
- **Styling**: ShadCN + Tailwind CSS
- **Backend**: Supabase
- **Hosting**: Vercel

## 📖 Documentation

- [Setup Guide](docs/setup/README.md)
- [API Documentation](docs/api/README.md)
- [Backend Architecture](docs/backend/README.md)

## 🚀 Quick Start

1. Clone the repository
2. Install dependencies
3. Configure environment
4. Start development server

Detailed instructions available in the [Setup Guide](docs/setup/README.md).

## 🌐 Live Version

Access the live application at [https://final-project-sdk.vercel.app/login](https://final-project-sdk.vercel.app/login)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
