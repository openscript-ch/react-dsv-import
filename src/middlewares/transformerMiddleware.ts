import { Dispatch } from 'react';
import { State } from '../models/state';
import { Actions } from '../models/actions';
import { ColumnType } from '../models/column';
import { Transformer } from '../models/transformer';

const executeGlobalTransformers = <T>(values: T[], transformer: Transformer, columns: ColumnType<T>[]) => {
  return values.map<T>((r) => {
    const transformed = { ...r };
    columns.forEach((c) => {
      transformed[c.key] = transformer(`${r[c.key]}`) as unknown as T[keyof T];
    });
    return transformed;
  });
};

const executeColumnTransformers = <T>(values: T[], columns: ColumnType<T>[]) => {
  return values.map<T>((r) => {
    const transformed = { ...r };
    columns.forEach((c) => {
      if (c.transformers) {
        transformed[c.key] = c.transformers.reduce((acc, t) => t(acc), `${r[c.key]}`) as unknown as T[keyof T];
      }
    });
    return transformed;
  });
};

export const createTransformerMiddleware = <T>() => {
  return (state: State<T>, next: Dispatch<Actions<T>>, action: Actions<T>) => {
    if (action.type === 'setParsed') {
      let { parsed } = action;
      if (state.transformers) {
        parsed = state.transformers.reduce<T[]>((acc, t) => executeGlobalTransformers(acc, t, state.columns), parsed);
      }

      const hasColumnTransformers = state.columns.some((c) => c.transformers);
      if (hasColumnTransformers) {
        parsed = executeColumnTransformers(parsed, state.columns);
      }

      if (state.transformers || hasColumnTransformers) {
        next({ type: 'setParsed', parsed });
      }
    }
  };
};
