import React, { PropsWithChildren, useReducer, useEffect } from 'react';
import { ColumnsType } from './models/column';
import { getDSVImportContext, useDSVImport, createReducer } from './features/context';
import { createParserMiddleware } from './middlewares/parserMiddleware';
import { State } from './models/state';
import { applyMiddlewares } from './middlewares/middleware';
import { createValidatorMiddleware } from './middlewares/validatorMiddleware';
import { ValidationError } from './models/validation';

interface EventListenerProps<T> {
  onChange?: (value: T[]) => void;
  onValidation?: (errors: ValidationError<T>[]) => void;
}

const EventListener = <T extends { [key: string]: string }>(props: EventListenerProps<T>) => {
  const [context] = useDSVImport<T>();

  useEffect(() => {
    if (context.parsed && props.onChange) {
      props.onChange(context.parsed);
    }
  }, [context.parsed]);

  useEffect(() => {
    if (context.validation && props.onValidation) {
      props.onValidation(context.validation);
    }
  }, [context.validation]);

  return null;
};

export interface Props<T> {
  onChange?: (value: T[]) => void;
  onValidation?: (errors: ValidationError<T>[]) => void;
  columns: ColumnsType<T>;
}

export const DSVImport = <T extends { [key: string]: string }>(props: PropsWithChildren<Props<T>>) => {
  const DSVImportContext = getDSVImportContext<T>();
  const initialValues: State<T> = { columns: props.columns };
  const [state, dispatch] = useReducer(createReducer<T>(), initialValues);
  const enhancedDispatch = applyMiddlewares(state, dispatch, createParserMiddleware(), createValidatorMiddleware());

  return (
    <DSVImportContext.Provider value={[state, enhancedDispatch]}>
      <EventListener<T> onChange={props.onChange} onValidation={props.onValidation} />
      {props.children}
    </DSVImportContext.Provider>
  );
};
