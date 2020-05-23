import { ColumnsType } from '../models/column';
import { State } from '../models/state';
import { createTransformerMiddleware } from './transformerMiddleware';

describe('validatorMiddleware', () => {
  type TestType = { forename: string; surname: string; email: string };
  const defaultColumns: ColumnsType<TestType> = [
    { key: 'forename', label: 'Forename' },
    { key: 'surname', label: 'Surname' },
    { key: 'email', label: 'Email' }
  ];
  const middleware = createTransformerMiddleware<TestType>();
  const parsed: TestType[] = [
    { forename: 'Hans', surname: 'Muster', email: 'h.muster@example.com' },
    { forename: 'Heidi', surname: ' Muster', email: 'h.muster@example.com' },
    { forename: 'Joe', surname: 'Doe', email: ' j.doe@example.com ' }
  ];

  it('should not dispatch if there are no transformers', () => {
    const state: State<TestType> = { columns: defaultColumns };
    const dispatchMock = jest.fn();

    middleware(state, dispatchMock, { type: 'setParsed', parsed });
    expect(dispatchMock).toBeCalledTimes(0);
  });

  it('should run a transformer on all values', () => {
    const trimTransformer = (value: string) => value.trim();
    const state: State<TestType> = { columns: defaultColumns, transformers: [{ transformer: trimTransformer }] };
    const dispatchMock = jest.fn();

    middleware(state, dispatchMock, { type: 'setParsed', parsed });

    expect(dispatchMock).toBeCalledWith({
      type: 'setParsed',
      parsed: [
        { forename: 'Hans', surname: 'Muster', email: 'h.muster@example.com' },
        { forename: 'Heidi', surname: 'Muster', email: 'h.muster@example.com' },
        { forename: 'Joe', surname: 'Doe', email: 'j.doe@example.com' }
      ]
    });
  });

  it('should run transformers on values of a certain column', () => {
    const trimTransformer = (value: string) => value.trim();
    const state: State<TestType> = {
      columns: defaultColumns,
      transformers: [{ transformer: trimTransformer, column: 'surname' }]
    };
    const dispatchMock = jest.fn();

    middleware(state, dispatchMock, { type: 'setParsed', parsed });

    expect(dispatchMock).toBeCalledWith({
      type: 'setParsed',
      parsed: [
        { forename: 'Hans', surname: 'Muster', email: 'h.muster@example.com' },
        { forename: 'Heidi', surname: 'Muster', email: 'h.muster@example.com' },
        { forename: 'Joe', surname: 'Doe', email: ' j.doe@example.com ' }
      ]
    });
  });
});
