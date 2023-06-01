import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { worker } from './mocks/worker.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from '@emotion/react';
import theme from './styles/theme.ts';

if (process.env.NODE_ENV === 'development') {
  /**
   * api가 안정화 되면 아래 설정 {onUnhandledRequest: 'bypass'}은 해제합니다.
   * @see https://stackoverflow.com/questions/68024935/msw-logging-warnings-for-unhandled-supertest-requests
   */
  worker.start({ onUnhandledRequest: 'bypass' });
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
