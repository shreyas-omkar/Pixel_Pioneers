import React from 'react'
import { useNavigate } from 'react-router-dom'
import TestimonialCarousel from './Carousel';



const Home = () => {
    const handleCategoryClick = (category) => {
        navigate(`/products?category=${category}`);
    };

    const navigate = useNavigate()
    return (
        <div className='h-[100vh-5rem] flex flex-col'>
            <div className="flex flex-col md:flex-row w-full my-12">
                <div className="w-full md:w-1/2 px-4 justify-center flex">
                    <img src='https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg' width={100} height={100} alt="" className='rounded-full flex self-center w-[90%] h-[auto]  object-cover' />
                </div>
                <div className="right w-full md:w-1/2 mt-8 md:mt-0  flex justify-center items-center">
                    <div className="text-center">
                        <h1 className="font-heading h-auto text-3xl md:text-4xl overflow-visible">
                            Your <span className='font-body text-4xl md:text-5xl font-semibold'>Pet's Health,</span><br /><span className='font-body text-4xl md:text-5xl font-semibold'>Our Priority!</span>
                        </h1>
                        <p className="font-body mt-4 text-base">Connect with Vets, Shop Meds, Care with Love</p>
                        <button className="text-white mt-4 bg-black font-light px-4 py-3 rounded-full font-body border-[1px] border-black border-solid hover:text-black hover:bg-transparent duration-200 ease-in-out" id='scroll_btn' onClick={() => navigate('/products')}>
                            Checkout Our Products
                        </button>
                    </div>
                </div>
            </div>
            <h1 className='text-6xl font-heading text-center md:mt-24 mt-16 md:mb-16 mb-8'>Categories</h1>
            <div className="product-categories flex flex-col md:flex-row justify-center items-center gap-8">
                <div
                    className="for-dogs h-[200px] flex flex-col text-center my-8 border border-black rounded-md cursor-pointer"
                    onClick={() => handleCategoryClick("dog")}
                >
                    <img
                        width={120}
                        src="https://images.pexels.com/photos/220938/pexels-photo-220938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="Dogs"
                    />
                    <h2 className="font-body text-lg font-semibold">For Dogs</h2>
                </div>
                <div
                    className="for-cats h-[200px] flex flex-col text-center my-8 border border-black rounded-md cursor-pointer"
                    onClick={() => handleCategoryClick("cat")}
                >
                    <img
                        width={150}
                        src="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="Cats"
                    />
                    <h2 className="font-body text-lg font-semibold">For Cats</h2>
                </div>
            </div>
            <div className='flex flex-col align-middle items-center justify-center'>
                <h1 className='text-6xl font-heading text-center md:mt-24 mt-16 md:mb-16 mb-8'>Your Pet Is Need</h1>
                <div className="left">
                    <div class="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

                        <div>
                            <ul class="space-y-4">
                                <li class="p-4  border rounded-2xl border-black">
                                    <h3 class="text-xl font-heading font-semibold text-gray-800">1. Change in Eating Habits</h3>
                                    <p class="mt-2 font-body text-gray-600">
                                        If your pet suddenly refuses to eat or shows excessive appetite, it could indicate an underlying issue.
                                    </p>
                                </li>
                                <li class="p-4  border rounded-2xl border-black">
                                    <h3 class="text-xl font-heading font-semibold text-gray-800">2. Lethargy or Low Energy</h3>
                                    <p class="mt-2 font-body text-gray-600">
                                        A sudden lack of energy or disinterest in activities may be a sign that your pet isn’t feeling well.
                                    </p>
                                </li>
                                <li class="p-4  border rounded-2xl border-black">
                                    <h3 class="text-xl font-heading font-semibold text-gray-800">3. Vomiting or Diarrhea</h3>
                                    <p class="mt-2 font-body text-gray-600">
                                        If your pet is experiencing vomiting or diarrhea, it’s important to check for signs of infection or other issues.
                                    </p>
                                </li>
                                <li class="p-4  border rounded-2xl border-black">
                                    <h3 class="text-xl font-heading font-semibold text-gray-800">4. Unusual Behavior</h3>
                                    <p class="mt-2 font-body text-gray-600">
                                        If your pet is acting unusually, such as hiding or avoiding contact, it could indicate illness or discomfort.
                                    </p>
                                </li>
                            </ul>
                        </div>

                        <div class="flex justify-center">
                            <img
                                src="https://images.pexels.com/photos/128817/pexels-photo-128817.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                alt="Sick Golden Retriever"
                                class="rounded-md shadow-md w-full h-1/2  object-cover"
                            />
                        </div>
                    </div>

                </div>
                <div className='flex flex-col mb-8'>
                    <h1 className='self-center text-6xl font-heading text-center md:mt-24 mt-16 md:mb-16 mb-8'>Don't Be Late And Regret</h1>
                    <p className='font-body text-xl mt-8 text-center'>Experienced vets can identify all the underlying problems</p>
                    <button className="text-white items-center justify-center self-center flex mt-4 bg-black font-light px-4 py-3 rounded-full font-body border-[1px] border-black border-solid hover:text-black hover:bg-transparent duration-200 ease-in-out" id='scroll_btn' onClick={() => navigate('/appointment')}>
                        Contact Vet
                    </button>
                </div>
                <div></div>
            </div>

        </div>
    )
}

export default Home