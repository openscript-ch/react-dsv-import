import { render } from '@testing-library/react';
import React from 'react';
import { ColumnsType } from '../../models/column';
import { TablePreview } from './TablePreview';
import { State } from '../../models/state';
import { getDSVImportContext } from '../../features/context';

describe('TablePreview', () => {
  type TestType = { forename: string; surname: string; email: string };
  const columns: ColumnsType<TestType> = [
    { key: 'forename', label: 'Forename' },
    { key: 'surname', label: 'Surname' },
    { key: 'email', label: 'Email' }
  ];
  const defaultState: State<TestType> = { columns };
  const Context = getDSVImportContext<TestType>();

  const dispatchMock = jest.fn(() => defaultState);

  const renderComponent = (state = defaultState) => {
    return render(
      <Context.Provider value={[state, dispatchMock]}>
        <TablePreview />
      </Context.Provider>
    );
  };

  it('should render the column labels in the table head', () => {
    const { container } = renderComponent();
    const tableHeadRow = container.querySelector('thead tr');

    expect(tableHeadRow?.childElementCount).toBe(3);

    expect(tableHeadRow?.children[0]).toHaveTextContent('Forename');
    expect(tableHeadRow?.children[1]).toHaveTextContent('Surname');
    expect(tableHeadRow?.children[2]).toHaveTextContent('Email');
  });

  it('should render the parsed content in the table body', () => {
    const { container } = renderComponent({
      ...defaultState,
      parsed: [
        { forename: 'Max', surname: 'Muster', email: 'max@example.com' },
        { forename: '', surname: '', email: 'unknown@example.com' }
      ]
    });
    const tableBody = container.querySelector('tbody');

    expect(tableBody?.childElementCount).toBe(2);

    expect(tableBody?.children[0].children[0]).toHaveTextContent('Max');
    expect(tableBody?.children[1].children[2]).toHaveTextContent('unknown@example.com');
  });
});
