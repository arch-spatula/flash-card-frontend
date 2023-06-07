import { ThemeProvider } from '@emotion/react';
import theme from '../../styles/theme';
import queryClient from '../queryClient';
import { QueryClientProvider } from '@tanstack/react-query';

type AllProvidersProps = { children: React.ReactNode };

export default function AllProviders({ children }: AllProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </QueryClientProvider>
  );
}
