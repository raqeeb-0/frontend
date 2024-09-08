import { createContext, useState } from 'react';


const NotificationContext = createContext({
  message: '',
  setMessage: () => {},
  type: '',
  setType: () => {},
  refresh: 0,
  showNotification: () => {},
  notify: () => {},
});

const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');
  const [refresh, setRefresh] = useState(0);

  const showNotification = () => {
    setRefresh(refresh + 1);
  }

  const notify = (message = '', type = 'success') => {
    setMessage(message);
    setType(type);
    showNotification();
  }

  const value = {
    message,
    setMessage,
    type,
    setType,
    refresh,
    showNotification,
    notify,
  }

  return (
    <NotificationContext.Provider value={value}>
      { children }
    </NotificationContext.Provider>
  );
}

export { NotificationContext, NotificationProvider };
