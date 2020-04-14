import { ColumnsType } from './column';

export interface State<T> {
  raw?: string;
  parsed?: T[];
  columns: ColumnsType<T>;
}

export const emptyState: State<{ [key: string]: string }> = {
  columns: []
};
