import { Rule } from './rule';
import { Transformer } from './transformer';

export type GenericColumnType = { [key: string]: string };
export type ColumnType<T> = { key: keyof T; label: string; rules?: Rule[]; transformers?: Transformer[] };
