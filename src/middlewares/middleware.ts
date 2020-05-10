import { Dispatch } from 'react';
import { State } from '../models/state';

type Middleware<T, A> = (state: State<T>, dispatch: Dispatch<A>, action: A) => void;

export const applyMiddlewares = <T, A>(state: State<T>, dispatch: Dispatch<A>, ...middlewares: Middleware<T, A>[]) => (
  action: A
) => {
  const without = (i: number) => {
    return middlewares.filter((_, filterIndex) => i !== filterIndex);
  };

  const next = (nextMiddlewares: Middleware<T, A>[]) => (value: A) => {
    dispatch(value);
    nextMiddlewares.forEach((m, i) => {
      m(state, next(without(i)), value);
    });
  };

  middlewares.forEach((m, i) => m(state, next(without(i)), action));
};
