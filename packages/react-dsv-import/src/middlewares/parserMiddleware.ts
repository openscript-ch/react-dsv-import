import { Dispatch } from 'react';
import { State } from '../models/state';
import { Delimiter } from '../models/delimiter';
import { ColumnType } from '../models/column';
import { Actions } from '../models/actions';

const detectDelimiterFromValue = (value: string, defaultDelimiter: Delimiter) => {
  let currentDelimiter = defaultDelimiter;
  let maximumScore = 0;
  Object.values(Delimiter).forEach((s) => {
    const currentScore = (value.match(new RegExp(s, 'g')) || []).length;
    if (maximumScore < currentScore) {
      currentDelimiter = s;
      maximumScore = currentScore;
    }
  });
  return currentDelimiter;
};

const parseData = <T>(value: string, columns: ColumnType<T>[], delimiter: Delimiter) => {
  const lines = value.split('\n');
  return lines.map((line) => {
    const lineValues = line.split(delimiter);
    const parsedLine = {} as T;
    columns.forEach((column, columnIndex) => {
      parsedLine[column.key] = lineValues[columnIndex] as unknown as T[keyof T];
    });
    return parsedLine;
  });
};

export const createParserMiddleware = <T>() => {
  return (state: State<T>, next: Dispatch<Actions<T>>, action: Actions<T>) => {
    if (action.type === 'setRaw') {
      const delimiter = detectDelimiterFromValue(action.raw, Delimiter.COMMA);

      let parsed: T[] = [];
      if (action.raw !== '') {
        parsed = parseData<T>(action.raw, state.columns, delimiter);
      }

      next({ type: 'setParsed', parsed });
    }
  };
};
