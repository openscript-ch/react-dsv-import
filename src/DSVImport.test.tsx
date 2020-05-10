import { ColumnsType } from './models/column';
import { DSVImport } from '.';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useDSVImport } from './features/context';
import { ValidationError } from './models/validation';

describe('DSVImport', () => {
  type TestType = { forename: string; surname: string; email: string };

  const columns: ColumnsType<TestType> = [
    { key: 'forename', label: 'Forename' },
    { key: 'surname', label: 'Surname' },
    { key: 'email', label: 'Email', rules: [{ constraint: { unique: true }, message: 'Contains duplicates' }] }
  ];

  interface Props<T> {
    onChange?: (value: T[]) => void;
    onValidation?: (errors: ValidationError<T>[]) => void;
    columns: ColumnsType<T>;
  }

  const MinimalTextareaInput: React.FC = () => {
    const [, dispatch] = useDSVImport();

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      dispatch({ type: 'setRaw', raw: event.target.value });
    };

    return <textarea onChange={handleChange}></textarea>;
  };

  const renderComponent = (props: Props<TestType>) => {
    return render(
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
        target: { value: 'Max,Muster,m.muster@example.com\nMoritz,Muster,m.muster@example.com' }
      });
    }

    expect(onValidationMock).toBeCalledWith([{ column: 'email', message: 'Contains duplicates' }]);
  });
});
