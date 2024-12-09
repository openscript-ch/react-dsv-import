import { ValidationError } from './validation';

export type Actions<T> =
  | { type: 'setRaw'; raw: string }
  | { type: 'setParsed'; parsed: T[] }
  | { type: 'setValidation'; errors: ValidationError<T>[] };
