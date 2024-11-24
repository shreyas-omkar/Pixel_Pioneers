import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import Products from './Pages/Products';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import Appointment from './Pages/Appointment';
import Thanks from './Pages/Thanks';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Forgot_pass from './Pages/Forgot_pass';
import VerifyUsingOTP from './Pages/VerifyUsingOTP';
import ForgotEmailSent from './Pages/ForgotEmailSent';
import ResetPassword from './Pages/ResetPassword';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './helper/AuthStore';
import Spinner from './assets/Spinner.svg';
import TermsAndConditions from './Pages/Terms';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import TestimonialCarousel from './Pages/Carousel';
import FAQ from './Pages/Faq';

const RedirectAuthenticatedUsers = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { checkAuth, isAuthenticated, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []); // Empty dependency array to run only once on mount

  console.log('isAuthenticated:', isAuthenticated);

  return (
    <>
      <BrowserRouter>
        <Toaster position="bottom-center" reverseOrder={false} />
        <Navbar />
        {isCheckingAuth && (
          <div className="absolute w-full h-full backdrop-blur-xl">
            <img
              src={Spinner}
              alt="Loading..."
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mx-auto my-auto"
            />
          </div>
        )}
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:_id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/thanks" element={<Thanks />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/faqs" element={<FAQ />} />

          
          <Route
            path="/register"
            element={
              <RedirectAuthenticatedUsers>
                <Register />
              </RedirectAuthenticatedUsers>
            }
          />
          <Route
            path="/login"
            element={
              <RedirectAuthenticatedUsers>
                <Login />
              </RedirectAuthenticatedUsers>
            }
          />
          <Route
            path="/forgot_password"
            element={
              <RedirectAuthenticatedUsers>
                <Forgot_pass />
              </RedirectAuthenticatedUsers>
            }
          />
          <Route
            path="/verify_email"
            element={
                <VerifyUsingOTP />
            }
          />
          <Route
            path="/email_sent"
            element={
              <RedirectAuthenticatedUsers>
                <ForgotEmailSent />
              </RedirectAuthenticatedUsers>
            }
          />
          <Route
            path="/resetPassword/:token"
            element={
              <RedirectAuthenticatedUsers>
                <ResetPassword />
              </RedirectAuthenticatedUsers>
            }
          />
        </Routes>
        <div className='overflow-hidden w-full flex flex-col items-center'>
        <hr className='w-[90%] h-[2px] bg-black self-center' />
        <h1 className='font-head text-6xl text-center font-semibold mt-8'>Our Fam</h1>


        <TestimonialCarousel />

        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
