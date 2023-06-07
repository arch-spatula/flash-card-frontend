import { describe, vi } from 'vitest';
import { Button } from '.';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

describe('Button', () => {
  it('should invoke the function when the button is clicked', async () => {
    user.setup();
    const btnText = 'Button';
    const mock = vi.fn(() => 0);

    render(<Button onClick={mock}>{btnText}</Button>);
    const btnElement = screen.getByRole('button');
    await user.click(btnElement);

    expect(btnElement).toBeInTheDocument();
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
