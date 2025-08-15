import React from 'react';
import { cn } from './cn';
export function Dialog({ open, children }: { open?: boolean; children: React.ReactNode }){
  if (!open) return null;
  return <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">{children}</div>;
}
export function DialogContent({ className, children }: React.HTMLAttributes<HTMLDivElement>){
  return <div className={cn('w-full max-w-lg rounded-2xl bg-white p-4', className)}>{children}</div>;
}
export function DialogHeader({ children }: { children?: React.ReactNode }){ return <div className="mb-2">{children}</div>; }
export function DialogTitle({ children }: { children?: React.ReactNode }){ return <h2 className="text-lg font-semibold">{children}</h2>; }
export function DialogFooter({ children }: { children?: React.ReactNode }){ return <div className="mt-4 flex justify-end gap-2">{children}</div>; }
export default Dialog;
