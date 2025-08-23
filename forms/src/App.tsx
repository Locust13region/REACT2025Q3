import { Provider } from 'react-redux';
import './App.css';
// import ControlledForm from './components/form-controlled/controlled-form';
import UncontrolledForm from './components/form-uncontrolled/uncontrolled-form';
import { store } from './redux/store';
import FormsView from './components/form-view/forms-view';
import Controls from './components/controls/controls';

function App() {
  return (
    <Provider store={store}>
      <h1>React forms</h1>
      <Controls />
      <section className="forms">
        {/* <ControlledForm /> */}
        <UncontrolledForm />
      </section>
      <FormsView />
    </Provider>
  );
}

export default App;
