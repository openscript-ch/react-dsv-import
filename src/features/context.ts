import { State, emptyState } from '../models/state';
import { createContext, Dispatch, useContext } from 'react';

export type Actions = { type: 'setRaw'; raw: string };

export const reducer = (state: State, action: Actions) => {
  switch (action.type) {
    case 'setRaw':
      return { ...state, raw: action.raw };
    default:
      return state;
  }
};

export const DSVImportContext = createContext<[State, Dispatch<Actions>]>([
  emptyState,
  () => {
    throw new Error('Not initialized');
  }
]);
export const useDSVImport = () => useContext(DSVImportContext);
