# 🔗 Library Manager API Documentation

## Table of Contents

- [Library Management](#library-management)
- [Loan Management](#loan-management)
- [User Management](#user-management)

> All API calls are made from the React client using Supabase.

## 📖 Library Management (`/library.ts`)

### List All Books

```typescript
GET /library

Response: {
  id: number,
  name: string,
  author: string,
  genre: string,
  publication_date: string,
  quantity: number
}[]
```

### Add New Book

```typescript
POST /library

Body: {
  name: string,
  author: string,
  genre: string,
  publication_date: string,
  quantity: number
}
```

### Update Book

```typescript
PUT /library/:id

Body: {
  name?: string,
  author?: string,
  genre?: string,
  publication_date?: string,
  quantity?: number
}
```

## 📋 Loan Management (`/loans.ts`)

### Get Loans

```typescript
GET /loans

// Returns all loans (admin) or logged-in user's loans
Response: {
  id: number,
  book_name: string,
  quantity: number,
  username: string,
  status: string,
  start_date: string,
  end_date: string
}[]
```

### Create Loan

```typescript
POST /loans

Body: {
  bookId: number,
  quantity: number,
  startDate: string,
  endDate: string,
  userId: string
}
```

## 👤 User Management (`/users.ts`)

### Register User

```typescript
POST /register

Body: {
  email: string,
  password: string,
  username: string,
  admin: boolean
}
```

### Authentication

```typescript
POST / login; // Login with email and password
POST / logout; // End current session
```
