import { use } from 'react';
import ThemeContext from '../theme/theme-context';

export default function useTheme() {
  return use(ThemeContext);
}
