import { GET_PRODUCT_BY_HANDLE } from '@/lib/graphql/queries';
import { shopifyFetch } from '@/lib/shopify';
import { notFound } from 'next/navigation';
import ClientSingleProduct from '@/components/ClientSingleProduct'; 

export default async function ProductPage({
  params,
}: {
  params: { handle: string };
}) {
  const {handle } = params
  const res = await shopifyFetch({
    query: GET_PRODUCT_BY_HANDLE,
    variables: { handle: params.handle },
  });

  const product = res?.product;

  if (!product) return notFound();

  const variant = product.variants?.edges?.[0]?.node;
  const image = product.images?.edges?.[0]?.node;

  return (
    <ClientSingleProduct product={product} variant={variant} image={image} />
  );
}
