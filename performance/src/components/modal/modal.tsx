import { useEffect, useRef, type ReactNode } from 'react';

const Modal = ({
  children,
  modalClose,
}: {
  children: ReactNode;
  modalClose: () => void;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    modalRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') modalClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) modalClose();
  };
  return (
    <div onClick={handleOverlayClick} className="overlay">
      <div ref={modalRef} tabIndex={-1} className="modal">
        <button onClick={modalClose} className="modal__close">
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
