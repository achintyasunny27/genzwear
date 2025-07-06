import GlowingButton from '../components/GlowingButton';
import { useNavigate } from 'react-router-dom';





function Home() {

    const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_vector-1726220684582-5e82e0e62dd4?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
      }}
    >
      {/* soften background for readability */}
      <div className="backdrop-brightness-90 min-h-screen flex flex-col">

        {/* Hero Section */}
        <section className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="text-center bg-white/80 p-6 rounded-md shadow-md">
            <h1 className="text-4xl sm:text-5xl font-bold text-purple-700 mb-4">
              Welcome to Achintya's GenZ Store 
            </h1>
            <p className="text-lg text-gray-700 max-w-xl mx-auto">
              Discover the latest fashion trends at unbeatable prices.
            </p>
            <p className="text-sm text-gray-600 mt-2">
             Let's Make GenZ fashionable 👽
            </p>

          <GlowingButton
            label="Explore Products"
            onClick={() => navigate('/products')}
          />
          
          </div>
        </section>

        {/* Info Section */}
        <section className="py-10 px-4">
          <div className="max-w-3xl mx-auto text-center bg-white/90 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-purple-800 mb-4">
              What You Will Find Here
            </h2>
            <p className="text-gray-700">
              A clothing store demo built with MERN stack and Tailwind CSS. You can register,
              login, browse products, add to cart, and place orders. The UI is responsive and built
              to reflect real-world practices.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}

export default Home;
