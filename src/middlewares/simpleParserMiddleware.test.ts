import { createSimpleParserMiddleware } from './simpleParserMiddleware';
import { State } from '../models/state';
import { ColumnsType } from '../models/column';
import { Delimiter } from '../models/delimiter';

describe('simpleParserMiddleware', () => {
  type TestType = { forename: string; surname: string; email: string };
  const columns: ColumnsType<TestType> = [
    { key: 'forename', label: 'Forename' },
    { key: 'surname', label: 'Surname' },
    { key: 'email', label: 'Email' }
  ];
  const defaultState: State<TestType> = { columns };
  const middleware = createSimpleParserMiddleware<TestType>();

  const rawData = 'Max!Muster!max@example.com\n!!unknown@example.com';

  it('should set new parsed data when raw data is set', () => {
    const newState = middleware(defaultState, { type: 'setRaw', raw: 'Max' });

    expect(newState.parsed).toStrictEqual([{ forename: 'Max', surname: undefined, email: undefined }]);
  });

  it('should detect the correct delimiter from raw data', () => {
    Object.values(Delimiter).forEach((d) => {
      const newState = middleware(defaultState, { type: 'setRaw', raw: rawData.replace(/!/g, d) });

      expect(newState.parsed?.length).toBe(2);
      expect(newState.parsed?.[0]).toStrictEqual({ forename: 'Max', surname: 'Muster', email: 'max@example.com' });
      expect(newState.parsed?.[1]).toStrictEqual({
        forename: '',
        surname: '',
        email: 'unknown@example.com'
      });
    });
  });
});
