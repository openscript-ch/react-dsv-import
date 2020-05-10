import { State, emptyState } from '../models/state';
import { createContext, Dispatch, useContext } from 'react';
import { Actions } from '../models/actions';

export const reducer = <T>(state: State<T>, action: Actions<T>) => {
  switch (action.type) {
    case 'setRaw':
      return { ...state, raw: action.raw };
    case 'setParsed':
      return { ...state, parsed: action.parsed };
    case 'setValidation':
      return { ...state, validation: action.errors };
    default:
      return state;
  }
};

export const createReducer = <T>() => {
  return (state: State<T>, action: Actions<T>) => {
    return reducer(state, action);
  };
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
