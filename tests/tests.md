# 🧪 Library Management System - Tests

This document provides an overview of how to test the **Library Management System**, including pre-created test users, scenarios to validate, and instructions on running tests.

## 👥 Test Users

You can use the following **pre-created users** to test the system:

### 🟢 **Regular User**

- **Email**: `user@gmail.com`
- **Password**: `useruser`
- **Role**: **User**  
  ✅ Can **borrow books** and **view only their own loans**.

### 🔴 **Admin User**

- **Email**: `admin@gmail.com`
- **Password**: `adminadmin`
- **Role**: **Admin**  
  ✅ Can **view all loans** from every user in the system.

## 🛠️ How to Run Tests

### 1️⃣ **Manual Testing**

You can manually test the system by following these steps:

1. **Login**

   - Use the credentials above to log in at `/login`.
   - Ensure correct **role-based access** (Users should only see their loans, while Admins should see all).

2. **Book Borrowing**

   - Navigate to `/`.
   - Select a book, **choose a valid quantity**, and set **start & end dates**.
   - Ensure the loan **is registered correctly** and appears in the loan list.

3. **Loan Validation**

   - Regular users should **only see their own loans**.
   - Admin users should **see all loans**.

4. **Logout & Session Management**
   - Test if the **logout button works** correctly.
   - Refresh the page after logging in to ensure the session persists.

### 2️⃣ **Automated Testing (Coming Soon)**

In future versions, the project will include **automated tests** using:

- **Jest & React Testing Library** for frontend testing.
- **Cypress** for **end-to-end (E2E) testing**.

## 🚀 Expected Behaviors & Edge Cases

### ✅ **Expected Behaviors**

- Users should only borrow **books that are in stock**.
- Borrowing a book should update the **library stock** accordingly.
- The system should prevent **overlapping loans** with invalid dates.

### ⚠️ **Edge Cases to Test**

- Attempt to borrow **more copies than available**.
- Try logging in with an **invalid password**.
- Ensure token **is stored & removed correctly** in **local storage**.
- Admin should **see all loans**, while a user **sees only their own**.

---

🔍 **If you encounter any issues, please report them in GitHub Issues.** 🚀
