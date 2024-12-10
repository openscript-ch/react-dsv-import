import { render } from '@testing-library/react';
import { ColumnType } from '../../models/column';
import { TablePreview } from './TablePreview';
import { State } from '../../models/state';
import { getDSVImportContext } from '../../features/context';
import '@testing-library/jest-dom';

describe('TablePreview', () => {
  type TestType = { forename: string; surname: string; email: string };
  const columns: ColumnType<TestType>[] = [
    { key: 'forename', label: 'Forename' },
    { key: 'surname', label: 'Surname' },
    { key: 'email', label: 'Email' },
  ];
  const defaultState: State<TestType> = { columns };
  const Context = getDSVImportContext<TestType>();

  const dispatchMock = vi.fn(() => defaultState);

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
        { forename: 'Max', surname: 'Muster', email: 'example@example.com' },
        { forename: '', surname: '', email: 'example@example.com' },
      ],
    });
    const tableBody = container.querySelector('tbody');

    expect(tableBody?.childElementCount).toBe(2);

    expect(tableBody?.children[0].children[0]).toHaveTextContent('Max');
    expect(tableBody?.children[1].children[2]).toHaveTextContent('example@example.com');
  });

  it('should render the parsed content in the table body', () => {
    const { container } = renderComponent({
      ...defaultState,
      parsed: [
        { forename: 'Max', surname: 'Muster', email: 'example@example.com' },
        { forename: '', surname: '', email: 'example@example.com' },
      ],
      validation: [
        { column: 'email', row: 0, message: 'Contains duplicates' },
        { column: 'email', row: 1, message: 'Contains duplicates' },
        { column: 'email', row: 1, message: 'No example address, please' },
        { column: 'forename', row: 1, message: 'Forename is required' },
      ],
    });
    const tableBody = container.querySelector('tbody');

    expect(tableBody?.children[1].children[0]).toHaveClass('error');
    expect(tableBody?.children[1].children[0]).toHaveAttribute('title', 'Forename is required');
    expect(tableBody?.children[1].children[2]).toHaveAttribute(
      'title',
      'Contains duplicates;No example address, please'
    );
  });
});
