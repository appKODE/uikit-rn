import { useReducer } from 'react';
import type { ISnack, SnackData } from './types';

type ShiftAction = {
  type: 'shift';
};

type CancelAction = {
  type: 'cancel';
  id: string;
};

type CancelAllAction = {
  type: 'cancelAll';
};

type AddAction = {
  type: 'add';
  payload: { id: string; options: ISnack };
};

const reducer = (
  state: SnackData[],
  action: ShiftAction | AddAction | CancelAction | CancelAllAction
) => {
  switch (action.type) {
    case 'shift':
      return state.slice(1);
    case 'add':
      return [
        ...state,
        { id: action.payload.id, payload: action.payload.options },
      ];
    case 'cancel':
      const index = state.findIndex((item) => item.id === action.id);
      if (index === -1) {
        return state;
      }

      if (index === 0) {
        const [first, ...others] = state;
        first!.payload.duration = 0;
        return [first!, ...others];
      }

      const newState = state.slice();
      newState.splice(index, 1);
      return newState;
    case 'cancelAll':
      const [first] = state;

      if (!first) {
        return [];
      }

      first.payload.duration = 0;
      return [first];
  }
};

export const useSnacks = () => {
  const [snacks, dispatch] = useReducer(reducer, []);

  return {
    snacks,
    shift: () => dispatch({ type: 'shift' }),
    add: (id: string, options: ISnack) =>
      dispatch({ type: 'add', payload: { id, options } }),
    cancel: (id: string) => dispatch({ type: 'cancel', id }),
    cancelAll: () => dispatch({ type: 'cancelAll' }),
  };
};
