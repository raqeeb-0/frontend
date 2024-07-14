import { createContext, useState, useEffect } from 'react';


const NotificationContext = createContext({
  message: '',
  setMessage: () => {},
  type: '',
  setType: () => {},
  isActive: false,
  handleClose: () => {},
});

const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');
  const [isActive, setIsActive] = useState(false);
  const handleClose = () => setIsActive(false);

  useEffect(() => {
    let timer;
    if (message) {
      setIsActive(true);
      timer = setTimeout(() => setIsActive(false), 3000);
    }

    return () => clearTimeout(timer);
  }, [message]);

  const value = {
    message,
    setMessage,
    type,
    setType,
    isActive,
    handleClose,
  }

  return (
    <NotificationContext.Provider value={value}>
      { children }
    </NotificationContext.Provider>
  );
}

export { NotificationContext, NotificationProvider };
