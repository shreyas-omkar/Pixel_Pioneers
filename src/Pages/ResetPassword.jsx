import { React, useEffect, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { useFormik } from 'formik';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from '../helper/AuthStore';
import { MdMail, MdPassword } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';

const ResetPassword = () => {

  const navigate = useNavigate()

  const { token } = useParams(); // Get token from URL params here
  const { resetPassword, isLoading, error } = useAuthStore();

  useEffect(() => {
    document.title = "Furry Friend | Reset Password";
  }, []);

  const formik = useFormik({
    initialValues: {
      password: '',
      conf_password: '',
    },
    onSubmit: async (values) => {
      if (values.password === values.conf_password) {
        console.log("Resetting password");
        await resetPassword(values.password, token, navigate, formik); // Use token here
      } else {
        toast.error('Passwords do not match');
      }
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
            <div className="input-cover py-5 flex flex-row items-center w-full max-w-md">
              <RiLockPasswordFill className='register-icons text-white text-3xl mr-4' />
              <input
                className="px-4 py-3 leading-9 w-full max-w-full  bg-transparent border-solid border-b-2 focus:border-white border-semiLight outline-none font-body text-white"
                type="password"
                name="password"
                id="Password_Register"
                placeholder='Password'
                {...formik.getFieldProps('password')}
                required
              />
            </div>
            {/* Confirm Password Input */}
            <div className="input-cover py-5 flex flex-row items-center w-full max-w-md">
              <MdPassword className='register-icons text-white text-3xl mr-4' />
              <input
                className="px-4 py-3 leading-9 w-full max-w-full  bg-transparent border-solid border-b-2 focus:border-white border-semiLight outline-none font-body text-white"
                type="password"
                name="conf_password"
                id="Conf_Pass"
                placeholder='Confirm Password'
                {...formik.getFieldProps('conf_password')}
                required
              />
            </div>
            {error ? <p className='font-body text-base md:text-lg flex text-center font-medium text-red-700'>{error}</p> : null}
            <input
              type="submit"
              value={isLoading ? "Resetting ..." : "Reset"}
              className='text-black bg-white px-8 py-3 w-full md:w-1/2 rounded-full border-[1px] border-white hover:text-white hover:bg-transparent mt-2'
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword