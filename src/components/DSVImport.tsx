import React, { PropsWithChildren } from 'react';

enum Separator {
  COMMA = ',',
  TAB = '\t'
}

export type ColumnsType<T> = { key: keyof T; label: string }[];

interface Props<T> {
  onChange: (value: T[]) => void;
  columns: ColumnsType<T>;
}

export const DSVImport = <T extends { [key: string]: string }>(props: PropsWithChildren<Props<T>>) => {
  const [separator, setSeparator] = React.useState<Separator>(Separator.COMMA);
  const [data, setData] = React.useState<T[]>([]);

  const detectSeparatorFromValue = (value: string) => {
    let currentSeparator = separator;
    let maximumScore = 0;
    Object.values(Separator).forEach((s) => {
      const currentScore = (value.match(new RegExp(s, 'g')) || []).length;
      if (maximumScore < currentScore) {
        currentSeparator = s;
        maximumScore = currentScore;
      }
    });
    return currentSeparator;
  };

  const parseData = (value: string, separator: Separator) => {
    const lines = value.split('\n');
    const parsedData = lines.map((line) => {
      const lineValues = line.split(separator);
      const parsedLine: T = {} as T;
      props.columns.forEach((column, columnIndex) => {
        parsedLine[column.key] = lineValues[columnIndex] as T[keyof T];
      });
      return parsedLine;
    });
    setData(parsedData);
    props.onChange(parsedData);
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const currentSeparator = detectSeparatorFromValue(event.target.value);
    setSeparator(currentSeparator);
    parseData(event.target.value, currentSeparator);
  };

  return (
    <>
      <textarea onChange={handleChange}></textarea>
      <table>
        <thead>
          <tr>
            {props.columns.map((c, i) => {
              return <th key={i}>{c.label}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((line, lineIndex) => {
            return (
              <tr key={lineIndex}>
                {props.columns.map((c, i) => {
                  return <td key={i}>{line[c.key]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
