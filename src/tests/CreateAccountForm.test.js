import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateAccountForm from '../components/CreateAccountForm';
import '@testing-library/jest-dom';
import { toast } from 'react-toastify'; // Mock toast

const originalLocation = window.location;

beforeAll(() => {
  delete window.location;
  window.location = { assign: jest.fn(), reload: jest.fn(), replace: jest.fn() };
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
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/experience/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create Account/i })).toBeInTheDocument();
  });

  it('should update form fields when user types', () => {
    render(<CreateAccountForm />);
    
    const nameInput = screen.getByLabelText(/name/i);
    const ageInput = screen.getByLabelText(/age/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const experienceSlider = screen.getByLabelText(/experience/i);

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(ageInput, { target: { value: '30' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(experienceSlider, { target: { value: '5' } });

    expect(nameInput.value).toBe('John Doe');
    expect(ageInput.value).toBe('30');
    expect(emailInput.value).toBe('john@example.com');
    expect(passwordInput.value).toBe('password123');
    expect(experienceSlider.value).toBe('5');
  });

  it('should display a success message and redirect when registration is successful', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    render(<CreateAccountForm />);

    // Simulate filling the form
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/age/i), { target: { value: '30' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/experience/i), { target: { value: '5' } });

    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://127.0.0.1:8000/accountsUser/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'John Doe',
          age: '30',
          email: 'john@example.com',
          password: 'password123',
          experience: 5,
        }),
      });

      expect(toast.success).toHaveBeenCalledWith('User registered successfully!');
    });

    // Simulate the passage of time
    jest.advanceTimersByTime(2000);

    // Check for the effect of the timer
    // You may want to check if a certain component appears or a redirect occurs
    // Example:
    // expect(screen.getByText(/some expected text after redirect/i)).toBeInTheDocument();
  });

  it('should display an error message when registration fails', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    render(<CreateAccountForm />);

    // Simulate filling the form
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/age/i), { target: { value: '30' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/experience/i), { target: { value: '5' } });

    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://127.0.0.1:8000/accountsUser/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'John Doe',
          age: '30',
          email: 'john@example.com',
          password: 'password123',
          experience: 5,
        }),
      });

      expect(toast.error).toHaveBeenCalledWith('Registration failed. Please try again.');
    });
  });

  it('should display an error message on network failure', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<CreateAccountForm />);

    // Simulate filling the form
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/age/i), { target: { value: '30' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/experience/i), { target: { value: '5' } });

    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('An error occurred. Please try again.');
    });
  });
});
