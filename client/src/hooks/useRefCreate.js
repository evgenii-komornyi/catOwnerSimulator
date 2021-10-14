import { useRef } from 'react';

export const useRefCreate = (state) => {
    const ref = useRef(state);
    ref.current = state;

    return ref;
};
