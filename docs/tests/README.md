# 🧪 Testing Documentation

## Overview

This project uses Jest and React Testing Library for component and integration testing. The tests ensure the reliability and functionality of our React components and their interactions.

## Directory Structure

```
tests/
├── components/     # Component-specific tests
├── setup.ts       # Jest and testing-library setup
└── example.test.tsx   # Example test patterns
```

## Running Tests

### Prerequisites

- Node.js installed
- Project dependencies installed (`pnpm install`)
- Being in the `front` directory

### Commands

```bash
# Run all tests
pnpm test

# Run tests in watch mode (recommended during development)
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

## Test Features

- ✅ Component unit testing
- ✅ Integration testing
- ✅ Automatic test discovery
- ✅ Watch mode for development
- ✅ Coverage reporting
- ✅ Snapshot testing
- ✅ Mocked Supabase calls

## Writing Tests

### Component Test Example

```typescript
import { render, screen } from "@testing-library/react";
import { MyComponent } from "../components/MyComponent";

describe("MyComponent", () => {
  it("renders correctly", () => {
    render(<MyComponent />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
```

### Best Practices

- Write tests that resemble how users interact with your app
- Test component behavior, not implementation details
- Use meaningful test descriptions
- Keep tests simple and focused
- Mock external dependencies when necessary

## Test Setup

The `setup.ts` file contains:

- Jest DOM extensions
- Testing Library configurations
- Common test utilities
- Global mocks

## Getting Help

If you encounter any issues:

1. Check the test output for detailed error messages
2. Review the [Jest documentation](https://jestjs.io/docs/getting-started)
3. Consult the [React Testing Library documentation](https://testing-library.com/docs/react-testing-library/intro/)
