import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useCardSide } from '.';

describe('useCardSide', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useCardSide());

    act(() => {
      result.current.dispatch('front');
    });
  });

  it('should start as front', () => {
    const { result } = renderHook(() => useCardSide());

    expect(result.current.cardSide).toBe('front');
  });

  it('should update to back', () => {
    const { result } = renderHook(() => useCardSide());

    act(() => {
      result.current.dispatch('back');
    });

    expect(result.current.cardSide).toBe('back');
  });

  it('should update to edit', () => {
    const { result } = renderHook(() => useCardSide());

    act(() => {
      result.current.dispatch('edit');
    });

    expect(result.current.cardSide).toBe('edit');
  });

  it('should revert back to previous side', () => {
    const { result } = renderHook(() => useCardSide());

    act(() => {
      result.current.dispatch('edit');
    });
    act(() => {
      result.current.dispatch('prev');
    });

    expect(result.current.cardSide).toBe('front');
  });
});
