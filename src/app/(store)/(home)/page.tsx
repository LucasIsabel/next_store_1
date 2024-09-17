import Link from 'next/link';

async function Home() {
  return (
    <main className='grid max-h-[800px] grid-cols-9 grid-rows-6 gap-6'>
      <Link
        href='/'
        className='col-span-6 row-span-6 overflow-hidden rounded-lg bg-zinc-900'
      ></Link>
    </main>
  );
}

export default Home;
