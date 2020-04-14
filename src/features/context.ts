import { State, emptyState } from '../models/state';
import { createContext, Dispatch, useContext } from 'react';

export type Actions = { type: 'setRaw'; raw: string };

export const reducer = <T>(state: State<T>, action: Actions) => {
  switch (action.type) {
    case 'setRaw':
      return { ...state, raw: action.raw };
    default:
      return state;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let contextSingleton: React.Context<[State<any>, Dispatch<Actions>]>;
export const getDSVImportContext = <T>() => {
  if (!contextSingleton) {
    contextSingleton = createContext<[State<T>, Dispatch<Actions>]>([
      (emptyState as unknown) as State<T>,
      () => {
        throw new Error('Not initialized');
      }
    ]);
  }
  return contextSingleton as React.Context<[State<T>, Dispatch<Actions>]>;
};
export const useDSVImport = <T = { [key: string]: string }>() => useContext(getDSVImportContext<T>());
