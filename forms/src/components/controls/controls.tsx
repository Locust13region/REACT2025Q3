import { useState } from 'react';
import ControlledForm from '@/components/form-controlled/controlled-form';
import UncontrolledForm from '@/components/form-uncontrolled/uncontrolled-form';
import { createPortal } from 'react-dom';
import Modal from '@components/modal/modal';

const Controls = () => {
  const [showControlled, setShowControlled] = useState(false);
  const [showUncontrolled, setShowUncontrolled] = useState(false);

  const showModal = showControlled || showUncontrolled;
  const modalClose = () => {
    setShowControlled(false);
    setShowUncontrolled(false);
  };

  return (
    <>
      <section className="controls">
        <button onClick={() => setShowControlled(true)}>Controlled</button>
        <button onClick={() => setShowUncontrolled(true)}>Uncontrolled</button>
      </section>
      {showModal &&
        createPortal(
          <Modal modalClose={modalClose}>
            {showControlled && <ControlledForm />}
            {showUncontrolled && <UncontrolledForm />}
          </Modal>,
          document.body
        )}
    </>
  );
};

export default Controls;
