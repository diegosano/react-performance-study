import dynamic from 'next/dynamic';
import lodash from 'lodash';
import { memo, useState } from 'react';

import type { AddProductToWishListProps } from './AddProductToWishList';

const AddProductToWishList = dynamic<AddProductToWishListProps>(
  () => {
    // if component isn't exported as default
    // return import('./AddProductToWishList').then(mod => mod.AddProductToWishList);
    // else
    return import('./AddProductToWishList');
  },
  {
    loading: () => <span>Carregando...</span>,
  }
);

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    formattedPrice: string;
    title: string;
  };
  onAddToWishList: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
  const [isAddingToWishList, setIsAddingToWishList] = useState(false);

  return (
    <div>
      {product.title} - <strong>{product.formattedPrice}</strong>
      <button onClick={() => setIsAddingToWishList(true)}>
        Adicionar aos favoritos
      </button>
      {isAddingToWishList && (
        <AddProductToWishList
          onAddToWishList={() => onAddToWishList(product.id)}
          onRequestClose={() => setIsAddingToWishList(false)}
        />
      )}
    </div>
  );
}

const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return lodash.isEqual(prevProps.product, nextProps.product);
});

export default ProductItem;
