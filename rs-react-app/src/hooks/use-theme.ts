import { use } from 'react';
import { ThemeContext } from '@/components/theme-context';

export default function useTheme() {
  return use(ThemeContext);
}
