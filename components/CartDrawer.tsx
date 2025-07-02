'use client';

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/lib/cartContext';

export default function CartDrawer({ open, setOpen }) {
  const { lines, checkoutUrl, updateCart } = useCart();

  const subtotal = lines.reduce((total, line) => {
    const price = parseFloat(line.node.merchandise.price.amount || '0');
    const quantity = line.node.quantity;
    return total + price * quantity;
  }, 0);

  return (
    <Dialog open={open} onClose={setOpen} className='relative z-50'>
      <DialogBackdrop className='fixed inset-0 bg-gray-500/75' />

      <div className='fixed inset-0 overflow-hidden'>
        <div className='absolute inset-0 overflow-hidden'>
          <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16'>
            <DialogPanel className='pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out'>
              <div className='flex h-full flex-col overflow-y-auto bg-white shadow-xl'>
                <div className='flex-1 overflow-y-auto px-4 py-6 sm:px-6'>
                  <div className='flex items-start justify-between'>
                    <DialogTitle className='text-lg font-medium text-gray-900'>
                      Shopping Cart
                    </DialogTitle>
                    <div className='ml-3 flex h-7 items-center'>
                      <button
                        onClick={() => setOpen(false)}
                        className='-m-2 p-2 text-gray-400 hover:text-gray-500'
                      >
                        <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                      </button>
                    </div>
                  </div>

                  <div className='mt-8 flow-root'>
                    {lines.length === 0 ? (
                      <p className='text-center text-gray-500'>
                        Your cart is empty.
                      </p>
                    ) : (
                      <ul className='-my-6 divide-y divide-gray-200'>
                        {lines.map((line) => {
                          const item = line.node;
                          const product = item.merchandise.product;
                          const image = item.merchandise.image;

                          return (
                            <li key={item.id} className='flex py-6'>
                              {/* + Symbol */}
                              <button
                                className='bg-amber-500 cursor-pointer px-2 rounded text-white'
                                onClick={() =>
                                  updateCart(item.id, item.quantity + 1)
                                }
                              >
                                +
                              </button>
                              {/* + Symbol */}
                              <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                                <img
                                  src={image?.url}
                                  alt={image?.altText || product.title}
                                  className='h-full w-full object-cover'
                                />
                              </div>
                              {/* - Symbol */}
                              <button
                                className='bg-amber-400 cursor-pointer px-2 rounded text-white ml-2'
                                onClick={() => {
                                  if (item.quantity > 1) {
                                    updateCart(item.id, item.quantity - 1);
                                  } else {
                                    
                                    updateCart(item.id, 0); 
                                  }
                                }}
                              >
                                -
                              </button>
                              {/* - Symbol */}

                              <div className='ml-4 flex flex-1 flex-col'>
                                <div className='flex justify-between text-base font-medium text-gray-900'>
                                  <h3>{product.title}</h3>
                                  <p className='ml-4'>
                                    ${item.merchandise.price.amount}
                                  </p>
                                </div>
                                <div className='flex flex-1 items-end justify-between text-sm text-gray-500'>
                                  <p>Qty {item.quantity}</p>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </div>

                <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
                  <div className='flex justify-between text-base font-medium text-gray-900'>
                    <p>Subtotal</p>
                    <p>${subtotal.toFixed(2)}</p>
                  </div>
                  <p className='mt-0.5 text-sm text-gray-500'>
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className='mt-6'>
                    <a
                      href={checkoutUrl || '#'}
                      className='flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700'
                    >
                      Checkout
                    </a>
                  </div>
                  <div className='mt-6 flex justify-center text-sm text-gray-500'>
                    <p>
                      or{' '}
                      <button
                        type='button'
                        onClick={() => setOpen(false)}
                        className='font-medium text-indigo-600 hover:text-indigo-500'
                      >
                        Continue Shopping
                        <span aria-hidden='true'> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
