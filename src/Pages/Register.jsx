import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { MdMail, MdPassword } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { IoPersonCircleSharp } from "react-icons/io5";
import { BsPersonVcardFill } from "react-icons/bs";
import { TypeAnimation } from 'react-type-animation';
import { Toaster, toast } from 'react-hot-toast';
import axios from "axios";

const Register = () => {
    let isLoading = false;
    let error = null;
    const navigate = useNavigate();
  return (
    <div>
        <div className='w-full px-4 py-10'>
            <Toaster position='bottom-center' reverseOrder={false} />
            <div className="cover flex flex-row px-4 w-full justify-center  lg:justify-normal">
                {/* Left Side - Graphic and Animation (Unchanged) */}
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

                {/* Right Side - Register Form (Styled) */}
                <div className=" py-12 right-element flex flex-col items-center justify-center w-full lg:w-1/2 lg:px-8 lg:text-center bg-black p-8 rounded-3xl">
                    <h1 className="font-heading text-3xl overflow-visible md:text-5xl text-white pb-1">Let's Get Started</h1>
                    <h6 className="font-body text-base md:text-lg font-medium text-white pb-6">Give Your Pets A Better Life</h6>
                    <form onSubmit={(e) => navigate('/thanks')} className='mt-8 w-full lg:flex lg:flex-col lg:items-center lg:justify-center'>
                        {/* Username Input */}
                        <div className="input-cover py-5 flex flex-row items-center w-full max-w-md">
                            <IoPersonCircleSharp className='register-icons text-white text-3xl mr-4' />
                            <input
                                className="px-4 py-3 leading-9 w-full max-w-full  bg-transparent border-solid border-b-2 focus:border-white border-semiLight outline-none font-body text-white"
                                type="text"
                                name="username"
                                id="Username_Register"
                                placeholder='Username'
                                
                                required
                            />
                        </div>
                        {/* Full Name Input */}
                        <div className="input-cover py-5 flex flex-row items-center w-full max-w-md">
                            <BsPersonVcardFill className='register-icons text-white text-3xl mr-4' />
                            <input
                                className="px-4 py-3 leading-9 w-full max-w-full  bg-transparent border-solid border-b-2 focus:border-white border-semiLight outline-none font-body text-white"
                                type="text"
                                name="fullname"
                                id="Fullname_Register"
                                placeholder='Full Name'
                                required
                            />
                        </div>
                        {/* Email Input */}
                        <div className="input-cover py-5 flex flex-row items-center w-full max-w-md">
                            <MdMail className='register-icons text-white text-3xl mr-4' />
                            <input
                                className="px-4 py-3 leading-9 w-full max-w-full  bg-transparent border-solid border-b-2 focus:border-white border-semiLight outline-none font-body text-white"
                                type="email"
                                name="email"
                                id="Email_Register"
                                placeholder='Email Id'
                                required
                            />
                        </div>
                        {/* Password Input */}
                        <div className="input-cover py-5 flex flex-row items-center w-full max-w-md">
                            <RiLockPasswordFill className='register-icons text-white text-3xl mr-4' />
                            <input
                                className="px-4 py-3 leading-9 w-full max-w-full  bg-transparent border-solid border-b-2 focus:border-white border-semiLight outline-none font-body text-white"
                                type="password"
                                name="password"
                                id="Password_Register"
                                placeholder='Password'
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
                                required
                            />
                        </div>
                        {error ? <p className='font-body text-base md:text-lg flex text-center font-medium text-red-700'>{error}</p> : null}
                        {/* Submit Button */}
                        <input
                            type="submit"
                            disabled={isLoading}
                            value={isLoading ? "Registering..." : "Register"}
                            className='text-black bg-white font-light px-8 py-3 my-8 rounded-full border border-white hover:text-white hover:bg-transparent transition duration-300 ease-in-out w-full max-w-md lg:w-auto lg:px-8 lg:text-lg flex items-center justify-center'
                            id='Submit'
                        />
                    </form>
                    {/* Login Link */}
                    <h6 className='font-body text-base md:text-lg font-medium text-white'>
                        Already Registered? 
                        <NavLink to="/login" className="font-body text-base md:text-lg font-medium text-red-700 ml-1 hover:underline">
                            Log In
                        </NavLink>
                    </h6>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register