import { useMemo } from 'react';

import ProductItem from './ProductItem';

interface SearchResultsProps {
  results: Array<{
    id: number;
    price: number;
    formattedPrice: string;
    title: string;
  }>;
  totalPrice: number;
  onAddToWishList: (id: number) => void;
}

const SearchResults = ({
  results,
  totalPrice,
  onAddToWishList,
}: SearchResultsProps) => {
  return (
    <div>
      <h2>{totalPrice}</h2>
      {results.map((product) => {
        return (
          <ProductItem
            key={product.id}
            product={product}
            onAddToWishList={onAddToWishList}
          />
        );
      })}
    </div>
  );
};

export default SearchResults;
