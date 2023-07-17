import { ThemeProvider } from '@emotion/react';
import theme from '../../styles/theme';
import queryClient from '../queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

type AllProvidersProps = { children: React.ReactNode };

export default function AllProviders({ children }: AllProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>{children}</BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
