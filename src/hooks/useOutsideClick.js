import { useEffect } from 'react';


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
