'use client';

import { useCart } from '@/lib/cartContext';
import SingleProduct from './SingleProduct';

export default function ClientSingleProduct({ product, variant, image }: any) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(variant.id, 1);
  };

  return (
    <SingleProduct
      product={product}
      variant={variant}
      image={image}
      onAddToCart={handleAddToCart}
    />
  );
}
