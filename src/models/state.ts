import { ColumnType, GenericColumnType } from './column';
import { ValidationError } from './validation';
import { Transformer } from './transformer';

export interface State<T> {
  raw?: string;
  parsed?: T[];
  validation?: ValidationError<T>[];
  transformers?: Transformer[];
  columns: ColumnType<T>[];
}

export const emptyState: State<GenericColumnType> = {
  columns: []
};
