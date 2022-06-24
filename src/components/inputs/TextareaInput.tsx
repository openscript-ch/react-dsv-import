import React from 'react';
import { useDSVImport } from '../../features/context';

export function TextareaInput() {
  const [, dispatch] = useDSVImport();

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'setRaw', raw: event.target.value });
  };

  return <textarea onChange={handleChange} />;
}
