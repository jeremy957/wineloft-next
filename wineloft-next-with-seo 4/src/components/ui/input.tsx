import React from 'react';
import { cn } from './cn';
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(function Input(props, ref){
  return <input ref={ref} {...props} className={cn('h-10 w-full rounded-xl border px-3 text-sm', props.className)} />;
});
export default Input;
