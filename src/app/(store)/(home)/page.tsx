import { FeaturedProducts } from '@/@types/Products.type';
import { api } from '@/data/api';
import { priceFormatter } from '@/helpers';
import Image from 'next/image';
import Link from 'next/link';

async function getFeaturedProducts(): Promise<FeaturedProducts[]> {
  const response = await api('/featured', {
    cache: 'no-cache',
  });

  debugger;

  console.log('status', response);

  const data = await response.json();

  debugger;

  return data;
}

async function Home() {
  const [highLightProoduct, ...others] = await getFeaturedProducts();

  return (
    <main className='grid max-h-[800px] grid-cols-9 grid-rows-6 gap-6'>
      <Link
        href={`products/${highLightProoduct.slug}`}
        className='group relative col-span-6 row-span-6 overflow-hidden rounded-lg bg-zinc-900'
      >
        <Image
          className='transition-transform duration-300 group-hover:scale-105'
          alt=''
          src={highLightProoduct.image}
          width={920}
          height={920}
          quality={100}
        />

        <div className='absolute bottom-28 right-28 flex h-12 max-w-[280px] items-center gap-2 rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5'>
          <span className='truncate text-sm'>
            {highLightProoduct.description}
          </span>
          <span className='flex h-full items-center justify-center whitespace-nowrap rounded-full bg-violet-500 px-4 font-semibold'>
            {priceFormatter(highLightProoduct.price)}
          </span>
        </div>
      </Link>

      {others.map((product) => (
        <Link
          href={`products/${product.slug}`}
          className='group relative col-span-3 row-span-3 overflow-hidden rounded-lg bg-zinc-900'
          key={product.id}
        >
          <Image
            className='transition-transform duration-300 group-hover:scale-105'
            alt=''
            src={product.image}
            width={920}
            height={920}
            quality={100}
          />

          <div className='absolute bottom-10 right-10 flex h-12 max-w-[280px] items-center gap-2 rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5'>
            <span className='truncate text-sm'>{product.description}</span>
            <span className='flex h-full items-center justify-center whitespace-nowrap rounded-full bg-violet-500 px-4 font-semibold'>
              {priceFormatter(product.price)}
            </span>
          </div>
        </Link>
      ))}
    </main>
  );
}

export default Home;
