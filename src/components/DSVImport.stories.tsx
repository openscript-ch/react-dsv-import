import React from 'react';
import { DSVImport } from './DSVImport';
import { actions } from '@storybook/addon-actions';
import { ColumnsType } from '../models/column';

export default { title: 'Components/DSVImport' };

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
