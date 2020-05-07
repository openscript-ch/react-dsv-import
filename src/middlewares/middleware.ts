import { Dispatch } from 'react';
import { Actions } from '../features/context';
import { State } from '../models/state';

type Middleware = <T>(state: State<T>, dispatch: Dispatch<Actions<T>>, action: Actions<T>) => void;

export const applyMiddlewares = <T>(state: State<T>, dispatch: Dispatch<Actions<T>>, ...middlewares: Middleware[]) => (
  action: Actions<T>
) => {
  const without = (i: number) => {
    return middlewares.filter((_, filterIndex) => i !== filterIndex);
  };

  const next = (nextMiddlewares: Middleware[]) => (value: Actions<T>) => {
    dispatch(value);
    nextMiddlewares.forEach((m, i) => {
      m(state, next(without(i)), value);
    });
  };

  middlewares.forEach((m, i) => m(state, next(without(i)), action));
};
