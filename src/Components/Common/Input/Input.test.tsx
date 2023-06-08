import { Input } from '.';
import { render, screen } from '../../../libs/test-utils';
import { describe, it } from 'vitest';

describe('Input', () => {
  it('should render helper text', () => {
    const inputVal = 'foo';
    const helperText = "I'm helping";

    render(
      <Input value={inputVal} onChange={() => 1} helperText={helperText} />
    );

    const helperTextElement = screen.getByText(helperText);
    expect(helperTextElement).toBeInTheDocument();
  });

  it('should not render helper text when hideHelper is true', () => {
    const helperText = 'Test helper text';

    const { queryByText } = render(
      <Input
        value={'foo'}
        onChange={() => 0}
        helperText={helperText}
        hideHelper
      />
    );
    const helperTextElement = queryByText(helperText);

    expect(helperTextElement).not.toBeInTheDocument();
  });
});
