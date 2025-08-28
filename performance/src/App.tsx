import { Suspense, useState } from 'react';
import Header from './components/header/header';
import Co2DataProvider from './components/context/context-provider';
import type { RawCountries, YearData } from './types/types';
import Table from './components/table/table';

function App() {
  const [country, setCountry] = useState<keyof RawCountries | undefined>(
    undefined
  );
  const [year, setYear] = useState<YearData['year']>(2023);

  return (
    <div
      className={
        'h-screen w-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-950 dark:text-gray-100'
      }
    >
      <Suspense fallback={<h3>Loading data...</h3>}>
        <Co2DataProvider>
          <Header
            country={country}
            setCountry={setCountry}
            year={year}
            setYear={setYear}
          />
          <Suspense fallback={<h3>Prepare data...</h3>}>
            <Table
              country={country}
              year={year}
              extraKeys={['population', 'cement_co2']}
            />
          </Suspense>
        </Co2DataProvider>
      </Suspense>
    </div>
  );
}

export default App;
