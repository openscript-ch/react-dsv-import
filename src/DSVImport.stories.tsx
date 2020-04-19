import React, { useState } from 'react';
import { DSVImport, ColumnsType } from './';
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
      <DSVImport.TextareaInput />
      <DSVImport.TablePreview />
    </DSVImport>
  );
};
BasicUsage.story = { name: 'Basic usage' };

export const UsingCallbacks = () => {
  const [state, setState] = useState<BasicType[]>([]);

  const handleOnChange = (value: BasicType[]) => {
    onChangeAction(value);
    setState(value);
  };

  return (
    <>
      <DSVImport<BasicType> columns={columns} onChange={handleOnChange}>
        <DSVImport.TextareaInput />
        <DSVImport.TablePreview />
      </DSVImport>
      <h2>Current state as JSON:</h2>
      {JSON.stringify(state)}
    </>
  );
};
UsingCallbacks.story = { name: 'Using callbacks with states' };
