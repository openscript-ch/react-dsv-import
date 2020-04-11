import React from 'react';
import { DSVImport, ColumnsType } from './DSVImport';
import { actions } from '@storybook/addon-actions';

export default { title: 'DSVImport' };

const defaultActions = actions('onChange');

type MinimalType = { forename: string; surname: string; email: string };
const minimalColumns: ColumnsType<MinimalType> = [
  { key: 'forename', label: 'Forename' },
  { key: 'surname', label: 'Surname' },
  { key: 'email', label: 'Email' }
];
export const Minimal = () => {
  return <DSVImport<MinimalType> columns={minimalColumns} {...defaultActions} />;
};
