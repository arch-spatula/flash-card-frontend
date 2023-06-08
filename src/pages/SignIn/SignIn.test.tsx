import { SignIn } from '.';
import { render, screen } from '../../libs/test-utils';
import { describe, it } from 'vitest';

describe('SignIn', () => {
  it('should render Sign In as Heading', () => {
    render(<SignIn />);

    const headingElement = screen.getByRole('heading', { level: 1 });
    expect(headingElement).toBeInTheDocument();
    expect(headingElement.textContent).toBe('Sign In');
  });
});
