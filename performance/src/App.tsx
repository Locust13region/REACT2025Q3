import './App.css';
import { Suspense, useEffect } from 'react';
import { useAppDispatch } from './redux/hooks';
import { loadCo2Data } from './redux/co2-data-thunk';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadCo2Data());
  }, [dispatch]);
  return (
    <Suspense fallback={<h3>Loading...</h3>}>
      <div>performance</div>
    </Suspense>
  );
}

export default App;
