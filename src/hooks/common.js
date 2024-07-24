import { useContext, useEffect } from 'react';
import { NotificationContext } from '../contexts/NotificationContext';
import { AuthContext } from '../contexts/AuthContext';
import { ModalContext } from '../contexts/ModalContext';


export const useOutsideClick = (props) => {
  const { ref, handler } = props;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, [ref, handler]);
}


export const useNotify = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotify must be used within a NoificationProvider');
  }

  return context;
}


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}


export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  return context;
}


export const useResponseHandler = () => {
  const { setMessage, setType, showNotification } = useNotify();

  const handleResponse = (response, success) => {
    if (response === undefined) {
      setMessage('Can\'t connect to the server');
      setType('error');
      showNotification();
    } else if (response.status === 'fail') {
      setMessage(response?.message);
      setType('error');
      response?.message && showNotification();
    } else if (response.status === 'error') {
      console.log(response?.message);
      setMessage('Internal Server Error');
      setType('error');
      showNotification();
    } else if (response.status === 'success') {
      success();
    } else {
      console.log(response);
      console.log('Unknown Response');
    }
  }

  return { handleResponse };
}
