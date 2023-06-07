import { render } from '@testing-library/react';
import AllProviders from './AllTheProviders';

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, {
    wrapper: AllProviders,
    ...options,
  });

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';

// override render export
export { customRender as render };
