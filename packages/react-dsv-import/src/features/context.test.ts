import { useContext } from 'react';
import { renderHook } from '@testing-library/react';
import { reducer, getDSVImportContext } from './context';
import { State } from '../models/state';
import { describe } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';

describe('context', () => {
  type TestType = unknown;
  const defaultState: State<TestType> = { columns: [] };

  it('should reduce raw data action to state', () => {
    const newState = reducer<TestType>(defaultState, { type: 'setRaw', raw: 'Raw data' });
    expect(newState).toStrictEqual({ ...defaultState, raw: 'Raw data' });
  });

  it('should reduce parsed data action to state', () => {
    const newState = reducer<TestType>(defaultState, { type: 'setParsed', parsed: ['Parsed data'] });
    expect(newState).toStrictEqual({ ...defaultState, parsed: ['Parsed data'] });
  });

  it('should return state on unknown action', () => {
    const untypedReducer = reducer as <T>(state: State<T>, action: unknown) => State<T>;
    const newState = untypedReducer<TestType>(defaultState, { type: 'unknown' });
    expect(newState).toStrictEqual(defaultState);
  });

  it('should create the context as singleton', () => {
    const first = getDSVImportContext<TestType>();
    const second = getDSVImportContext<TestType>();

    expect(first).toStrictEqual(second);
  });

  it('should throw an error when the context is not initialized', () => {
    const context = getDSVImportContext<TestType>();
    const { result } = renderHook(() => useContext(context));
    const [, dispatch] = result.current;

    const provokeError = () => {
      dispatch({ type: 'setRaw', raw: 'fail' });
    };

    expect(provokeError).toThrowError('Not initialized');
  });
});
