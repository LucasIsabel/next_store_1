import Link from 'next/link';
import Image from 'next/image';
import CardWidget from './cart-widget';
import SearchForm from '@/app/(store)/search/search-form';
import { Suspense } from 'react';

function Header() {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-5'>
        <Link href='/' className='text-2xl font-extrabold text-white'>
          devstore
        </Link>

        <Suspense fallback={null}>
          <SearchForm />
        </Suspense>
      </div>
      <div className='flex items-center gap-4'>
        <CardWidget />

        <div className='h-4 w-px bg-zinc-700' />

        <Link href='/' className='flex items-center gap-2 hover:underline'>
          <span className='text-sm text-white'> Account </span>
          <Image
            alt=''
            src='https://github.com/lucasisabel.png'
            className='h-6 w-6 rounded-full'
            width={24}
            height={24}
          />
        </Link>
      </div>
    </div>
  );
}

export default Header;
