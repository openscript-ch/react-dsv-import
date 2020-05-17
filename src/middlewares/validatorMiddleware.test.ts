import { createValidatorMiddleware } from './validatorMiddleware';
import { State } from '../models/state';
import { ColumnsType } from '../models/column';

describe('validatorMiddleware', () => {
  type TestType = { forename: string; surname: string; email: string };
  const defaultColumns: ColumnsType<TestType> = [
    { key: 'forename', label: 'Forename' },
    { key: 'surname', label: 'Surname' },
    { key: 'email', label: 'Email' }
  ];
  const defaultState: State<TestType> = { columns: defaultColumns };
  const middleware = createValidatorMiddleware<TestType>();
  const parsed: TestType[] = [
    { forename: 'Hans', surname: 'Muster', email: 'h.muster@example.com' },
    { forename: 'Heidi', surname: 'Muster', email: 'h.muster@example.com' }
  ];

  it('should return an empty array if there are no errors', () => {
    const dispatchMock = jest.fn();

    middleware(defaultState, dispatchMock, { type: 'setParsed', parsed });

    expect(dispatchMock).toBeCalledWith({ type: 'setValidation', errors: [] });
  });

  it('should validate unique constraints', () => {
    const dispatchMock = jest.fn();
    const columns: ColumnsType<TestType> = [...defaultColumns];
    columns[2] = { ...defaultColumns[2], rules: [{ constraint: { unique: true }, message: 'Contains duplicates' }] };
    const state: State<TestType> = { columns };

    middleware(state, dispatchMock, { type: 'setParsed', parsed });

    expect(dispatchMock).toBeCalledWith({
      type: 'setValidation',
      errors: [
        { column: 'email', row: 0, message: 'Contains duplicates' },
        { column: 'email', row: 1, message: 'Contains duplicates' }
      ]
    });
  });

  it('should validate with callback constraints', () => {
    const dispatchMock = jest.fn();
    const columns: ColumnsType<TestType> = [...defaultColumns];
    columns[0] = {
      ...defaultColumns[0],
      rules: [{ constraint: { callback: (value) => value === 'Hans' }, message: "No 'Hans' allowed" }]
    };
    const state: State<TestType> = { columns };
    middleware(state, dispatchMock, { type: 'setParsed', parsed });

    expect(dispatchMock).toBeCalledWith({
      type: 'setValidation',
      errors: [{ column: 'forename', row: 1, message: "No 'Hans' allowed" }]
    });
  });
});
