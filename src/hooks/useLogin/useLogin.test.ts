import { describe, expect, it } from 'vitest';
import { useLogin } from '.';
import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

describe('useLogin', () => {
  it('returns initial isLoggedIn value as false', () => {
    const { result } = renderHook(() => useLogin());

    expect(result.current.isLoggedIn).toBe(false);
  });

  it('updates isLoggedIn value when login is called', () => {
    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.login();
    });

    expect(result.current.isLoggedIn).toBe(true);
  });

  it('updates isLoggedIn value when logout is called', () => {
    const { result } = renderHook(() => useLogin());

    // Set the initial value to true
    act(() => {
      result.current.login();
    });

    expect(result.current.isLoggedIn).toBe(true);

    act(() => {
      result.current.logout();
    });

    expect(result.current.isLoggedIn).toBe(false);
  });
});
