import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';



function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/cart', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(res.data.products);
      } catch (err) {
        console.error('Error fetching cart:', err);
      }
    };

    fetchCart();
  }, []);

  const getTotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + item.productId.price * item.quantity,
      0
    );
  };

  const handleRemove = async (productId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // remove items
      setCartItems(cartItems.filter(item => item.productId._id !== productId));
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/orders', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Order placed successfully!');
      navigate('/Thankyou');  // created a new order page so will redirect to it after order page! // 

    } catch (err) {
      console.error('Checkout failed:', err);
      alert('Something went wrong during checkout');
    }
  };

  return (
    <div className="p-6 sm:p-10 max-w-5xl mx-auto">
      <h2 className="text-3xl font-semibold text-purple-800 mb-6">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-lg">Your cart is empty</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.productId._id}
              className="flex items-center border-b pb-4 gap-4"
            >
              <img
                src={item.productId.image}
                alt={item.productId.title}
                className="w-24 h-24 object-cover rounded-md"
              />

              <div className="flex-1">
                <h4 className="text-lg font-medium text-gray-800">{item.productId.title}</h4>
                <p className="text-sm text-gray-600">₹{item.productId.price} × {item.quantity}</p>
                <p className="text-sm font-semibold text-purple-700">
                  Total: ₹{item.productId.price * item.quantity}
                </p>
              </div>

              <button
                onClick={() => handleRemove(item.productId._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 text-sm rounded"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right mt-6">
            <h3 className="text-xl font-semibold text-purple-800 mb-4">
              Grand Total: ₹{getTotal()}
            </h3>

            <button
              onClick={handleCheckout}
              className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-md font-medium"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
