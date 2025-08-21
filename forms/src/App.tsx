import { Provider } from 'react-redux';
import './App.css';
import UncontrolledForm from './components/uncontrolled/uncontrolled-form';
import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <h1>React forms</h1>
      <section className="controls">
        <button>Uncontrolled</button>
        <button>Controlled</button>
      </section>
      <section className="forms">
        <UncontrolledForm />
      </section>
      <div className="tiles">
        <h3>Controlled</h3>
        <article className="tile"></article>
      </div>
    </Provider>
  );
}

export default App;
