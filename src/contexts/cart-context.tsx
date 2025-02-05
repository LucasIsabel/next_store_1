'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

interface CartItem {
  productId: number;
  quantity: number;
}

interface CartContext {
  items: CartItem[];
  addCartItem: (item: number) => void;
}

export const CartContext = createContext({} as CartContext);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setCartItem] = useState<CartItem[]>([]);

  const handleAddCartItem = (productId: number) => {
    setCartItem((prevItems) => {
      const productInCart = prevItems.some(
        (cartItem) => cartItem.productId === productId,
      );

      debugger;

      if (productInCart) {
        return prevItems.map((cartItem) => {
          if (cartItem.productId === productId) {
            debugger;
            return { ...cartItem, quantity: cartItem.quantity + 1 };
          }
          return cartItem;
        });
      } else {
        return [...prevItems, { productId, quantity: 1 }];
      }
    });
  };

  return (
    <CartContext.Provider value={{ items, addCartItem: handleAddCartItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
