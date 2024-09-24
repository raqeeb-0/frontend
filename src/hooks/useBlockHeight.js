import { useState, useEffect } from 'react';


export const useBlockHeight = (props) => {
  const { ref, blockInnerText } = props;
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) {
      throw new Error('Block ref not found');
    }

    if (blockInnerText) {
      setHeight(ref.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [blockInnerText]);

  return { height }
}
