import React from 'react'
import { useNavigate } from 'react-router-dom'


const Home = () => {
    const navigate = useNavigate()
    return (
        <div className='h-[100vh-5rem]'>
            <div className="flex flex-col md:flex-row w-full my-12">
                <div className="w-full md:w-1/2 px-4 justify-center flex">
                    <img src='https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg' width={100} height={100} alt="" className='rounded-full flex self-center w-[90%] h-[auto]  object-cover' />
                </div>
                <div className="right w-full md:w-1/2 mt-8 md:mt-0  flex justify-center items-center">
                    <div className="text-center">
                        <h1 className="font-heading h-auto text-3xl md:text-4xl overflow-visible">
                            All Your <span className='font-body text-4xl md:text-5xl font-semibold'>Pet Needs,</span><br /><span className='font-body text-4xl md:text-5xl font-semibold'>Delivered</span> by <span className="font-body text-4xl md:text-5xl font-semibold">Us</span> !
                        </h1>
                        <p className="font-body mt-4 text-base">Wagging Tails, Happy Trails</p>
                        <button className="text-white mt-4 bg-black font-light px-4 py-3 rounded-full font-body border-[1px] border-black border-solid hover:text-black hover:bg-transparent duration-200 ease-in-out" id='scroll_btn' onClick={() => navigate('/products')}>
                            Checkout Our Products
                        </button>  
                    </div>
                </div>
            </div>
            <h1 className='text-6xl font-heading text-center md:mt-24 mt-16 md:mb-16 mb-8'>Categories</h1>
            <div className="product-categories flex flex-col md:flex-row justify-center items-center gap-8">
                <div className="for-dogs h-[200px] flex flex-col text-center my-8 border border-black rounded-md  cursor-pointer" onClick={() => {navigate('/products')}}>
                    <img width={120} src="https://images.pexels.com/photos/220938/pexels-photo-220938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" srcset="" />
                    <h2 className='font-body  text-lg font-semibold'>For Dogs</h2>
                </div>
                <div className="for-cats h-[200px] flex flex-col text-center my-8 border border-black rounded-md cursor-pointer" onClick={() => {navigate('/products')}}>
                    <img width={150 } src="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" srcset="" />
                    <h2 className='font-body  text-lg font-semibold'>For Cats</h2>
                </div>
            </div>
        </div>
    )
}

export default Home