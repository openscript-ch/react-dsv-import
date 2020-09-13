import React, { PropsWithChildren, useReducer, useEffect } from 'react';
import { ColumnType, GenericColumnType } from './models/column';
import { getDSVImportContext, useDSVImport, createReducer } from './features/context';
import { createParserMiddleware } from './middlewares/parserMiddleware';
import { State } from './models/state';
import { applyMiddlewares } from './middlewares/middleware';
import { createValidatorMiddleware } from './middlewares/validatorMiddleware';
import { ValidationError } from './models/validation';
import { createTransformerMiddleware } from './middlewares/transformerMiddleware';
import { Transformer } from './models/transformer';
import { TextareaInput } from './components/inputs/TextareaInput';
import { TablePreview } from './components/previews/TablePreview';

interface EventListenerProps<T> {
  onChange?: (value: T[]) => void;
  onValidation?: (errors: ValidationError<T>[]) => void;
}

const EventListener = <T extends GenericColumnType>(props: EventListenerProps<T>) => {
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

export type Props<T> = {
  /**
   * Description of the expected columns
   */
  columns: ColumnType<T>[];
  /**
   * Callback which is called after parsing the input
   */
  onChange?: (value: T[]) => void;
  /**
   * Callback which is called if there are validation errors
   */
  onValidation?: (errors: ValidationError<T>[]) => void;
  /**
   * Globally applied transformers
   */
  transformers?: Transformer[];
};

/**
 * This is the main component, which creates a context for it's children. All children can access the information of the `DSVImport`.
 */
export function DSVImport<T extends GenericColumnType>(props: PropsWithChildren<Props<T>>) {
  const DSVImportContext = getDSVImportContext<T>();
  const initialValues: State<T> = { columns: props.columns, transformers: props.transformers };
  const [state, dispatch] = useReducer(createReducer<T>(), initialValues);
  const enhancedDispatch = applyMiddlewares(
    state,
    dispatch,
    createParserMiddleware(),
    createTransformerMiddleware(),
    createValidatorMiddleware()
  );

  return (
    <DSVImportContext.Provider value={[state, enhancedDispatch]}>
      <EventListener<T> onChange={props.onChange} onValidation={props.onValidation} />
      {props.children}
    </DSVImportContext.Provider>
  );
}

DSVImport.TextareaInput = TextareaInput;
DSVImport.TablePreview = TablePreview;
