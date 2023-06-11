import { describe, expect, it } from 'vitest';
import { useLogin } from '.';
import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

describe('useLogin', () => {
  it('should returns initial isLoggedIn value as false', () => {
    const { result } = renderHook(() => useLogin());

    expect(result.current.isLoggedIn).toBe(false);
  });

  it('should updates isLoggedIn value when login is called', () => {
    const accessToken = 'token1234';
    const refreshToken = 'token5678';
    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.setTokens(accessToken, refreshToken);
    });

    expect(result.current.isLoggedIn).toBe(true);
  });

  it('should empty both tokens', () => {
    const accessToken = 'token1234';
    const refreshToken = 'token5678';
    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.setTokens(accessToken, refreshToken);
    });

    expect(result.current.isLoggedIn).toBe(true);

    act(() => {
      result.current.emptyTokens();
    });

    expect(result.current.isLoggedIn).toBe(false);
  });
});
