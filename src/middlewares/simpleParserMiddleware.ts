import { State } from '../models/state';
import { Actions } from '../features/context';
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

const parseData = <T extends { [key: string]: string }>(
  value: string,
  columns: ColumnsType<T>,
  delimiter: Delimiter
) => {
  const lines = value.split('\n');
  return lines.map((line) => {
    const lineValues = line.split(delimiter);
    const parsedLine: T = {} as T;
    columns.forEach((column, columnIndex) => {
      parsedLine[column.key] = lineValues[columnIndex] as T[keyof T];
    });
    return parsedLine;
  });
};

export const SimpleParserMiddleware = <T extends { [key: string]: string }>(state: State<T>, action: Actions) => {
  let newState = state;

  if (action.type === 'setRaw') {
    const delimiter = detectDelimiterFromValue(action.raw);
    newState = { ...newState, parsed: parseData<T>(action.raw, state.columns, delimiter) };
  }

  return newState;
};
