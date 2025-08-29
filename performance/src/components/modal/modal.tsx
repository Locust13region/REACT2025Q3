import {
  useEffect,
  useRef,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';

const Modal = ({
  children,
  setShowModal,
}: {
  children: ReactNode;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    modalRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowModal(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setShowModal]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setShowModal(false);
  };

  const onClick = () => setShowModal(false);

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-gray-900/80 flex justify-center items-center"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative p-2 bg-gray-300 dark:bg-gray-500"
      >
        <button onClick={onClick} className="absolute right-2">
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
