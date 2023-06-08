import { render, screen } from './libs/test-utils';
import { describe, expect, it } from 'vitest';
import user from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  it('should renders have navbar tex nav', async () => {
    // Arrange
    user.setup();
    render(<App />);

    // Act(선택적)
    // 현재는 생략

    // Expect
    expect(screen.getByRole('navigation')).toHaveTextContent('Home');
  });
});
