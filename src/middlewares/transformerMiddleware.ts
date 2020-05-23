import { State } from '../models/state';
import { Dispatch } from 'react';
import { Actions } from '../models/actions';
import { TransformerConfiguration } from '../models/transformer';
import { ColumnsType } from '../models/column';

const executeTransformer = <T>(
  values: T[],
  transformerConfiguration: TransformerConfiguration<T>,
  columns: ColumnsType<T>
) => {
  const currentColumns = transformerConfiguration.column
    ? columns.filter((c) => c.key === transformerConfiguration.column)
    : columns;
  return values.map<T>((r) => {
    const transformed = { ...r };
    currentColumns.forEach((c) => {
      transformed[c.key] = (transformerConfiguration.transformer(
        new String(r[c.key]).toString()
      ) as unknown) as T[keyof T];
    });
    return transformed;
  });
};

export const createTransformerMiddleware = <T>() => {
  return (state: State<T>, next: Dispatch<Actions<T>>, action: Actions<T>) => {
    if (action.type === 'setParsed' && state.transformers) {
      const parsed = state.transformers.reduce<T[]>(
        (acc, t) => executeTransformer(acc, t, state.columns),
        action.parsed
      );
      next({ type: 'setParsed', parsed });
    }
  };
};
