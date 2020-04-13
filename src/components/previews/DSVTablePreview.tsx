import React from 'react';
import { useDSVImport } from '../../features/context';

export const DSVTablePreview: React.FC = () => {
  const [context] = useDSVImport();

  return (
    <table>
      <thead>
        <tr>
          {context.columns.map((column, columnIndex) => (
            <th key={columnIndex}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {context.parsed
          ? context.parsed.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {context.columns.map((column, columnIndex) => {
                  return <td key={columnIndex}>{row[column.key]}</td>;
                })}
              </tr>
            ))
          : null}
      </tbody>
    </table>
  );
};
