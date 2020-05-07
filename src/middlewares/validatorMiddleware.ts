import { State } from '../models/state';
import { Actions } from '../features/context';
import { Dispatch } from 'react';

export const createValidatorMiddleware = <T>() => {
  return (state: State<T>, next: Dispatch<Actions<T>>, action: Actions<T>) => {
    if (action.type === 'setParsed') {
    }
  };
};
