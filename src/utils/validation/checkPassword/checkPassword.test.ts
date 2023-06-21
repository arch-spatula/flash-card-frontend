import { describe, it } from 'vitest';
import { checkPassword } from '.';

describe('Password Validation', () => {
  it('should return true for valid passwords', () => {
    expect(checkPassword('Abc12345')).toBe(true);
    expect(checkPassword('Password123')).toBe(true);
    expect(checkPassword('secureP@ssw0rd')).toBe(true);
    expect(checkPassword('1#2345678Ab')).toBe(true);
  });

  it('should return false for invalid passwords', () => {
    expect(checkPassword('weak')).toBe(false);
    expect(checkPassword('password')).toBe(false);
    expect(checkPassword('12345678')).toBe(false);
  });
});
