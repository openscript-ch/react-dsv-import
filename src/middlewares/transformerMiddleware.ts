import { State } from '../models/state';
import { Dispatch } from 'react';
import { Actions } from '../models/actions';
import { ColumnsType } from '../models/column';
import { Transformer } from '../models/transformer';

const executeGlobalTransformers = <T>(values: T[], transformer: Transformer, columns: ColumnsType<T>) => {
  return values.map<T>((r) => {
    const transformed = { ...r };
    columns.forEach((c) => {
      transformed[c.key] = (transformer(new String(r[c.key]).toString()) as unknown) as T[keyof T];
    });
    return transformed;
  });
};

const executeColumnTransformers = <T>(values: T[], columns: ColumnsType<T>) => {
  return values.map<T>((r) => {
    const transformed = { ...r };
    columns.forEach((c) => {
      if (c.transformers) {
        transformed[c.key] = (c.transformers.reduce(
          (acc, t) => t(acc),
          new String(r[c.key]).toString()
        ) as unknown) as T[keyof T];
      }
    });
    return transformed;
  });
};

export const createTransformerMiddleware = <T>() => {
  return (state: State<T>, next: Dispatch<Actions<T>>, action: Actions<T>) => {
    if (action.type === 'setParsed') {
      let parsed = action.parsed;
      if (state.transformers) {
        parsed = state.transformers.reduce<T[]>((acc, t) => executeGlobalTransformers(acc, t, state.columns), parsed);
      }

      const hasColumnTransformers = state.columns.find((c) => c.transformers) ? true : false;
      if (hasColumnTransformers) {
        parsed = executeColumnTransformers(parsed, state.columns);
      }

      if (state.transformers || hasColumnTransformers) {
        next({ type: 'setParsed', parsed });
      }
    }
  };
};
