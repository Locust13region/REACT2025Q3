import { Provider } from 'react-redux';
import './App.css';

import { store } from './redux/store';
import { Suspense, useEffect } from 'react';
import { fetchCoData } from './api/fetch-data';
import parseData from './utils/parse-date';
import { useAppDispatch } from './redux/hooks';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchedData = fetchCoData();
    const parsedData = parseData(fetchedData);
    dispatch();
  }, [dispatch]);
  return (
    <Provider store={store}>
      <Suspense fallback={<h3>Loading...</h3>}>
        <div>performance</div>
      </Suspense>
    </Provider>
  );
}

export default App;
