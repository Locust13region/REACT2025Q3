import { use } from 'react';
import { ThemeUpdateContext } from '@/components/theme-context';

export default function useTheme() {
  return use(ThemeUpdateContext);
}
