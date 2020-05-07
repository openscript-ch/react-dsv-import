import { createParserMiddleware } from './parserMiddleware';
import { State } from '../models/state';
import { ColumnsType } from '../models/column';
import { Delimiter } from '../models/delimiter';

describe('parserMiddleware', () => {
  type TestType = { forename: string; surname: string; email: string };
  const columns: ColumnsType<TestType> = [
    { key: 'forename', label: 'Forename' },
    { key: 'surname', label: 'Surname' },
    { key: 'email', label: 'Email' }
  ];
  const defaultState: State<TestType> = { columns };
  const middleware = createParserMiddleware<TestType>();

  const rawData = 'Max!Muster!max@example.com\n!!unknown@example.com';

  it('should set new parsed data when raw data is set', () => {
    const dispatchMock = jest.fn();
    middleware(defaultState, dispatchMock, { type: 'setRaw', raw: 'Max' });

    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toBeCalledWith({
      type: 'setParsed',
      parsed: [{ forename: 'Max', surname: undefined, email: undefined }]
    });
  });

  it('should set parsed data to an empty array if there is no raw data', () => {
    const dispatchMock = jest.fn();
    const stateWithRawData = {
      ...defaultState,
      raw: 'Max',
      parsed: [{ forename: 'Max', surname: '', email: '' }]
    };
    middleware(stateWithRawData, dispatchMock, { type: 'setRaw', raw: '' });

    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toBeCalledWith({
      type: 'setParsed',
      parsed: []
    });
  });

  it('should detect the correct delimiter from raw data', () => {
    Object.values(Delimiter).forEach((d) => {
      const dispatchMock = jest.fn();
      middleware(defaultState, dispatchMock, { type: 'setRaw', raw: rawData.replace(/!/g, d) });

      expect(dispatchMock).toBeCalledTimes(1);
      expect(dispatchMock).toBeCalledWith({
        type: 'setParsed',
        parsed: [
          { forename: 'Max', surname: 'Muster', email: 'max@example.com' },
          { forename: '', surname: '', email: 'unknown@example.com' }
        ]
      });
    });
  });
});
