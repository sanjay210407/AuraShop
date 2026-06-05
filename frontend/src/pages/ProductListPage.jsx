import { useMemo, useState } from 'react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

function ProductListPage() {
  const { products, fetchProducts, loading } = useShop();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const categories = useMemo(
    () => Array.from(new Set(products.map((product) => product.category))),
    [products]
  );

  const onSubmit = async (event) => {
    event.preventDefault();
    await fetchProducts({ search, category });
  };

  return (
    <section>
      <form className="filter-bar" onSubmit={onSubmit}>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search products"
        />
        <select value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="">All categories</option>
          {categories.map((entry) => (
            <option key={entry} value={entry}>{entry}</option>
          ))}
        </select>
        <button type="submit">Search</button>
      </form>
      {loading ? <LoadingSpinner /> : (
        <div className="grid">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      )}
    </section>
  );
}

export default ProductListPage;
