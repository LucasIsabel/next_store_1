'use client';

import { useCart } from '@/contexts/cart-context';

function AddToCartButton({ productId }: { productId: number }) {
  const { addCartItem } = useCart();

  return (
    <button
      onClick={() => addCartItem(productId)}
      className='mt-8 flex max-h-12 flex-1 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white'
    >
      Adicionar ao carrinho
    </button>
  );
}

export default AddToCartButton;
