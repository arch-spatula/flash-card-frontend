// lib/test-utils.ts
import { render } from '@testing-library/react';
import AllProviders from './AllTheProviders';

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, {
    // wrap provider(s) here if needed
    wrapper: AllProviders,
    ...options,
  });

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';

// override render export
export { customRender as render };
