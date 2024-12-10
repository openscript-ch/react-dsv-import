import { PropsWithChildren } from 'react';
import { useDSVImport } from '../../features/context';

function Cell({ columnKey, rowIndex, children }: PropsWithChildren<{ columnKey: string; rowIndex: number }>) {
  const [context] = useDSVImport();

  const errors = context.validation?.filter((e) => e.column === columnKey && e.row === rowIndex);
  const messages = errors?.map((e) => e.message).join(';');

  return (
    <td className={messages ? 'error' : ''} title={messages}>
      {children}
    </td>
  );
}

export interface TablePreviewProps {
  className?: string;
}

export function TablePreview({ className }: TablePreviewProps) {
  const [context] = useDSVImport();

  return (
    <table className={className}>
      <thead>
        <tr>
          {context.columns.map((column) => (
            <th key={column.key}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {context.parsed
          ? context.parsed.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {context.columns.map((column) => {
                  return (
                    <Cell key={column.key} columnKey={column.key.toString()} rowIndex={rowIndex}>
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
}
