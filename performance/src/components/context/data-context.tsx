import type { RawCountries } from '@/types/types';
import { createContext } from 'react';

const Co2DataContext = createContext<RawCountries>({});

export default Co2DataContext;
