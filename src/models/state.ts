import { ColumnsType } from './column';

export interface State<T = { [key: string]: string }> {
  raw?: string;
  parsed?: T[];
  columns: ColumnsType<T>;
}

export const emptyState: State = {
  columns: []
};
