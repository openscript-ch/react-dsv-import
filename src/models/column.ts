import { Rule } from './rule';
import { Transformer } from './transformer';

export type ColumnsType<T> = { key: keyof T; label: string; rules?: Rule[]; transformers?: Transformer[] }[];
