import { useRef, useEffect, BaseSyntheticEvent } from 'react';

const useClickAway = <T extends HTMLElement>(callback: () => void, delay: number = 0) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClick = (event: BaseSyntheticEvent | MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    setTimeout(() => {
      document.addEventListener('click', handleClick);
    }, delay);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [callback, delay, ref]);

  return ref;
};

export default useClickAway;
