import { React } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { useLocation, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const ForgotEmailSent = () => {

    const location = useLocation();

    const { email } = location.state || {}; // Get the email from the navigation state
    const navigate = useNavigate()
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
                    <h1 className="font-heading text-3xl md:text-5xl text-white overflow-visible">Email Sent</h1>
                    <h6 className="font-body text-base md:text-lg font-medium text-white overflow-visible mt-4">{`We've sent you a password reset link to `} <span className='font-body text-base md:text-lg font-semibold text-green-600 overflow-visible mt-4 '>{email}</span> {`Please check your inbox. ✨✨`}</h6>
                    <button
                        value="Return to Login"
                        onClick={() => navigate('/login')}
                        className='text-black bg-white px-8 py-3 w-full md:w-1/2 rounded-full font-body border-[1px] border-white hover:text-white hover:bg-transparent mt-2'>
                        Return to Login
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ForgotEmailSent