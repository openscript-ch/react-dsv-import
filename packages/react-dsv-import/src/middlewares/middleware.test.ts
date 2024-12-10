import { describe } from 'vitest';
import { ColumnType } from '../models/column';
import { State } from '../models/state';
import { applyMiddlewares } from './middleware';
import { it } from 'vitest';
import { vi } from 'vitest';
import { expect } from 'vitest';

describe('middleware', () => {
  type TestType = { forename: string; surname: string; email: string };
  const columns: ColumnType<TestType>[] = [
    { key: 'forename', label: 'Forename' },
    { key: 'surname', label: 'Surname' },
    { key: 'email', label: 'Email' },
  ];
  const defaultState: State<TestType> = { columns };

  it('should dispatch to all middlewares', () => {
    const dispatchMock = vi.fn();
    const middlewareAMock = vi.fn();
    const middlewareBMock = vi.fn();
    const middlewareCMock = vi.fn();
    const enhancedDispatch = applyMiddlewares(
      defaultState,
      dispatchMock,
      middlewareAMock,
      middlewareBMock,
      middlewareCMock
    );
    enhancedDispatch({});

    expect(middlewareAMock).toBeCalledTimes(1);
    expect(middlewareBMock).toBeCalledTimes(1);
    expect(middlewareCMock).toBeCalledTimes(1);
  });

  it('should forward a dispatch to other middlewares', () => {
    const dispatchMock = vi.fn();
    const middlewareAMock = vi.fn((_state, dispatch) => {
      dispatch({ type: 'sequentCall' });
    });
    const middlewareBMock = vi.fn();
    const middlewareCMock = vi.fn();
    const enhancedDispatch = applyMiddlewares(
      defaultState,
      dispatchMock,
      middlewareAMock,
      middlewareBMock,
      middlewareCMock
    );
    enhancedDispatch({ type: 'initialCall' });

    expect(middlewareAMock).toBeCalledTimes(1);
    expect(middlewareBMock).toBeCalledTimes(2);
    expect(middlewareBMock).toHaveBeenNthCalledWith(1, defaultState, expect.any(Function), { type: 'sequentCall' });
    expect(middlewareBMock).toHaveBeenNthCalledWith(2, defaultState, expect.any(Function), { type: 'initialCall' });
    expect(middlewareCMock).toBeCalledTimes(2);
  });

  it('should not call a middleware twice', () => {
    const dispatchMock = vi.fn();
    const middlewareAMock = vi.fn((_state, dispatch) => {
      dispatch({ type: 'sequentCall' });
    });
    const middlewareBMock = vi.fn((_state, dispatch) => {
      dispatch({ type: 'sequentCall' });
    });
    const middlewareCMock = vi.fn((_state, dispatch) => {
      dispatch({ type: 'sequentCall' });
    });
    const enhancedDispatch = applyMiddlewares(
      defaultState,
      dispatchMock,
      middlewareAMock,
      middlewareBMock,
      middlewareCMock
    );
    enhancedDispatch({ type: 'initialCall' });

    expect(middlewareAMock).toBeCalledTimes(5);
    expect(middlewareBMock).toBeCalledTimes(5);
    expect(middlewareBMock).toHaveBeenNthCalledWith(1, defaultState, expect.any(Function), { type: 'sequentCall' });
    expect(middlewareBMock).toHaveBeenNthCalledWith(2, defaultState, expect.any(Function), { type: 'sequentCall' });
    expect(middlewareCMock).toBeCalledTimes(5);
  });
});
