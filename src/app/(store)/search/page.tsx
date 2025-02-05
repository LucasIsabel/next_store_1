import Link from 'next/link';
import Image from 'next/image';
import { priceFormatter } from '@/helpers';
import { redirect } from 'next/navigation';
import { api } from '@/data/api';
import { FeaturedProducts } from '@/@types/Products.type';

async function getFilteredProducts(query: string): Promise<FeaturedProducts[]> {
  const response = await api(`/products/${query}`, {
    cache: 'no-cache',
  });

  const data = await response.json();

  console.log('data', data);

  return data.length > 0 ? data : [];
}

async function SearchPage({
  searchParams,
}: {
  searchParams: Record<string, string | null | undefined>;
}) {
  if (!searchParams?.q) {
    return redirect('/');
  }

  const products = await getFilteredProducts(searchParams.q);

  console.log(products);

  return (
    <div className='flex flex-col gap-4'>
      <p className='text-sm'>
        Resultado para:
        <span className='font-semibold'> {searchParams?.q ?? ''} </span>
      </p>

      <div className='relative grid grid-cols-3 gap-6'>
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className='group relative flex items-end justify-center overflow-hidden rounded-lg bg-zinc-900'
          >
            <Image
              className='transition-transform duration-300 group-hover:scale-105'
              alt=''
              src={product.image}
              width={480}
              height={480}
              quality={100}
            />

            <div className='absolute bottom-4 right-2 flex h-12 w-80 items-center justify-end gap-2 rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5'>
              <span className='truncate text-sm'>{product.description}</span>
              <span className='flex h-full items-center justify-center whitespace-nowrap rounded-full bg-violet-500 px-4 text-sm font-semibold'>
                {priceFormatter(product.price)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
