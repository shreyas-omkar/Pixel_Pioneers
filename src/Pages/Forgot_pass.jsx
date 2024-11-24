import { React, useEffect, useState } from 'react';
import { MdMail } from 'react-icons/md';
import { TypeAnimation } from 'react-type-animation';
import { useFormik } from 'formik';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ForgotEmailSent from './ForgotEmailSent';
import { useAuthStore } from '../helper/AuthStore.js';


const Forgot_pass = () => {
  const navigate = useNavigate();
  const { forgotPassword, isLoading, error } = useAuthStore();

  useEffect(() => {
    document.title = "Furry Friend | Forgot Password";
  }, []);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: async (values) => {
      await forgotPassword(values, navigate, formik)

      // Navigate to the email sent page, passing the email via state
      navigate('/email_sent', { state: { email: values.email } });
    },
  });

  return (

    <div className='w-full px-4 py-10'>
      <Toaster position='bottom-center' reverseOrder={false}></Toaster>
      <div className="cover flex flex-row px-4 w-full justify-center lg:justify-normal">
        <div className="left-element hidden lg:flex lg:flex-col lg:justify-center lg:w-1/2 py-12 px-8">
          <div className="graphic_welcome">
            <img src="https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Welcome Graphic" />
          </div>
          <div className="typeanimation-cover mt-16">
            <TypeAnimation
              sequence={['Welcome Aboard', 1500, 'Your Pets Gonna Love You More Than Ever', 1500]}
              repeat={Infinity}
              speed={150}
              wrapper="div"
              className='font-body text-2xl md:text-4xl font-semibold text-black overflow-visible'
            />
            <h6 className="font-body text-base md:text-lg font-medium text-black overflow-visible mb-4">Let's Make Your Store A Success</h6>
          </div>
        </div>
        <div className="right-element px-8 py-10 rounded-3xl lg:flex bg-black lg:flex-col lg:items-center justify-center align-middle lg:justify-center lg:w-1/2 lg:px-8 lg:text-center">
          <h1 className="font-heading text-3xl md:text-5xl text-white overflow-visible">Forgot Password?</h1>
          <h6 className="font-body text-base md:text-lg font-medium text-white overflow-visible mt-4">Don't worry! We got you covered...</h6>
          <form onSubmit={formik.handleSubmit} className='mt-8'>
            <div className="input-cover py-5 flex flex-row items-center">
              <span className="align-middle">
                <MdMail className='register-icons mt-4 text-white w-8 h-8 mr-4' />
              </span>
              <input
                className="px-4 py-3 leading-9 w-full bg-transparent border-solid border-b-2 focus:border-white border-semiLight outline-none text-white"
                type="email"
                required
                name="email"
                placeholder='youremail@example.com'
                {...formik.getFieldProps('email')}
              />
            </div>
            {error ? <p className='font-body text-base md:text-lg flex text-center font-medium text-red-700'>{error}</p> : null}
            <input
              type="submit"
              value={isLoading ? "Sending ..." : "Send"}
              className='text-black bg-white px-8 py-3 w-full md:w-1/2 rounded-full border-[1px] border-white hover:text-white hover:bg-transparent mt-2'
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forgot_pass;
