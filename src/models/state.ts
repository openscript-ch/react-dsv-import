import { ColumnsType } from './column';
import { ValidationError } from './validation';

export interface State<T> {
  raw?: string;
  parsed?: T[];
  validation?: ValidationError<T>[];
  columns: ColumnsType<T>;
}

export const emptyState: State<{ [key: string]: string }> = {
  columns: []
};
