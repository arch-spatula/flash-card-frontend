import { describe, expect, it } from 'vitest';
import { useLogin } from '.';
import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

describe('useLogin', () => {
  it('returns initial isLoggedIn value as false', () => {
    const { result } = renderHook(() => useLogin());

    expect(result.current.token).toBe('');
  });

  it('updates isLoggedIn value when login is called', () => {
    const token = 'token1234';
    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.setToken(token);
    });

    expect(result.current.token).toBe(token);
  });
});
