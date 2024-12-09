import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ColumnType } from './models/column';
import { DSVImport } from '.';
import { useDSVImport } from './features/context';
import { ValidationError } from './models/validation';

describe('DSVImport', () => {
  type TestType = { forename: string; surname: string; email: string };

  const columns: ColumnType<TestType>[] = [
    { key: 'forename', label: 'Forename' },
    { key: 'surname', label: 'Surname' },
    { key: 'email', label: 'Email', rules: [{ constraint: { unique: true }, message: 'Contains duplicates' }] },
  ];

  interface Props<T> {
    onChange?: (value: T[]) => void;
    onValidation?: (errors: ValidationError<T>[]) => void;
    columns: ColumnType<T>[];
  }

  function MinimalTextareaInput() {
    const [, dispatch] = useDSVImport();

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      dispatch({ type: 'setRaw', raw: event.target.value });
    };

    return <textarea onChange={handleChange} />;
  }

  const renderComponent = (props: Props<TestType>) => {
    return render(
      // eslint-disable-next-line react/jsx-props-no-spreading
      <DSVImport<TestType> {...props}>
        <MinimalTextareaInput />
      </DSVImport>
    );
  };

  it('should invoke the onChange callback', () => {
    const onChangeMock = jest.fn();
    const { container } = renderComponent({ columns, onChange: onChangeMock });
    const textarea = container.querySelector('textarea');

    if (textarea) {
      fireEvent.change(textarea, { target: { value: 'Max' } });
    }

    expect(onChangeMock).toBeCalledWith([{ email: undefined, forename: 'Max', surname: undefined }]);
  });

  it('should invoke the onValidation callback', () => {
    const onValidationMock = jest.fn();
    const { container } = renderComponent({ columns, onValidation: onValidationMock });
    const textarea = container.querySelector('textarea');

    if (textarea) {
      fireEvent.change(textarea, {
        target: { value: 'Max,Muster,m.muster@example.com\nMoritz,Muster,m.muster@example.com' },
      });
    }

    expect(onValidationMock).toBeCalledWith([
      { column: 'email', row: 0, message: 'Contains duplicates' },
      { column: 'email', row: 1, message: 'Contains duplicates' },
    ]);
  });
});
