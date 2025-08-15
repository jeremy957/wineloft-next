import React from 'react';
import { cn } from './cn';

type Props = React.HTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'sm' | 'lg' | 'default';
};

export function Button({ asChild, className, children, variant='default', size='default', ...props }: Props) {
  const base = 'inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 ring-offset-2';
  const variants = {
    default: 'bg-primary text-white hover:opacity-90',
    outline: 'border border-gray-300 hover:bg-gray-50',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200'
  } as const;
  const sizes = { sm: 'h-9', lg: 'h-11 text-base px-6', default: 'h-10' } as const;

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as any, {
      className: cn(base, variants[variant], sizes[size], (children as any).props.className, className)
    });
  }
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props}>{children}</button>;
}
export default Button;
