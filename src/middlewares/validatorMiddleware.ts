import { Dispatch } from 'react';
import { State } from '../models/state';
import { Actions } from '../models/actions';
import { Rule, UniqueConstraint, CallbackConstraint } from '../models/rule';
import { ValidationError } from '../models/validation';

const onlyUniqueValues = (values: string[]) => {
  return new Set(values).size === values.length;
};

const getDuplicates = (values: string[]) => {
  return Array.from(new Set(values.filter((item, index) => values.indexOf(item) !== index)));
};

const validateColumn = <T>(key: keyof T, data: T[keyof T][], rules?: Rule[]): ValidationError<T>[] => {
  const errors: ValidationError<T>[] = [];

  if (rules) {
    const values = data.map((d) => `${d}`);
    rules.forEach((r) => {
      if ((r.constraint as UniqueConstraint).unique && !onlyUniqueValues(values)) {
        const duplicates = getDuplicates(values);
        values.forEach((v, i) => {
          if (duplicates.indexOf(v) !== -1) {
            errors.push({ column: key, row: i, message: r.message });
          }
        });
      } else if (typeof (r.constraint as CallbackConstraint).callback === 'function') {
        const { callback } = r.constraint as CallbackConstraint;
        values.forEach((v, i) => {
          if (callback(v)) {
            errors.push({ column: key, row: i, message: r.message });
          }
        });
      }
    });
  }

  return errors;
};

export const createValidatorMiddleware = <T>() => {
  return (state: State<T>, next: Dispatch<Actions<T>>, action: Actions<T>) => {
    if (action.type === 'setParsed') {
      const errors = state.columns.reduce<ValidationError<T>[]>(
        (acc, c) =>
          acc.concat(
            validateColumn(
              c.key,
              action.parsed.map((r) => r[c.key]),
              c.rules,
            ),
          ),
        [],
      );
      next({ type: 'setValidation', errors });
    }
  };
};
