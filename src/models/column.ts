import { Rule } from './rule';

export type ColumnsType<T> = { key: keyof T; label: string; rules?: Rule[] }[];
