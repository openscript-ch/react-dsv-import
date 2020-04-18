import React, { PropsWithChildren, useReducer } from 'react';
import { ColumnsType } from './models/column';
import { getDSVImportContext } from './features/context';
import { createSimpleParserMiddleware } from './middlewares/simpleParserMiddleware';
import { State } from './models/state';

export interface Props<T> {
  onChange?: (value: T[]) => void;
  columns: ColumnsType<T>;
}

export const DSVImport = <T extends { [key: string]: string }>(props: PropsWithChildren<Props<T>>) => {
  const DSVImportContext = getDSVImportContext<T>();
  const middleware = createSimpleParserMiddleware<T>(props.onChange);
  const initialValues: State<T> = { columns: props.columns };

  return (
    <DSVImportContext.Provider value={useReducer(middleware, initialValues)}>
      {props.children}
    </DSVImportContext.Provider>
  );
};
