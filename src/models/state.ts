import { ColumnsType } from './column';
import { ValidationError } from './validation';
import { Transformer } from './transformer';

export interface State<T> {
  raw?: string;
  parsed?: T[];
  validation?: ValidationError<T>[];
  transformers?: Transformer[];
  columns: ColumnsType<T>;
}

export const emptyState: State<{ [key: string]: string }> = {
  columns: []
};
