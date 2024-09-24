import { useState } from 'react';
import { NotificationContext } from './contexts';


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
    type,
    refresh,
    notify,
  }

  return (
    <NotificationContext.Provider value={value}>
      { children }
    </NotificationContext.Provider>
  );
}

export { NotificationProvider };
