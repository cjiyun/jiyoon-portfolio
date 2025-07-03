import type { ReactElement } from 'react';

const StackSkeleton = (): ReactElement => (
  <div className="flex w-full flex-col items-center gap-6 px-8">
    <div className="aspect-card animate-skeleton h-[300px] rounded-lg" />
    <div className="flex w-[320px] flex-col justify-center gap-4">
      <div className="flex h-5 w-full justify-between">
        <div className="animate-skeleton flex h-full w-1/2 rounded-lg" />
        <div className="animate-skeleton flex h-full w-1/5 rounded-lg" />
      </div>
      <div className="animate-skeleton h-18 w-full rounded-lg" />
    </div>
  </div>
);

export default StackSkeleton;
