import React from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
    const navigate = useNavigate();
    /* Checks The Width Of The Browser */
    return (
        <div>
            <div className="bg-black pt-24">
                <div className="partition-footer" />
                <div className="cover-footer">
                    <div className="flex flex-col md:flex-row justify-between px-24 align-middle">
                        <div className="left-element">
                            <img src="" alt="" srcset="" />
                        </div>
                        <div className="right-element text-center flex flex-col w-full">
                            <p className="text-base text-center md:text-lg font-body font-medium text-semiLight mt-8 md:mt-0">
                                Made with 🩷 for Pets
                            </p>
                        </div>
                    </div>
                    <div className="links-footer w-full mt-24 text-center">
                        <ul className='ul-footer overflow-visible '>
                            <li>
                                <NavLink to='/terms' className='font-body text-base font-medium text-white My-4 overflow-visible md:text-lg' id="footer-links">Terms & Conditions</NavLink>
                            </li>
                            <li>
                                <NavLink to='/faqs' className='font-body text-base font-medium text-white My-4 overflow-visible md:text-lg' id="footer-links">FAQs</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="copyright-section mt-24 w-full text-center overflow-visible">
                        <p className="font-heading text-lg text-semiLight" id='copyright'>Copyright received ©️ 2024</p>
                        <h4 className="font-heading text-lg text-white overflow-visible">Designed And Developed By <span className="font-body text-2xl font-bold overflow-visible text-white" >Pixel Pioneers</span></h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer