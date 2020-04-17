import { TextareaInput } from './components/inputs/TextareaInput';
import { TablePreview } from './components/previews/TablePreview';
import { DSVImport as Import } from './DSVImport';

import { ColumnsType } from './models/column';
import { PropsWithChildren } from 'react';

interface Props<T> {
  onChange?: (value: T[]) => void;
  columns: ColumnsType<T>;
}

export function DSVImport<T extends { [key: string]: string }>(props: PropsWithChildren<Props<T>>) {
  return Import<T>(props);
}

DSVImport.TextareaInput = TextareaInput;
DSVImport.TablePreview = TablePreview;

export { ColumnsType } from './models/column';
