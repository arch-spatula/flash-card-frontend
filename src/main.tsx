import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from '@emotion/react';
import theme from './styles/theme.ts';
import queryClient from './libs/queryClient.ts';

/**
 * 실제 DB랑 통신을 확인하고 싶으면 아래 worker를 주석처리
 * api가 안정화 되면 아래 설정 {onUnhandledRequest: 'bypass'}은 해제
 * @see https://stackoverflow.com/questions/68024935/msw-logging-warnings-for-unhandled-supertest-requests
 * import는 비동기 함수이기 때문 async await와 즉시 실행함수가 필요함
 */
(async function () {
  if (process.env.NODE_ENV === 'development') {
    // tree shaking을 위해 await import 활용
    const { worker } = await import('./mocks/worker.ts');
    worker.start({ onUnhandledRequest: 'bypass' });
  }
})();

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
