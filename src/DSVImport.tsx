import React, { PropsWithChildren, useReducer } from 'react';
import { ColumnsType } from './models/column';
import { DSVImportContext } from './features/context';
import { SimpleParserMiddleware } from './middlewares/simpleParserMiddleware';
import { State } from './models/state';

interface Props<T> {
  onChange?: (value: T[]) => void;
  columns: ColumnsType<T>;
}

export const DSVImport = <T extends { [key: string]: string }>(props: PropsWithChildren<Props<T>>) => {
  const initialValues: State = { columns: props.columns as ColumnsType<{ [key: string]: string }> };

  return (
    <DSVImportContext.Provider value={useReducer(SimpleParserMiddleware, initialValues)}>
      {props.children}
    </DSVImportContext.Provider>
  );
};
