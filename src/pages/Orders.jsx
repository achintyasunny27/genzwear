import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); 

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setOrders(res.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false); // ✅ hide loader
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="px-4 sm:px-6 lg:px-16 py-10 min-h-[80vh]">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-10">📦 Your Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No orders yet, your wardrobe’s waiting 👕🧥</p>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-purple-100 rounded-xl shadow-sm p-6 bg-white hover:shadow-md transition duration-300"
            >
              <h3 className="font-semibold text-xl text-purple-800 mb-3">
                🗓️ Placed on {new Date(order.createdAt).toLocaleDateString()}
              </h3>

              <p className="text-sm text-gray-700 mb-4">
                💰 Total Amount: <span className="font-medium text-purple-700">₹{order.totalAmount}</span>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {order.products.map((item) => (
                  <div
                    key={item.productId._id}
                    className="border border-gray-200 rounded-lg p-4 flex items-center bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <img
                      src={item.productId.image}
                      alt={item.productId.title}
                      className="w-16 h-16 object-contain rounded bg-white shadow-sm"
                    />
                    <div className="ml-4">
                      <p className="font-medium text-gray-800">{item.productId.title}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
