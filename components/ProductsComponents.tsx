import { GET_PRODUCTS } from '@/lib/graphql/queries';
import { shopifyFetch } from '@/lib/shopify';


export default async function Products() {

  const res = await shopifyFetch({ query: GET_PRODUCTS });
  const products = res.products.edges;


  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
          Customers also purchased
        </h2>

        <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
          {products.map(({ node }: any) => {
            const product = node;
            const firstVariant = product.variants.edges[0]?.node;
            const firstImage = product.images.edges[0]?.node.url;

            return (
              <div key={product.id} className='group relative'>
                <img
                  alt={product.title}
                  src={firstImage}
                  className='aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80'
                />
                <div className='mt-4 flex justify-between'>
                  <div>
                    <h3 className='text-sm text-gray-700'>
                      <a href={`/products/${product.handle}`}>
                        <span aria-hidden='true' className='absolute inset-0' />
                        {product.title}
                      </a>
                    </h3>
                    <p className='mt-1 text-sm text-gray-500'>
                      {product.vendor}
                    </p>
                  </div>
                  <p className='text-sm font-medium text-gray-900'>
                    ${firstVariant?.price.amount}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
