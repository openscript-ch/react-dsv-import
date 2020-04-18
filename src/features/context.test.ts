import { reducer, getDSVImportContext } from './context';
import { State } from '../models/state';

describe('context', () => {
  type TestType = {};
  const defaultState: State<TestType> = { columns: [] };

  it('should reduce raw data to state', () => {
    const newState = reducer<TestType>(defaultState, { type: 'setRaw', raw: 'Raw data' });
    expect(newState).toStrictEqual({ ...defaultState, raw: 'Raw data' });
  });

  it('should reduce parsed data to state', () => {
    const newState = reducer<TestType>(defaultState, { type: 'setParsed', parsed: ['Parsed data'] });
    expect(newState).toStrictEqual({ ...defaultState, parsed: ['Parsed data'] });
  });

  it('should create the context as singleton', () => {
    const first = getDSVImportContext<TestType>();
    const second = getDSVImportContext<TestType>();

    expect(first).toStrictEqual(second);
  });
});
