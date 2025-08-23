import { Provider } from 'react-redux';
import './App.css';

import { store } from './redux/store';
import FormsView from './components/form-view/forms-view';
import Controls from './components/controls/controls';

function App() {
  return (
    <Provider store={store}>
      <h1>React forms</h1>
      <Controls />
      <FormsView />
    </Provider>
  );
}

export default App;
