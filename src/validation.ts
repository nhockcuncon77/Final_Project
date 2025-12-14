// TypeScript utility functions for input validation
import { FormData } from './models.js';

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): boolean {
  // Password must be at least 6 characters
  return password.length >= 6;
}

export function validateName(name: string): boolean {
  // Name must be at least 2 characters and contain only letters and spaces
  const nameRegex = /^[a-zA-Z\s]{2,}$/;
  return nameRegex.test(name);
}

export function validateFormData(formData: FormData): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (formData.email && !validateEmail(formData.email)) {
    errors.push('Please enter a valid email address.');
  }

  if (formData.password && !validatePassword(formData.password)) {
    errors.push('Password must be at least 6 characters long.');
  }

  if (formData.name && !validateName(formData.name)) {
    errors.push('Name must be at least 2 characters and contain only letters.');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function sanitizeInput(input: string): string {
  // Remove potentially harmful characters
  return input.trim().replace(/[<>]/g, '');
}

export function validateSearchQuery(query: string): boolean {
  // Search query should not be empty after sanitization
  return sanitizeInput(query).length > 0;
}




