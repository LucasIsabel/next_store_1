import { NextResponse } from 'next/server';
import data from '../data.json';
import { z } from 'zod';

const GET = async (_: Request, { params }: { params: { slug: string } }) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const slug = z.string().parse(params.slug);

  const product = data.products.filter((product) =>
    product.slug.includes(slug),
  );

  if (!product)
    return NextResponse.json({ message: 'product not found' }, { status: 404 });

  return NextResponse.json(product);
};

export { GET };
