import { Dispatch } from 'react';
import { State } from '../models/state';
import { Middleware } from '../models/middleware';

export const applyMiddlewares = <T, A>(state: State<T>, dispatch: Dispatch<A>, ...middlewares: Middleware<T, A>[]) => (
  action: A
) => {
  const without = (nextMiddlewares: Middleware<T, A>[], i: number) => {
    return nextMiddlewares.filter((_, filterIndex) => i !== filterIndex);
  };

  const next = (nextMiddlewares: Middleware<T, A>[]) => (value: A) => {
    dispatch(value);
    call(nextMiddlewares, value);
  };

  const call = (nextMiddlewares: Middleware<T, A>[], value: A) => {
    nextMiddlewares.forEach((m, i) => {
      m(state, next(without(nextMiddlewares, i)), value);
    });
  }

  call(middlewares, action);
};
