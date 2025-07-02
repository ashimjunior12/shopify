'use client';

import { Fragment, useState } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react';
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useCart } from '@/lib/cartContext';
import CartDrawer from './CartDrawer';

const navigation = {
  categories: [
    // ... your original categories
  ],
  pages: [
    { name: 'Company', href: '#' },
    { name: 'Stores', href: '#' },
  ],
};

export default function Navbar() {
  const [open, setOpen] = useState(false); // for mobile menu
  const [cartOpen, setCartOpen] = useState(false); // for cart drawer
  const { lines } = useCart();

  const totalQuantity = lines?.reduce(
    (acc: number, item: any) => acc + item?.node?.quantity,
    0
  );

  return (
    <div className='bg-white'>
      {/* Mobile menu (no changes here) */}
      <Dialog open={open} onClose={setOpen} className='relative z-40 lg:hidden'>
        <DialogBackdrop
          transition
          className='fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0'
        />
        {/* ...rest of mobile menu */}
      </Dialog>

      {/* Top Nav */}
      <header className='relative bg-white'>
        <nav
          aria-label='Top'
          className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'
        >
          <div className='border-b border-gray-200'>
            <div className='flex h-16 items-center'>
              {/* Mobile menu button */}
              <button
                type='button'
                onClick={() => setOpen(true)}
                className='relative rounded-md bg-white p-2 text-gray-400 lg:hidden'
              >
                <span className='absolute -inset-0.5' />
                <span className='sr-only'>Open menu</span>
                <Bars3Icon aria-hidden='true' className='size-6' />
              </button>

              {/* Logo */}
              <div className='ml-4 flex lg:ml-0'>
                <a href='#'>
                  <span className='sr-only'>Your Company</span>
                  <img
                    alt=''
                    src='https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600'
                    className='h-8 w-auto'
                  />
                </a>
              </div>

              {/* Desktop menu */}
              <PopoverGroup className='hidden lg:ml-8 lg:block lg:self-stretch'>
                <div className='flex h-full space-x-8'>
                  {/* ...category menu */}
                </div>
              </PopoverGroup>

              {/* Right icons */}
              <div className='ml-auto flex items-center'>
                <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
                  <a
                    href='#'
                    className='text-sm font-medium text-gray-700 hover:text-gray-800'
                  >
                    Sign in
                  </a>
                  <span aria-hidden='true' className='h-6 w-px bg-gray-200' />
                  <a
                    href='#'
                    className='text-sm font-medium text-gray-700 hover:text-gray-800'
                  >
                    Create account
                  </a>
                </div>

                {/* Country flag */}
                <div className='hidden lg:ml-8 lg:flex'>
                  <a
                    href='#'
                    className='flex items-center text-gray-700 hover:text-gray-800'
                  >
                    <img
                      alt=''
                      src='https://tailwindcss.com/plus-assets/img/flags/flag-canada.svg'
                      className='block h-auto w-5 shrink-0'
                    />
                    <span className='ml-3 block text-sm font-medium'>CAD</span>
                    <span className='sr-only'>, change currency</span>
                  </a>
                </div>

                {/* Search Icon */}
                <div className='flex lg:ml-6'>
                  <a href='#' className='p-2 text-gray-400 hover:text-gray-500'>
                    <span className='sr-only'>Search</span>
                    <MagnifyingGlassIcon
                      aria-hidden='true'
                      className='size-6'
                    />
                  </a>
                </div>

                {/* 🛒 Cart Icon */}
                <div className='ml-4 flow-root lg:ml-6'>
                  <button
                    onClick={() => setCartOpen(true)}
                    className='group -m-2 flex items-center p-2'
                  >
                    <ShoppingBagIcon
                      aria-hidden='true'
                      className='size-6 shrink-0 text-gray-400 group-hover:text-gray-500'
                    />
                    <span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800'>
                      {totalQuantity}
                    </span>
                    <span className='sr-only'>items in cart, view bag</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* 🧾 Cart Drawer */}
      <CartDrawer open={cartOpen} setOpen={setCartOpen} />
    </div>
  );
}
