import React from 'react'

const Appointment = () => {
  let submitted = false;
  return (
        <div>
      <div className="contact-container mb-24">
        <div className="left-element">
        <h1 className='text-6xl font-heading text-center md:mt-24 mt-16 md:mb-16 mb-8'>Book Your Appointment</h1>
        <form action="https://formsubmit.co/vet56405@gmail.com" method="POST" onSubmit={submitted = true} className='flex flex-col items-center justify-center'>
            <input type="text" name="Fullname" id="name" placeholder='Your Full Name' required className=' bg-transparent border-solid border-b-2 focus:border-black border-semiLight outline-none font-body text-black'/><br />
            <input type="email" name='Email' id="email" placeholder='Your Email Id' required className=' bg-transparent border-solid border-b-2 focus:border-black border-semiLight outline-none font-body text-black'/><br />
            <input type="tel" name='Mobile' id="mobile" placeholder='Your Mobile Number' className=' bg-transparent border-solid border-b-2 focus:border-black border-semiLight outline-none font-body text-black'/><br />
            <textarea id="message" name='Message' cols="30" rows="10" placeholder='Your Issue' required className='px-2 bg-transparent border-solid border-2 focus:border-black border-semiLight outline-none font-body text-black'></textarea><br />
            <input type="hidden" name="_captcha" value="false" className=' bg-transparent border-solid border-b-2 focus:border-black border-semiLight outline-none font-body text-black'></input>
            <input type="submit" value="Submit" className='text-white bg-black font-light px-8 py-3 rounded-xl font-body border-[1px] border-black border-solid hover:text-black  hover:bg-transparent duration-200 ease-in-out mt-2' disabled="" id='submit'/>
            <input type="hidden" name="_template" value="table"></input>
            <input type="hidden" name="_autoresponse" value="Your Appointment has been successfully booked. We will reach out to you on a call."></input>
            <input type="hidden" name="_next" value="http://localhost:5173/thanks"></input>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Appointment