import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Products from './pages/Products';
import Cart from './pages/Cart';
import ThankYou from './pages/ThankYou'; // 
import Orders from './pages/Orders';


import { isLoggedIn } from './utils/auth';
import { Navigate } from 'react-router-dom';

import { useAuth } from './context/AuthContext';

 
function App() {

 const { user, loading } = useAuth();
  if (loading) return <div className="text-center mt-20 text-lg text-gray-600">Checking login...</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={ user ? <Cart /> : <Navigate to="/login"/>} />
          <Route path="/orders" element={ user ? <Orders /> : <Navigate to="/login" />} />

          <Route path="/thankyou" element={<ThankYou />} />
        </Routes>
      

  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "20vh",
      textAlign: "center",
    }}
  >
    <h1>Hi, I'm Achintya 👋</h1>
    <p>This is my customized version of the Z Store.</p>
  </div>


      <Footer />
    </div>
  );
}


export default App;
