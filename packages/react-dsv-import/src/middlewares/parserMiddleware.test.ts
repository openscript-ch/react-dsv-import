import { createParserMiddleware } from './parserMiddleware';
import { State } from '../models/state';
import { ColumnType } from '../models/column';
import { Delimiter } from '../models/delimiter';
import { describe } from 'vitest';
import { it } from 'vitest';
import { vi } from 'vitest';
import { expect } from 'vitest';

describe('parserMiddleware', () => {
  type TestType = { forename: string; surname: string; email: string };
  const columns: ColumnType<TestType>[] = [
    { key: 'forename', label: 'Forename' },
    { key: 'surname', label: 'Surname' },
    { key: 'email', label: 'Email' },
  ];
  const defaultState: State<TestType> = { columns };
  const middleware = createParserMiddleware<TestType>();

  const rawData = 'Max!Muster!max@example.com\n!!unknown@example.com';

  it('should set new parsed data when raw data is set', () => {
    const dispatchMock = vi.fn();
    middleware(defaultState, dispatchMock, { type: 'setRaw', raw: 'Max' });

    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toBeCalledWith({
      type: 'setParsed',
      parsed: [{ forename: 'Max', surname: undefined, email: undefined }],
    });
  });

  it('should only be triggered on new raw data', () => {
    const dispatchMock = vi.fn();
    middleware(defaultState, dispatchMock, { type: 'setValidation', errors: [] });

    expect(dispatchMock).toBeCalledTimes(0);
  });

  it('should set parsed data to an empty array if there is no raw data', () => {
    const dispatchMock = vi.fn();
    const stateWithRawData = {
      ...defaultState,
      raw: 'Max',
      parsed: [{ forename: 'Max', surname: '', email: '' }],
    };
    middleware(stateWithRawData, dispatchMock, { type: 'setRaw', raw: '' });

    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toBeCalledWith({
      type: 'setParsed',
      parsed: [],
    });
  });

  it('should detect the correct delimiter from raw data', () => {
    Object.values(Delimiter).forEach((d) => {
      const dispatchMock = vi.fn();
      middleware(defaultState, dispatchMock, { type: 'setRaw', raw: rawData.replace(/!/g, d) });

      expect(dispatchMock).toBeCalledTimes(1);
      expect(dispatchMock).toBeCalledWith({
        type: 'setParsed',
        parsed: [
          { forename: 'Max', surname: 'Muster', email: 'max@example.com' },
          { forename: '', surname: '', email: 'unknown@example.com' },
        ],
      });
    });
  });
});
