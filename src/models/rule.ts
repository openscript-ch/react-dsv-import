export type Rule = {
  message: string;
  constraint: { unique: boolean } | { callback: (value: string) => boolean };
};
