import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';


function Orders() {
  const [orders, setOrders] = useState([]);
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
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="px-6 py-8 min-h-[80vh]">
      <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">Your Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-purple-200 rounded-lg shadow p-4"
            >
              <h3 className="font-semibold text-lg text-purple-800 mb-2">
                Order placed on {new Date(order.createdAt).toLocaleDateString()}
              </h3>
              <p className="text-sm mb-2 text-gray-700">Total Amount: ₹{order.totalAmount}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {order.products.map((item) => (
                  <div
                    key={item.productId._id}
                    className="border rounded p-3 flex items-center gap-4"
                  >
                    <img
                      src={item.productId.image}
                      alt={item.productId.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
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
