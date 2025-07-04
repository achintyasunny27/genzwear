import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import GlowingButton from '../components/GlowingButton';
import FancyButton from '../components/FancyButton';


function ThankYou() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-4"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1587725943749-3d475c15c983?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: '#fff'
      }}
    >
      <h1 className="text-3xl md:text-5xl font-bold text-white-600 mb-6">
         Thank you for placing your order
      </h1>
      <p className="text-lg text-white mb-4">
     This is a dummy model with a hope that it will be industry-level ready one day!
    </p>
    <p className="text-white opacity-80 mb-6">
     Your items will reach you one day using this site..
    </p>



  <GlowingButton
              label="View Your Orders"
              onClick={() => navigate('/Orders')}
            />



 <FancyButton
        label="Continue Shopping"
        onClick={() => navigate('/products')}
      />





    </div>
  );
}

export default ThankYou;
