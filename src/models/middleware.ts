import { Dispatch } from 'react';
import { State } from './state';

export type Middleware<T, A> = (state: State<T>, dispatch: Dispatch<A>, action: A) => void;
