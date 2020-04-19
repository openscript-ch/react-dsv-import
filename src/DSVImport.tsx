import React, { PropsWithChildren, useReducer, useEffect } from 'react';
import { ColumnsType } from './models/column';
import { getDSVImportContext, useDSVImport } from './features/context';
import { createSimpleParserMiddleware } from './middlewares/simpleParserMiddleware';
import { State } from './models/state';

interface EventListenerProps<T> {
  onChange?: (value: T[]) => void;
}

const EventListener = <T extends { [key: string]: string }>(props: EventListenerProps<T>) => {
  const [context] = useDSVImport<T>();

  useEffect(() => {
    if (context.parsed && props.onChange) {
      props.onChange(context.parsed);
    }
  });

  return null;
};

export interface Props<T> {
  onChange?: (value: T[]) => void;
  columns: ColumnsType<T>;
}

export const DSVImport = <T extends { [key: string]: string }>(props: PropsWithChildren<Props<T>>) => {
  const DSVImportContext = getDSVImportContext<T>();
  const middleware = createSimpleParserMiddleware<T>();
  const initialValues: State<T> = { columns: props.columns };

  return (
    <DSVImportContext.Provider value={useReducer(middleware, initialValues)}>
      <EventListener<T> onChange={props.onChange} />
      {props.children}
    </DSVImportContext.Provider>
  );
};
