import { SignIn } from '.';
import { fireEvent, render, screen } from '../../libs/test-utils';
import { describe, it, vi } from 'vitest';

describe('SignIn', () => {
  it('should render Sign In as Heading', () => {
    render(<SignIn />);

    const headingElement = screen.getByRole('heading', { level: 1 });
    expect(headingElement).toBeInTheDocument();
    expect(headingElement.textContent).toBe('Sign In');
  });
});
