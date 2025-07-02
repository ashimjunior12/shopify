'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { shopifyFetch } from './shopify';
import { CREATE_CART, ADD_TO_CART, GET_CART } from './graphql/queries';

const CartContext = createContext<any>(null);

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartId, setCartId] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [lines, setLines] = useState<any[]>([]);

  // Load cartId from localStorage
  useEffect(() => {
    const localCartId = localStorage.getItem('cartId');
    if (localCartId) setCartId(localCartId);
  }, []);

  // Save cartId when it changes
  useEffect(() => {
    if (cartId) localStorage.setItem('cartId', cartId);
  }, [cartId]);

  // Fetch updated cart lines and checkoutUrl
  useEffect(() => {
    const fetchCart = async () => {
      if (cartId) {
        const res = await shopifyFetch({
          query: GET_CART,
          variables: { cartId },
        });
        const cart = res.cart;
        setLines(cart.lines.edges);
        setCheckoutUrl(cart.checkoutUrl);
      }
    };
    fetchCart();
  }, [cartId]);

  const addToCart = async (variantId: string, quantity = 1) => {
    if (!cartId) {
      const res = await shopifyFetch({
        query: CREATE_CART,
        variables: { variantId, quantity },
      });
      const cart = res.cartCreate.cart;
      setCartId(cart.id);
      setLines(cart.lines.edges);
      setCheckoutUrl(cart.checkoutUrl);
    } else {
      const res = await shopifyFetch({
        query: ADD_TO_CART,
        variables: { cartId, variantId, quantity },
      });
      const cart = res.cartLinesAdd.cart;
      setLines(cart.lines.edges);
      setCheckoutUrl(cart.checkoutUrl);
    }
  };

  return (
    <CartContext.Provider value={{ cartId, checkoutUrl, lines, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
