import { State } from '../models/state';
import { Actions, reducer } from '../features/context';
import { Delimiter } from '../models/delimiter';
import { ColumnsType } from '../models/column';

const detectDelimiterFromValue = (value: string, defaultDelimiter = Delimiter.COMMA) => {
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

const parseData = <T>(value: string, columns: ColumnsType<T>, delimiter: Delimiter) => {
  const lines = value.split('\n');
  return lines.map((line) => {
    const lineValues = line.split(delimiter);
    const parsedLine = {} as T;
    columns.forEach((column, columnIndex) => {
      parsedLine[column.key] = (lineValues[columnIndex] as unknown) as T[keyof T];
    });
    return parsedLine;
  });
};

export const createParserMiddleware = <T>() => {
  return (state: State<T>, action: Actions<T>) => {
    let newState = reducer<T>(state, action);

    if (action.type === 'setRaw') {
      const delimiter = detectDelimiterFromValue(action.raw);

      let parsed: T[] = [];
      if (action.raw !== '') {
        parsed = parseData<T>(action.raw, state.columns, delimiter);
      }

      newState = reducer<T>(state, { type: 'setParsed', parsed });
    }

    return newState;
  };
};
