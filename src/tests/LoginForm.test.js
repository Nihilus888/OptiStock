// LoginForm.test.js

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginForm from '../components/Login';
import { useAuth } from '../components/AuthContext';
import { toast } from 'react-toastify';

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
  ToastContainer: () => <div />,
}));

// Mock the useAuth hook
jest.mock('../components/AuthContext', () => ({
  useAuth: jest.fn(),
}));

beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mocks
    console.log = jest.fn(); // Mock console.log
    console.error = jest.fn(); // Mock console.error
  });
  

test('submits the form and shows success notification', async () => {
  // Mock the implementation of useAuth
  useAuth.mockReturnValue({
    login: jest.fn(), // Mock the login function
  });

  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ access: 'fake-jwt-token' }),
    })
  );

  render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );

  // Simulate user input
  fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

  // Simulate form submission
  fireEvent.click(screen.getByRole('button', { name: /login/i }));

  // Check if the toast.success was called with the expected message
  await waitFor(() => {
    expect(toast.success).toHaveBeenCalledWith(
      expect.stringContaining('Login successful! Redirecting...'),
      expect.anything()
    );
  });
});

test('shows error notification on failed login', async () => {
  // Mock the implementation of useAuth
  useAuth.mockReturnValue({
    login: jest.fn(), // Mock the login function
  });

  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ message: 'Invalid credentials' }),
    })
  );

  render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'wronguser' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpassword' } });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalled();
  });

  // Check if toast.error was called
  expect(toast.error).toHaveBeenCalledWith(
    'Login failed: Invalid credentials',
    expect.anything()
  );
});
