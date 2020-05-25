import { PropsWithChildren } from 'react';
import { DSVImport as Import, Props } from './DSVImport';
import { GenericColumnType } from './models/column';
import { TextareaInput } from './components/inputs/TextareaInput';
import { TablePreview } from './components/previews/TablePreview';

export function DSVImport<T extends GenericColumnType>(props: PropsWithChildren<Props<T>>) {
  return Import<T>(props);
}

DSVImport.TextareaInput = TextareaInput;
DSVImport.TablePreview = TablePreview;

export { ColumnType, GenericColumnType } from './models/column';
export { useDSVImport } from './features/context';
export { Rule } from './models/rule';
export { Transformer } from './models/transformer';
