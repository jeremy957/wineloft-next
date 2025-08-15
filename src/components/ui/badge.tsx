import React from 'react';
import { cn } from './cn';
export function Badge({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700', className)} {...props} />;
}
export default Badge;
