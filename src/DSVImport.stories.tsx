import React from 'react';
import { DSVImport, ColumnsType, TablePreview, TextareaInput } from './';
import { action } from '@storybook/addon-actions';

export default { title: 'Usage' };

type BasicType = { forename: string; surname: string; email: string };

const columns: ColumnsType<BasicType> = [
  { key: 'forename', label: 'Forename' },
  { key: 'surname', label: 'Surname' },
  { key: 'email', label: 'Email' }
];

const onChangeAction = action('Parsed value has changed');

export const BasicUsage = () => {
  return (
    <DSVImport<BasicType> columns={columns} onChange={onChangeAction}>
      <TextareaInput />
      <TablePreview />
    </DSVImport>
  );
};
BasicUsage.story = { name: 'Basic usage' };
