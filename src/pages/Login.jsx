import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

import Loader from '../components/Loader';


function Login() {

  const { setUser } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem("name", res.data.user.name)
     setUser({ name: res.data.user.name, token: res.data.token });
      setTimeout(() => navigate('/products'), 200);
      
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }  finally {
        setLoading(false); //  hide loader
      }
  };

    if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-rose-100 flex items-center justify-center px-4">
      
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        {/* Title */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-purple-500">Welcome to the Store 👋</h2>
           <p className="text-gray-600 mt-1 text-sm">
              Login to your account and raise your fashion sense
             </p>
          </div>

        {/* login form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">Email </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 rounded-md hover:bg-purple-800 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
