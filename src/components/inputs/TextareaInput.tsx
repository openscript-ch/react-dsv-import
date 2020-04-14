import React from 'react';
import { useDSVImport } from '../../features/context';

export const TextareaInput: React.FC = () => {
  const [, dispatch] = useDSVImport();

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'setRaw', raw: event.target.value });
  };

  return <textarea onChange={handleChange}></textarea>;
};
