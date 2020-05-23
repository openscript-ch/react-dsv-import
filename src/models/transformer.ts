export type Transformer = (value: string) => string;
export type TransformerConfiguration<T> = { transformer: Transformer; column?: keyof T };
export type Transformers<T> = TransformerConfiguration<T>[];
