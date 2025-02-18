
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const Product = () => {
  const [products, setProducts] = useState([]); 
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/getProducData`);
        setProducts(response.data);
        setFilteredProducts(response.data); 
      } catch (error) {
        console.error('Error fetching Products:', error);
      }
    };
    fetchProducts();
  }, []);

  const applyFilter = (size) => {
    setSelectedSize(size);
    if (size) {
      const filtered = products.filter(product => product.size === size);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  return (
    <div className="bg-amber-400 h-full min-h-screen flex flex-col items-center py-10 gap-8 relative">
      {/* Filter Dropdown Button */}
      <div className="relative">
        <button 
          className='border-2 border-black rounded-md px-4 py-2 bg-gray-300'
          onClick={() => setShowFilters(!showFilters)}
        >
          Filter by Size
        </button>

        {/* Dropdown Menu */}
        {showFilters && (
          <div className="absolute top-12 left-0 bg-white border border-black rounded-md shadow-md flex flex-col z-50">
            {['small', 'medium', 'large'].map(size => (
              <button 
                key={size}
                className={`px-4 py-2 hover:bg-gray-200 ${selectedSize === size ? 'bg-gray-500 text-white' : ''}`}
                onClick={() => {
                  applyFilter(size);
                  setShowFilters(false);
                }}
              >
                {size}
              </button>
            ))}
            {/* Clear Filter Option */}
            <button 
              className="px-4 py-2 bg-red-400 text-white"
              onClick={() => {
                applyFilter(null);
                setShowFilters(false);
              }}
            >
              Clear Filter
            </button>
          </div>
        )}
      </div>

      {/* Product Cards */}
      <div className="flex flex-wrap gap-4 p-4 justify-center relative z-10">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Product;

