import React, { useState } from 'react';
import { DSVImport, ColumnsType } from './';
import { action } from '@storybook/addon-actions';

export default { title: 'Usage' };

type BasicType = { forename: string; surname: string; email: string };

export const BasicUsage = () => {
  const columns: ColumnsType<BasicType> = [
    { key: 'forename', label: 'Forename' },
    { key: 'surname', label: 'Surname' },
    { key: 'email', label: 'Email' }
  ];
  const onChangeAction = action('Parsed value has changed');

  return (
    <DSVImport<BasicType> columns={columns} onChange={onChangeAction}>
      <DSVImport.TextareaInput />
      <DSVImport.TablePreview />
    </DSVImport>
  );
};
BasicUsage.story = { name: 'Basic usage' };

export const UsingOnChangeCallback = () => {
  const columns: ColumnsType<BasicType> = [
    { key: 'forename', label: 'Forename' },
    { key: 'surname', label: 'Surname' },
    { key: 'email', label: 'Email' }
  ];
  const onChangeAction = action('Parsed value has changed');
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
UsingOnChangeCallback.story = { name: 'Using on change callback' };

export const UsingOnValidationCallback = () => {
  const columns: ColumnsType<BasicType> = [
    { key: 'forename', label: 'Forename' },
    { key: 'surname', label: 'Surname' },
    { key: 'email', label: 'Email', rules: [{ constraint: { unique: true }, message: 'Duplicates are not allowed' }] }
  ];
  const onChangeAction = action('Parsed value has changed');
  const onValidationAction = action('Validation value has changed');

  return (
    <DSVImport<BasicType> columns={columns} onChange={onChangeAction} onValidation={onValidationAction}>
      <DSVImport.TextareaInput />
      <DSVImport.TablePreview />
    </DSVImport>
  );
};
UsingOnValidationCallback.story = { name: 'Using on validation callback' };
