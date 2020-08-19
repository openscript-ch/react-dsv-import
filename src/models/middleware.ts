import { State } from './state';
import { Dispatch } from 'react';

export type Middleware<T, A> = (state: State<T>, dispatch: Dispatch<A>, action: A) => void;
