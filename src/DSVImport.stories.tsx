import React from 'react';
import { DSVImport, ColumnsType, TablePreview, TextareaInput } from './';

export default { title: 'Usage' };

type BasicType = { forename: string; surname: string; email: string };

const columns: ColumnsType<BasicType> = [
  { key: 'forename', label: 'Forename' },
  { key: 'surname', label: 'Surname' },
  { key: 'email', label: 'Email' }
];

export const BasicUsage = () => {
  return (
    <DSVImport<BasicType> columns={columns}>
      <TextareaInput />
      <TablePreview />
    </DSVImport>
  );
};
BasicUsage.story = { name: 'Basic usage' };
