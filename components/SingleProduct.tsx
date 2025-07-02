'use client';

import { useCart } from '@/lib/cartContext'; 
import { StarIcon } from '@heroicons/react/20/solid';

type ProductDetails = {
  product: {
    title: string;
    description: string;
    handle: string;
  };
  variant: {
    id: string;
    price: {
      amount: string;
    };
  };
  image: {
    url: string;
    altText?: string;
  };
};

export default function SingleProduct({
  product,
  variant,
  image,
}: ProductDetails) {
  const { addToCart, checkoutUrl } = useCart(); 

  const handleAddToCart = async () => {
    try {
      await addToCart(variant.id, 1); 
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleCheckout = () => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl; 
    }
  };

  return (
    <div className='bg-white'>
      <div className='pt-6'>
        {/* Images */}
        <div className='mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-8 lg:px-8'>
          <img
            alt={image?.altText || product.title}
            src={image?.url}
            className='aspect-3/4 size-full rounded-lg object-cover'
          />
        </div>

        {/* Product Info */}
        <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8'>
          <div className='lg:col-span-2'>
            <h1 className='text-2xl font-bold text-gray-900 sm:text-3xl'>
              {product.title}
            </h1>
            <p className='mt-4 text-gray-600'>{product.description}</p>
          </div>

          <div className='mt-4 lg:mt-0'>
            <p className='text-3xl font-semibold text-gray-900'>
              ${variant.price.amount}
            </p>
            <button
              onClick={handleAddToCart}
              className='mt-6 w-full rounded-md cursor-pointer bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700'
            >
              Add to Cart
            </button>

            <button
              onClick={handleCheckout}
              className='mt-3 w-full rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 cursor-pointer'
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
