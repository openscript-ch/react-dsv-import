export type ValidationError<T> = { column: keyof T; row: number; message: string };
