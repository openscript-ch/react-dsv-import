import { TextareaInput } from './components/inputs/TextareaInput';
import { TablePreview } from './components/previews/TablePreview';
import { DSVImport as Import, Props } from './DSVImport';
import { PropsWithChildren } from 'react';

export function DSVImport<T extends { [key: string]: string }>(props: PropsWithChildren<Props<T>>) {
  return Import<T>(props);
}

DSVImport.TextareaInput = TextareaInput;
DSVImport.TablePreview = TablePreview;

export { ColumnsType } from './models/column';
export { useDSVImport } from './features/context';
