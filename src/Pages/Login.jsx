import { React, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { MdMail, MdPassword } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
import { TypeAnimation } from 'react-type-animation';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import { useFormik } from 'formik';
import { useAuthStore } from '../helper/AuthStore.js';
import {LoginValidate} from '../helper/Validate.js';

const Login = () => {
    useEffect(() => {
        document.title = "Furry Friend | Login"
    }, []);

    const { loginUser, isLoading, error } = useAuthStore(); 
    const navigate = useNavigate(); 

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate: LoginValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            await loginUser(values, navigate, formik)
        }
    });
  return (
    <div>
        <div className='w-full px-4 py-10'>
            <Toaster position='bottom-center' reverseOrder={false}></Toaster>
            <div className="cover flex flex-row px-4 w-full justify-center lg:justify-normal">
                <div className="left-element hidden lg:block  w-1/2 py-12 px-8">
                    <div className="graphic_welcome">
                        <img src="https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Welcome Graphic" />
                    </div>
                    <div className="typeanimation-cover mt-16">
                        <TypeAnimation id='typeanimation' className='font-body text-2xl md:text-4xl font-semibold text-black overflow-visible' sequence={['Welcome Aboard', 1500, 'Your Pets Gonna Love You More Than Ever', 1500]} repeat={Infinity} speed={{ type: 'keyStrokeDelayInMs', value: 150 }} />
                        <h6 className="font-body text-base md:text-lg font-medium text-black overflow-visible mb-4">Show Your Love To Your Pets</h6>
                    </div>
                </div>
                <div className="right-element px-8 py-10 rounded-3xl lg:flex bg-black lg:flex-col lg:items-center justify-center align-middle lg:justify-center lg:w-1/2 lg:px-8 lg:text-center">
                    <h1 className="font-heading text-3xl md:text-5xl text-white overflow-visible">Welcome Again</h1>
                    <h6 className="font-body text-base md:text-lg font-medium text-white overflow-visible mt-4">Lets Start From Where You Left...</h6>
                    <form onSubmit={formik.handleSubmit} className='mt-8 justify-center text-center w-full lg:flex lg:flex-col lg:items-center lg:justify-center'>
                        <div className="input-cover py-5 flex flex-row items-center lg:w-full lg:max-w-md lg:justify-center">
                            <span className="align-middle">
                                <MdMail className='register-icons mt-4 self-center text-white w-8 h-8 mr-4' />
                            </span>
                            <span className="w-full max-w-xs lg:max-w-md">
                                <input className=" px-4 py-3 leading-9 w-full max-w-full  bg-transparent border-solid border-b-2 focus:border-white border-semiLight outline-none font-body text-white" type="email" required name="Email" id="Email_Register" placeholder='youremail@example.com'  {...formik.getFieldProps('email')}/>
                            </span>
                        </div>
                        <div className="input-cover py-5 flex flex-row items-center lg:w-full lg:max-w-md lg:justify-center">
                            <span className="align-middle">
                                <RiLockPasswordFill className='register-icons mt-4 self-center text-white w-8 h-8 mr-4' />
                            </span>
                            <span className="w-full max-w-xs lg:max-w-md">
                                <input className=" px-4 py-3 leading-9 w-full max-w-full  bg-transparent border-solid border-b-2 focus:border-white border-semiLight outline-none font-body text-white" type="password" required name="Password" id="Password_Register" placeholder='At Least 6 Characters' {...formik.getFieldProps('password')} />
                            </span>
                        </div>
                        {error ? <p className='font-body text-base md:text-lg flex text-center font-medium text-red-700'>{error}</p> : null}
                        <NavLink to="/forgot_password" className="font-body text-base md:text-lg font-medium text-white overflow-visible mt-4">Forgot Password?</NavLink><br />
                        <input type="submit" disabled={isLoading} value={isLoading? "Logging In..." : "Login"} className='text-black  bg-white font-light px-8 py-3 rounded-full font-body border-[1px] border-white border-solid hover:text-white hover:bg-transparent duration-200 ease-in-out mt-2 w-full lg:w-1/4' id='Submit' />
                    </form>
                    <h6 className='font-body text-base md:text-lg font-medium text-white overflow-visible mt-4'>New Here? <span><NavLink to="/register" className="font-body text-base md:text-lg font-medium text-red-700 overflow-visible mt-4 t">Register Yourself</NavLink></span></h6>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login