'use client';

import { Skeleton } from '@/components/skeleton';
import { useSearchParams } from 'next/navigation';

function LoadingSearch() {
  const params = useSearchParams();

  const query = params.get('q');

  return (
    <div className='flex flex-col gap-4'>
      <p className='text-sm'>
        Resultado para: <span className='font-semibold'> {query ?? ''} </span>
      </p>

      <div className='grid grid-cols-3 gap-3'>
        <Skeleton className='h-[400px]' />
        <Skeleton className='h-[400px]' />
        <Skeleton className='h-[400px]' />
        <Skeleton className='h-[400px]' />
        <Skeleton className='h-[400px]' />
        <Skeleton className='h-[400px]' />
      </div>
    </div>
  );
}

export default LoadingSearch;
