import { State, emptyState } from '../models/state';
import { createContext, Dispatch, useContext } from 'react';

export type Actions<T> = { type: 'setRaw'; raw: string } | { type: 'setParsed'; parsed: T[] };

export const reducer = <T>(state: State<T>, action: Actions<T>) => {
  switch (action.type) {
    case 'setRaw':
      return { ...state, raw: action.raw };
    case 'setParsed':
      return { ...state, parsed: action.parsed };
    default:
      return state;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let contextSingleton: React.Context<[State<any>, Dispatch<Actions<any>>]>;
export const getDSVImportContext = <T>() => {
  if (!contextSingleton) {
    contextSingleton = createContext<[State<T>, Dispatch<Actions<T>>]>([
      (emptyState as unknown) as State<T>,
      () => {
        throw new Error('Not initialized');
      }
    ]);
  }
  return contextSingleton as React.Context<[State<T>, Dispatch<Actions<T>>]>;
};
export const useDSVImport = <T = { [key: string]: string }>() => useContext(getDSVImportContext<T>());
