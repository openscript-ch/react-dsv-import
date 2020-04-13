import React from 'react';
import { DSVImport, ColumnsType, DSVTablePreview, DSVTextareaInput } from './';

export default { title: 'Usage/DSVImport' };

type BasicType = { forename: string; surname: string; email: string };

const columns: ColumnsType<BasicType> = [
  { key: 'forename', label: 'Forename' },
  { key: 'surname', label: 'Surname' },
  { key: 'email', label: 'Email' }
];

export const BasicUsage = () => {
  return (
    <DSVImport<BasicType> columns={columns}>
      <DSVTextareaInput />
      <DSVTablePreview />
    </DSVImport>
  );
};
