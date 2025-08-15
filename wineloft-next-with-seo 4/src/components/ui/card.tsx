import React from 'react';
import { cn } from './cn';
export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('rounded-2xl border bg-white', className)} {...props} />;
}
export function CardHeader(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-4', props.className)} {...props} />;
}
export function CardTitle(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('text-xl font-semibold', props.className)} {...props} />;
}
export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-4', props.className)} {...props} />;
}
export default Card;
