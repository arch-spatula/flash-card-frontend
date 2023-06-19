import { describe, it } from 'vitest';
import { checkEmail } from '.';

describe('Email Validation', () => {
  it('should return true for valid email addresses', () => {
    expect(checkEmail('test@example.com')).toBe(true);
    expect(checkEmail('user1234@gmail.com')).toBe(true);
    expect(checkEmail('john.doe@company.co.uk')).toBe(true);
    expect(checkEmail('info@openai.com')).toBe(true);
  });

  it('should return false for invalid email addresses', () => {
    expect(checkEmail('notanemail')).toBe(false);
    expect(checkEmail('invalid@')).toBe(false);
    expect(checkEmail('invalid@example')).toBe(false);
    expect(checkEmail('invalid@domain')).toBe(false);
    expect(checkEmail('spaces in@domain.com')).toBe(false);
  });
});
