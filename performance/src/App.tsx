import { Suspense, useState } from 'react';
import Header from './components/header/header';
import Co2DataProvider from './components/context/context-provider';

function App() {
  const [year, setYear] = useState(2023);
  const [country, setCountry] = useState('');

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
            <div>performance</div>
          </Suspense>
        </Co2DataProvider>
      </Suspense>
    </div>
  );
}

export default App;
