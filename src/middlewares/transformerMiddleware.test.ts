import { ColumnType } from '../models/column';
import { State } from '../models/state';
import { createTransformerMiddleware } from './transformerMiddleware';

describe('validatorMiddleware', () => {
  type TestType = { forename: string; surname: string; email: string };
  const defaultColumns: ColumnType<TestType>[] = [
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
  const trimTransformer = (value: string) => value.trim();
  const markTransformer = (value: string) => `${value}!`;

  it('should not dispatch if there are no transformers', () => {
    const state: State<TestType> = { columns: defaultColumns };
    const dispatchMock = jest.fn();

    middleware(state, dispatchMock, { type: 'setParsed', parsed });
    expect(dispatchMock).toBeCalledTimes(0);
  });

  it('should run a transformer on all values', () => {
    const state: State<TestType> = { columns: defaultColumns, transformers: [trimTransformer] };
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
    const state: State<TestType> = {
      columns: [
        { key: 'forename', label: 'Forename' },
        { key: 'surname', label: 'Surname', transformers: [trimTransformer, markTransformer] },
        { key: 'email', label: 'Email' }
      ]
    };
    const dispatchMock = jest.fn();

    middleware(state, dispatchMock, { type: 'setParsed', parsed });

    expect(dispatchMock).toBeCalledWith({
      type: 'setParsed',
      parsed: [
        { forename: 'Hans', surname: 'Muster!', email: 'h.muster@example.com' },
        { forename: 'Heidi', surname: 'Muster!', email: 'h.muster@example.com' },
        { forename: 'Joe', surname: 'Doe!', email: ' j.doe@example.com ' }
      ]
    });
  });
});
