import { render, screen } from '../../../libs/test-utils';
import { describe, vi, it } from 'vitest';
import { Button } from '.';
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

  it('should not invoke the function when the button is disabled', async () => {
    user.setup();
    const btnText = 'Button';
    const mock = vi.fn(() => 0);

    render(
      <Button onClick={mock} disabled>
        {btnText}
      </Button>
    );
    const btnElement = screen.getByRole('button');
    await user.click(btnElement);

    expect(btnElement).toBeDisabled();
    expect(mock).toHaveBeenCalledTimes(0);
  });

  it('should invoke the function when the button is call from form', async () => {
    user.setup();
    const btnText = 'Button';
    const mock = vi.fn((e) => e.preventDefault());

    render(
      <form onSubmit={mock}>
        <Button>{btnText}</Button>
      </form>
    );
    const btnElement = screen.getByRole('button');
    const linkElement = screen.queryByRole('link');
    await user.click(btnElement);

    expect(linkElement).not.toBeInTheDocument();
    expect(btnElement).toBeInTheDocument();
    expect(mock).toHaveBeenCalledTimes(1);
  });

  it('should not invoke the function while button is loading', async () => {
    user.setup();
    const btnText = 'Button';
    const mock = vi.fn(() => 0);

    render(
      <Button onClick={mock} isLoading>
        {btnText}
      </Button>
    );
    const btnElement = screen.getByRole('button');
    await user.click(btnElement);

    expect(btnElement).toBeDisabled();
    expect(mock).toHaveBeenCalledTimes(0);
  });

  it('should render a tag when href props is provided', () => {
    const btnText = 'Button;';

    render(<Button href="#">{btnText}</Button>);
    const btnLinkElement = screen.getByRole('link');

    expect(btnLinkElement).toBeInTheDocument();
  });
});
