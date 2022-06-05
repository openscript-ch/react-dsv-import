import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { css } from '@emotion/react';
import { DSVImport, ColumnType } from '../src';

export default {
  title: 'Components/DSVImport',
  component: DSVImport,
  parameters: {
    componentSubtitle: 'Wrapping component',
  },
};

type BasicType = { forename: string; surname: string; email: string };

export function BasicUsage() {
  const columns: ColumnType<BasicType>[] = [
    { key: 'forename', label: 'Forename' },
    { key: 'surname', label: 'Surname' },
    { key: 'email', label: 'Email' },
  ];
  const onChangeAction = action('Parsed value has changed');

  return (
    <DSVImport<BasicType> columns={columns} onChange={onChangeAction}>
      <DSVImport.TextareaInput />
      <DSVImport.TablePreview />
    </DSVImport>
  );
}
BasicUsage.story = { name: 'Basic usage' };

export function UsingOnChangeCallback() {
  const columns: ColumnType<BasicType>[] = [
    { key: 'forename', label: 'Forename' },
    { key: 'surname', label: 'Surname' },
    { key: 'email', label: 'Email' },
  ];
  const onChangeAction = action('Parsed value has changed');
  const [state, setState] = useState<BasicType[]>([]);

  const handleOnChange = (value: BasicType[]) => {
    onChangeAction(value);
    setState(value);
  };

  return (
    <React.Fragment>
      <DSVImport<BasicType> columns={columns} onChange={handleOnChange}>
        <DSVImport.TextareaInput />
        <DSVImport.TablePreview />
      </DSVImport>
      <h2>Current state as JSON:</h2>
      {JSON.stringify(state)}
    </React.Fragment>
  );
}
UsingOnChangeCallback.story = { name: 'Using on change callback' };

const tablePreviewStyle = css`
  .error {
    border: 1px solid red;
  }
`;

export function UsingOnValidationCallback() {
  const columns: ColumnType<BasicType>[] = [
    { key: 'forename', label: 'Forename' },
    { key: 'surname', label: 'Surname' },
    { key: 'email', label: 'Email', rules: [{ constraint: { unique: true }, message: 'Duplicates are not allowed' }] },
  ];
  const onChangeAction = action('Parsed value has changed');
  const onValidationAction = action('Validation value has changed');

  return (
    <DSVImport<BasicType> columns={columns} onChange={onChangeAction} onValidation={onValidationAction}>
      <DSVImport.TextareaInput />
      <DSVImport.TablePreview css={tablePreviewStyle} />
    </DSVImport>
  );
}
UsingOnValidationCallback.story = { name: 'Using on validation callback' };
