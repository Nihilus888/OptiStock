import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateAccountForm from '../components/CreateAccountForm';
import '@testing-library/jest-dom';
import { toast } from 'react-toastify'; // Mock toast

const originalLocation = window.location;

beforeAll(() => {
  delete window.location;
  window.location = { assign: jest.fn(), replace: jest.fn() };
});

afterAll(() => {
  window.location = originalLocation; // Restore original location after tests
});

// Mock fetch globally
global.fetch = jest.fn();

// Mock the toast functions
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
  ToastContainer: () => <div />,
}));

jest.useFakeTimers(); // Ensure fake timers are used

describe('CreateAccountForm', () => {
  beforeEach(() => {
    fetch.mockClear(); // Clear mock fetch calls before each test
    toast.success.mockClear(); // Clear toast success calls
    toast.error.mockClear(); // Clear toast error calls
  });

  it('should render the form inputs correctly', () => {
    render(<CreateAccountForm />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/experience/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create Account/i })).toBeInTheDocument();
  });

  it('should update form fields when user types', () => {
    render(<CreateAccountForm />);

    const fields = {
      username: screen.getByLabelText(/username/i),
      firstName: screen.getByLabelText(/first name/i),
      lastName: screen.getByLabelText(/last name/i),
      email: screen.getByLabelText(/email/i),
      password: screen.getByLabelText(/password/i),
      age: screen.getByLabelText(/age/i),
      experience: screen.getByLabelText(/experience/i),
    };

    fireEvent.input(fields.username, { target: { value: 'johndoe' } });
    fireEvent.input(fields.firstName, { target: { value: 'John' } });
    fireEvent.input(fields.lastName, { target: { value: 'Doe' } });
    fireEvent.input(fields.email, { target: { value: 'john@example.com' } });
    fireEvent.input(fields.password, { target: { value: 'password123' } });
    fireEvent.input(fields.age, { target: { value: '30' } });
    fireEvent.input(fields.experience, { target: { value: '5' } });

    expect(fields.username.value).toBe('johndoe');
    expect(fields.firstName.value).toBe('John');
    expect(fields.lastName.value).toBe('Doe');
    expect(fields.email.value).toBe('john@example.com');
    expect(fields.password.value).toBe('password123');
    expect(fields.age.value).toBe('30');
    expect(fields.experience.value).toBe('5');
  });

  it('should display a success message and redirect when registration is successful', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    render(<CreateAccountForm />);

    // Simulate filling the form
    fireEvent.input(screen.getByLabelText(/username/i), { target: { value: 'johndoe' } });
    fireEvent.input(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.input(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.input(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.input(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.input(screen.getByLabelText(/age/i), { target: { value: '30' } });
    fireEvent.input(screen.getByLabelText(/experience/i), { target: { value: '5' } });

    const expectedBody = {
      username: 'johndoe',
      email: 'john@example.com',
      password: 'password123',
      first_name: 'John',
      last_name: 'Doe',
      age: '30',
      experience: 5,
    };

    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://127.0.0.1:8000/accountsUser/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expectedBody),
      });

      expect(toast.success).toHaveBeenCalledWith('User registered successfully!');
    });

    jest.advanceTimersByTime(2000);
  });
});
