import data from '../products/data.json';
import { NextRequest, NextResponse } from 'next/server';
import zod from 'zod';

async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const query = zod.string().parse(searchParams.get('q'));

  const products = data.products.filter((product) =>
    product.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
  );

  if (products.length === 0) {
    return NextResponse.json({ message: 'product not found' }, { status: 404 });
  }

  return NextResponse.json(products);
}

export { GET };
