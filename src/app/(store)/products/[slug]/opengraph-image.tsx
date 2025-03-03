import { FeaturedProducts } from '@/@types/Products.type';
import { api } from '@/data/api';
import { env } from '@/env';
import Image from 'next/image';
import { ImageResponse } from 'next/og';
import colors from 'tailwindcss/colors';

export const runtime = 'edge';

// Image metadata
export const alt = 'About Acme';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

async function getProduct(slug: string): Promise<FeaturedProducts> {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 60,
    },
  });
  const data = await response.json();
  return data;
}

// Image generation
export default async function OgImage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);

  const productImageURL = new URL(product.image, env.APP_URL).toString();

  return new ImageResponse(
    (
      <div
        style={{
          background: colors.zinc[950],
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Image src={productImageURL} alt='' style={{ width: '100%' }} />
      </div>
    ),
    {
      ...size,
    },
  );
}
