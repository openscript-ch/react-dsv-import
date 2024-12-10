export type UniqueConstraint = { unique: boolean };
export type CallbackConstraint = { callback: (value: string) => boolean };

export type ConstraintType = UniqueConstraint | CallbackConstraint;

export type Rule = {
  message: string;
  constraint: ConstraintType;
};
