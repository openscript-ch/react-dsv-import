import { Rule } from './rule';
import { Transformer } from './transformer';

export type ColumnType<T> = { key: keyof T; label: string; rules?: Rule[]; transformers?: Transformer[] };
