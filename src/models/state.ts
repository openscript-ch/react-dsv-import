import { ColumnsType } from './column';
import { ValidationError } from './validation';
import { Transformers } from './transformer';

export interface State<T> {
  raw?: string;
  parsed?: T[];
  validation?: ValidationError<T>[];
  transformers?: Transformers<T>;
  columns: ColumnsType<T>;
}

export const emptyState: State<{ [key: string]: string }> = {
  columns: []
};
