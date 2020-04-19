import { ColumnsType } from './models/column';
import { DSVImport } from '.';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

describe('DSVImport', () => {
  type TestType = { forename: string; surname: string; email: string };

  const columns: ColumnsType<TestType> = [
    { key: 'forename', label: 'Forename' },
    { key: 'surname', label: 'Surname' },
    { key: 'email', label: 'Email' }
  ];

  const onChangeMock = jest.fn();

  const renderComponent = () => {
    return render(
      <DSVImport<TestType> columns={columns} onChange={onChangeMock}>
        <DSVImport.TextareaInput />
        <DSVImport.TablePreview />
      </DSVImport>
    );
  };

  it('should invoke the onChange callback on context change', () => {
    const { container } = renderComponent();
    const textarea = container.querySelector('textarea');

    if (textarea) {
      fireEvent.change(textarea, { target: { value: 'Max' } });
    }

    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith([{ email: undefined, forename: 'Max', surname: undefined }]);
  });
});
