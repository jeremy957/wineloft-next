import React from 'react';
export function Separator({ className }: { className?: string }){
  return <hr className={className || 'my-4 border-gray-200'} />;
}
export default Separator;
