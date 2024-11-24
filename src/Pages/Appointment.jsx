import React from 'react'

const Appointment = () => {
  let submitted = false;
  return (
        <div>
      <div className="contact-container mb-24">
        <h1 className='text-6xl font-heading text-center md:mt-24 mt-16 md:mb-16 mb-8'>Book Your Appointment</h1>
        <div className="left-element flex md:flex-row flex-col">
        <div className='  left-element hidden lg:flex  align-middle items-center justify-center  w-1/2 py-12 px-8'>
          <img className='rounded-3xl' src="https://images.pexels.com/photos/7469502/pexels-photo-7469502.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" srcset="" />
        </div>
        <div className='md:w-1/2 w-full flex flex-col items-center justify-center'>
        <form action="https://formsubmit.co/vet56405@gmail.com" method="POST" onSubmit={submitted = true} className='flex w-full flex-col items-center gap-6 justify-center'>
            <input type="text" name="Fullname" id="name" placeholder='Your Full Name' required className='py-3 pl-4 w-1/2 bg-transparent border-solid border-2 focus:border-black border-semiLight outline-none font-body text-black'/><br />
            <input type="email" name='Email' id="email" placeholder='Your Email Id' required className='py-3 pl-4 w-1/2 bg-transparent border-solid border-2 focus:border-black border-semiLight outline-none font-body text-black'/><br />
            <input type="tel" name='Mobile' id="mobile" placeholder='Your Mobile Number' className='py-3 pl-4 w-1/2 bg-transparent border-solid border-2 focus:border-black border-semiLight outline-none font-body text-black'/><br />
            <textarea id="message" name='Message' cols="30" rows="10" placeholder='Your Issue' required className='w-1/2 px-2 bg-transparent border-solid border-2 focus:border-black border-semiLight outline-none font-body text-black'></textarea><br />
            <input type="hidden" name="_captcha" value="false" className=' bg-transparent border-solid border-b-2 focus:border-black border-semiLight outline-none font-body text-black'></input>
            <input type="submit" value="Submit" className='text-white bg-black font-light px-8 py-3 rounded-xl font-body border-[1px] border-black border-solid hover:text-black  hover:bg-transparent duration-200 ease-in-out mt-2' disabled="" id='submit'/>
            <input type="hidden" name="_template" value="table"></input>
            <input type="hidden" name="_autoresponse" value="Your Appointment has been successfully booked. We will reach out to you on a call."></input>
            <input type="hidden" name="_next" value="http://localhost:5173/thanks"></input>
          </form>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Appointment