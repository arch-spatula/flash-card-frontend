import theme from '@/styles/theme';
import { PulseLoader } from 'react-spinners';

export function Spinner() {
  return (
    <PulseLoader
      color={theme.colors.green500}
      loading
      margin={4}
      size={20}
      speedMultiplier={0.5}
    />
  );
}
