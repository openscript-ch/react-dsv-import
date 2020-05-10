import { ColumnsType } from '../models/column';
import { State } from '../models/state';
import { applyMiddlewares } from './middleware';

describe('middleware', () => {
  type TestType = { forename: string; surname: string; email: string };
  const columns: ColumnsType<TestType> = [
    { key: 'forename', label: 'Forename' },
    { key: 'surname', label: 'Surname' },
    { key: 'email', label: 'Email' }
  ];
  const defaultState: State<TestType> = { columns };

  it('should dispatch to all middlewares', () => {
    const dispatchMock = jest.fn();
    const middlewareAMock = jest.fn();
    const middlewareBMock = jest.fn();
    const middlewareCMock = jest.fn();
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
    const dispatchMock = jest.fn();
    const middlewareAMock = jest.fn((_state, dispatch) => {
      dispatch({ type: 'sequentCall' });
    });
    const middlewareBMock = jest.fn();
    const middlewareCMock = jest.fn();
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
});
