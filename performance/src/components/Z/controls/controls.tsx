import { useState } from 'react';
import ControlledForm from '@/components/Z/form-controlled/controlled-form';
import UncontrolledForm from '@/components/Z/form-uncontrolled/uncontrolled-form';
import { createPortal } from 'react-dom';
import Modal from '@/components/Z/modal/modal';

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
            {showControlled && <ControlledForm modalClose={modalClose} />}
            {showUncontrolled && <UncontrolledForm modalClose={modalClose} />}
          </Modal>,
          document.body
        )}
    </>
  );
};

export default Controls;
