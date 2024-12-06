import { useRef, useEffect, BaseSyntheticEvent, RefObject, useCallback, useState } from 'react';
import { create } from 'zustand';

type ClickAwayStoreType = {
  refs: Set<RefObject<HTMLElement>>;
  actions: {
    push: (ref: RefObject<HTMLElement>) => void;
    pop: () => void;
  };
};

const useClickAwayStore = create<ClickAwayStoreType>((set) => ({
  refs: new Set<RefObject<HTMLElement>>(),
  actions: {
    push: (ref) => set((state) => ({ refs: new Set([...state.refs, ref]) })),
    pop: () =>
      set((state) => {
        const newRefs = new Set(state.refs);
        const top = [...newRefs].pop();
        if (top) {
          newRefs.delete(top);
        }
        return { refs: newRefs };
      }),
  },
}));

const ID_PREFIX = 'click-away-' as const;
let _id = 0;

const useClickAway = <T extends HTMLElement>(callback: () => void, delay: number = 0) => {
  const ref = useRef<T>(null);
  const [id] = useState(() => `${ID_PREFIX}${_id++}`);
  const { refs, actions } = useClickAwayStore();

  const handleClick = useCallback(
    (event: BaseSyntheticEvent | MouseEvent) => {
      if (!ref.current || !refs.size) {
        return;
      }

      if ([...refs.values()].map((val) => val.current?.id)[refs.size - 1] === id) {
        if (!ref.current.contains(event.target)) {
          callback();
          actions.pop();
        }
      }
    },
    [refs, id, callback, actions]
  );

  useEffect(() => {
    if (ref.current) {
      ref.current.id = id;
      actions.push(ref);
    }
  }, [actions, id]);

  useEffect(() => {
    setTimeout(() => {
      document.addEventListener('click', handleClick);
    }, delay);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [delay, handleClick]);

  return ref;
};

export default useClickAway;
