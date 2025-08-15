import React from 'react';
import { cn } from './cn';
export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(function T(props, ref){
  return <textarea ref={ref} {...props} className={cn('w-full rounded-xl border p-3 text-sm', props.className)} />;
});
export default Textarea;
