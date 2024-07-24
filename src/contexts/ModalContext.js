import { createContext, useState } from 'react';


const ModalContext = createContext({
  isOpen: true,
  setIsOpen: () => {},
  handler: () => {},
});

const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handler = (callback) => callback();

  const value = {
    isOpen,
    setIsOpen,
    handler,
  }

  return (
    <ModalContext.Provider value={value}>
      { children }
    </ModalContext.Provider>
  );
}

export { ModalContext, ModalProvider };
