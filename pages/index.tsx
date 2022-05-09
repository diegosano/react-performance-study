import { FormEvent, useCallback, useState } from 'react';
import type { NextPage } from 'next';

import SearchResults from '../components/SearchResults';

type Results = {
  totalPrice: number;
  data: any[];
};

type Product = {
  id: number;
  price: number;
  title: string;
};

const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const Home: NextPage = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Results>({ totalPrice: 0, data: [] });

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data: Product[] = await response.json();

    const products = data.map((product) => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        formattedPrice: formatter.format(product.price),
      };
    });

    const totalPrice = data.reduce(
      (total: number, product: { price: number }) => total + product.price,
      0
    );

    setResults({ totalPrice, data: products });
  }

  const addToWishlist = useCallback(async (id: number) => {
    console.log(id);
  }, []);

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit">Buscar</button>
      </form>

      <SearchResults
        results={results.data}
        totalPrice={results.totalPrice}
        onAddToWishList={addToWishlist}
      />
    </div>
  );
};

export default Home;
