import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useSearch } from '../context/SearchContext'; // this will now filter results using query// 

import toast from 'react-hot-toast';



function Products() {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const { query } = useSearch();


    const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

 const handleQuantityChange = (productId, qty) => {
    setQuantities((prev) => ({ ...prev, [productId]: parseInt(qty) }));
  };


  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem('token');

    if (!token) {
     toast.error('Please sign in to add items');
    setTimeout(() => navigate('/login'), 1500); // wait 1.5s showing toast //
    return;
    }

    const quantity = quantities[productId] || 1;


    try {
      await axios.post(
        'http://localhost:5000/api/cart',
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      toast.success('Product added to cart!');
    } catch (err) {
      console.error('Error adding to cart:', err);
      toast.error('Failed to add to cart');
    }
  };

  return (
    <div className="px-6 py-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-purple-800 mb-2">
          Explore Our Latest Styles ✨
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto text-sm sm:text-base">
          From streetwear to classics — shop your vibe from our finest collection.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products
       .filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
       .map((product) =>(
          <div
            key={product._id}
            className="border border-purple-200 rounded-lg shadow-sm p-4 hover:shadow-md transition duration-300"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full aspect-[3/4] object-contain rounded-md bg-white"
            />
            <h3 className="mt-3 text-lg font-semibold text-gray-800">
              {product.title}
            </h3>
            <p className="text-purple-700 font-semibold mt-1">₹{product.price}</p>
            <p className="text-sm text-gray-600 mt-1">{product.desc}</p>

                  {/* quantity div  */}
            <div className="mt-3 flex items-center space-x-2">
              <label htmlFor={`qty-${product._id}`} className="text-sm text-gray-600">
                Qty:
              </label>
              <select
                id={`qty-${product._id}`}
                value={quantities[product._id] || 1}
                onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              >
                {[1, 2, 3, 4, 5].map((qty) => (
                  <option key={qty} value={qty}>{qty}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => handleAddToCart(product._id)}
              className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md transition duration-200"
            >
              Add to Cart
            </button>

            
          </div>
        ))}
      </div>

        {token && (
        <button
          onClick={() => navigate('/cart')}
          className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-5 rounded-full shadow-lg z-50 transition duration-200"
        >
          🛒 Go to Cart
        </button>
      )}




    </div>
  );
}

export default Products;
