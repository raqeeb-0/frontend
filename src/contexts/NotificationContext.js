import { createContext, useState } from 'react';


const NotificationContext = createContext({
  message: '',
  setMessage: () => {},
  type: '',
  setType: () => {},
  refresh: 0,
  showNotification: () => {},
});

const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');
  const [refresh, setRefresh] = useState(0);

  const showNotification = () => {
    setRefresh(refresh + 1);
  }

  const value = {
    message,
    setMessage,
    type,
    setType,
    refresh,
    showNotification,
  }

  return (
    <NotificationContext.Provider value={value}>
      { children }
    </NotificationContext.Provider>
  );
}

export { NotificationContext, NotificationProvider };
