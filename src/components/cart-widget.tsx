'use client';

import { useCart } from '@/contexts/cart-context';
import { ShoppingBag } from 'lucide-react';

function CardWidget() {
  const { items } = useCart();

  return (
    <div className='flex items-center gap-2'>
      <ShoppingBag className='h-4 w-4 text-white' />
      <span className='text-sm text-white'> Cart ({items.length}) </span>
    </div>
  );
}

export default CardWidget;
