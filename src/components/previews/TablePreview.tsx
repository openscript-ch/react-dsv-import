import React from 'react';
import { useDSVImport } from '../../features/context';

interface Props {
  className?: string;
}

export const TablePreview: React.FC<Props> = (props) => {
  const [context] = useDSVImport();

  const getColumnValidationError = (columnKey: string) => {
    if (context.validation) {
      return context.validation.filter((e) => e.column === columnKey && !e.row);
    }
  };

  const getCellValidationError = (columnKey: string, rowIndex: number) => {
    if (context.validation) {
      return context.validation.filter((e) => e.column === columnKey && e.row === rowIndex);
    }
  };

  const ColumnHead: React.FC<{ columnKey: string }> = (props) => {
    const errors = getColumnValidationError(props.columnKey);
    const messages = errors?.map((e) => e?.message).join(';');

    return (
      <th className={messages ? 'error' : ''} title={messages}>
        {props.children}
      </th>
    );
  };

  const Cell: React.FC<{ columnKey: string; rowIndex: number }> = (props) => {
    const errors = getCellValidationError(props.columnKey, props.rowIndex);
    const messages = errors?.map((e) => e?.message).join(';');

    return (
      <td className={messages ? 'error' : ''} title={messages}>
        {props.children}
      </td>
    );
  };

  return (
    <table className={props.className}>
      <thead>
        <tr>
          {context.columns.map((column, columnIndex) => (
            <ColumnHead key={columnIndex} columnKey={column.key.toString()}>
              {column.label}
            </ColumnHead>
          ))}
        </tr>
      </thead>
      <tbody>
        {context.parsed
          ? context.parsed.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {context.columns.map((column, columnIndex) => {
                  return (
                    <Cell key={columnIndex} columnKey={column.key.toString()} rowIndex={rowIndex}>
                      {row[column.key]}
                    </Cell>
                  );
                })}
              </tr>
            ))
          : null}
      </tbody>
    </table>
  );
};
