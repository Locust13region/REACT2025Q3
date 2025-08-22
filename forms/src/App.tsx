import { Provider } from 'react-redux';
import './App.css';
import UncontrolledForm from './components/form-uncontrolled/uncontrolled-form';
import { store } from './redux/store';
import FormView from './components/form-view/form-view';
import Controls from './components/controls/controls';

function App() {
  return (
    <Provider store={store}>
      <h1>React forms</h1>
      <Controls />
      <section className="forms">
        <UncontrolledForm />
      </section>
      <FormView />
    </Provider>
  );
}

export default App;
