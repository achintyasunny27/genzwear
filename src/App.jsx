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

 
function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={isLoggedIn() ? <Cart /> : <Navigate to="/login"/>} />
          <Route path="/orders" element={isLoggedIn() ? <Orders /> : <Navigate to="/login" />} />

          <Route path="/thankyou" element={<ThankYou />} />
        </Routes>
      

      <Footer />
    </div>
  );
}


export default App;
