import './App.css';
import ControlledForm from './components/controlled/controlled-form';

function App() {
  return (
    <>
      <h1>React forms</h1>
      <section className="controls">
        <button>Controlled</button>
        <button>Uncontrolled</button>
      </section>
      <section className="forms">
        <ControlledForm />
      </section>
      <div className="tiles">
        <h3>Controlled</h3>
        <article className="tile"></article>
      </div>
    </>
  );
}

export default App;
