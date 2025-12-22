import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router';
import LoadingSpinner from '../Shared/LoadingSpinner';
import { HiOutlineArrowNarrowRight, HiStar } from 'react-icons/hi';
import { BiTimeFive } from 'react-icons/bi';
import Container from '../Shared/Container';

const TopMeals = () => {
    const { data: meals = [], isLoading } = useQuery({
        queryKey: ["top-meals-premium"],
        queryFn: async () => {
            const result = await axios(`${import.meta.env.VITE_API_URL}/latest-meals`);
            return result.data;
        },
    });

    // Filtering top 3 based on rating
    const topThreeMeals = [...meals]
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 3);

    if (isLoading) return <LoadingSpinner />;

    return (
    <Container>
                <section className="py-24 bg-[#FAFAFA] overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="w-12 h-[2px] bg-amber-500"></span>
                            <span className="text-amber-600 font-bold uppercase tracking-[0.2em] text-xs">Chef's Special</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">
                            The Finest Flavors <br /> 
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">You Must Try.</span>
                        </h2>
                    </div>
                    <Link to="/meals" className="group flex items-center gap-3 font-bold text-gray-900 hover:text-amber-600 transition-all">
                        View Full Menu <HiOutlineArrowNarrowRight className="text-2xl group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {topThreeMeals.map((meal, index) => (
                        <div 
                            key={meal._id} 
                            className="relative group bg-white rounded-[2.5rem] p-5 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 mt-10 md:mt-0"
                        >
                            {/* Image Container */}
                            <div className="relative -mt-16 mb-6 overflow-hidden rounded-[2rem] shadow-xl">
                                <img 
                                    className="w-full h-[280px] object-cover transform group-hover:scale-110 transition-transform duration-700" 
                                    src={meal.foodImage} 
                                    alt={meal.foodName} 
                                />
                                {/* Price Overlay */}
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl font-black text-gray-900 shadow-sm">
                                    ${meal.price}
                                </div>
                            </div>

                            {/* Info Section */}
                            <div className="px-2 pb-4">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-xs font-bold">
                                        <HiStar className="text-sm" /> {meal.rating || "5.0"}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
                                        <BiTimeFive className="text-lg" /> {meal.estimatedDeliveryTime || "25m"}
                                    </div>
                                </div>

                                <h3 className="text-2xl font-extrabold text-gray-800 mb-2 group-hover:text-amber-600 transition-colors">
                                    {meal.foodName}
                                </h3>
                                
                                <p className="text-gray-500 text-sm line-clamp-2 mb-6 leading-relaxed">
                                    {meal.longDescription || "Indulge in our signature dish crafted with premium ingredients and authentic secret spices."}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                    <div className="flex items-center gap-2">
                                        <img src={meal.chefImage} className="w-8 h-8 rounded-full border-2 border-amber-200" alt="" />
                                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter">Chef {meal.chefName}</span>
                                    </div>
                                    <Link 
                                        to={`/meal/${meal._id}`}
                                        className="bg-gray-900 text-white p-3 rounded-2xl group-hover:bg-amber-500 transition-all shadow-lg shadow-gray-200"
                                    >
                                        <HiOutlineArrowNarrowRight className="text-xl" />
                                    </Link>
                                </div>
                            </div>

                            {/* Floating Decorative Number */}
                            <span className="absolute -bottom-6 -left-4 text-8xl font-black text-gray-50 -z-10 group-hover:text-amber-50 transition-colors">
                                0{index + 1}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    </Container>
    );
};

export default TopMeals;