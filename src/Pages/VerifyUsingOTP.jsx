import React, { useEffect } from 'react'
import { useFormik } from 'formik';
import { TypeAnimation } from 'react-type-animation';
import { Toaster, toast } from 'react-hot-toast';
import axios from "axios";
import { FaShieldAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const VerifyUsingOTP = () => {

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Furry Friend | Verify Email";
    }, []);

    const formik = useFormik({
        initialValues: {
            verificationToken: '',
        },
        onSubmit: async (values) => {
            try {
                const res = await axios.post('http://localhost:5000/user/verifyEmail',
                    { verificationToken: values.verificationToken },  // Wrap in an object
                    {withCredentials: true}, 
                );
                if (res.data) {
                    formik.resetForm();
                    await toast.success('Your email has been verified successfully.');
                    navigate('/dashboard'); // Navigate to Dashboard page
                } else {
                    toast.error('Failed to verify email! Please try again.');
                }
            } catch (err) {
                console.log(err);
                toast.error('An error occurred during email verification.');
            }
        }
    });
    return (
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

                {/* Right Side - OTP Verification Form (Styled) */}

                <div className=" py-12 right-element text-center flex flex-col items-center justify-center w-full  text-white lg:w-1/2 lg:px-8 lg:text-center bg-black p-8 rounded-3xl">
                    <h1 className="font-heading text-3xl overflow-visible md:text-5xl text-white py-8">Verify using OTP</h1>
                    <p className="font-body text-base md:text-lg font-medium text-white pb-6">Please enter the 6-digit OTP sent to your registered email address.</p>
                    <form onSubmit={formik.handleSubmit} className='flex flex-col'>
                    <div className="input-cover py-5 flex flex-row items-center w-full max-w-md">
                            <FaShieldAlt className='register-icons text-white text-3xl mr-4' />
                            <input
                                className="px-4 py-3 leading-9 w-full max-w-full  bg-transparent border-solid border-b-2 focus:border-white border-semiLight outline-none font-body text-white"
                                type="text"
                                maxLength={6}
                                name="verificationToken"
                                id="verification_Token"
                                placeholder='Enter OTP'
                                {...formik.getFieldProps('verificationToken')}
                                required
                            />
                        </div>
                        <input
                            type="submit"
                            value="Verify"
                            className='text-black bg-white font-light px-8 py-3 my-8 rounded-full border border-white hover:text-white hover:bg-transparent transition duration-300 ease-in-out w-full max-w-md lg:w-auto lg:px-8 lg:text-lg flex items-center justify-center'
                            id='Submit'
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default VerifyUsingOTP