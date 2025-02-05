import { FeaturedProducts } from '@/@types/Products.type';
import { api } from '@/data/api';
import { priceFormatter } from '@/helpers';
import Image from 'next/image';
import AddToCartButton from './add-to-cart-button';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  const product = await getProduct(params.slug);

  return {
    title: product.title,
  };
}

export async function generateStaticParams() {
  const products = await api('/featured');

  const data: FeaturedProducts[] = await products.json();

  const slugs = data.map((product: FeaturedProducts) => ({
    slug: product.slug,
  }));

  return slugs;
}

async function getProduct(slug: string): Promise<FeaturedProducts> {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 60,
    },
  });
  const data = await response.json();

  return Array.isArray(data) ? data[0] : data;
}

async function Product({ params }: PageProps) {
  const product = await getProduct(params.slug);

  return (
    <div className='relative grid max-h-[860px] grid-cols-3'>
      <div className='col-span-2 overflow-hidden'>
        <Image
          src={product.image}
          alt=''
          width={1000}
          height={1000}
          quality={100}
        />
      </div>
      <div className='flex flex-col justify-center px-12'>
        <div className='text-3xl font-bold leading-tight'>{product.title}</div>
        <p className='mt-2 leading-relaxed text-zinc-400'>
          Moletom fabricado com algodão 100% orgânico, com estampa em silk
        </p>
        <div className='mt-8 flex items-center gap-3'>
          Em 12x s/ juros de R$10,75
          <span className='py-s.5 inline-block rounded-full bg-violet-500 px-5 font-semibold'>
            {priceFormatter(product.price)}
          </span>
        </div>
        <div className='mt-8 space-y-4'>
          <span className='block font-semibold'> Tamanhos </span>
          <div className='flex gap-2'>
            <button className='flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold'>
              P
            </button>
            <button className='flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold'>
              M
            </button>
            <button className='flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold'>
              G
            </button>
            <button className='flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold'>
              GG
            </button>
          </div>
        </div>
        <AddToCartButton productId={product.id} />
      </div>
    </div>
  );
}

export default Product;
