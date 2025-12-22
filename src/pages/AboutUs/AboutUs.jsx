import React from 'react';
import { HiOutlineBadgeCheck, HiOutlineTruck, HiOutlineUserGroup, HiOutlineLightBulb } from 'react-icons/hi';
import Container from '../../components/Shared/Container';

const AboutUs = () => {
    const stats = [
        { id: 1, label: 'Happy Customers', value: '12K+', icon: <HiOutlineUserGroup /> },
        { id: 2, label: 'Expert Chefs', value: '25+', icon: <HiOutlineLightBulb /> },
        { id: 3, label: 'Daily Deliveries', value: '500+', icon: <HiOutlineTruck /> },
        { id: 4, label: 'Quality Awards', value: '10+', icon: <HiOutlineBadgeCheck /> },
    ];

    return (
        <div className="pb-20">
            {/* Header Section */}
            <div className="bg-amber-500 py-20 text-white text-center">
                <Container>
                    <h1 className="text-5xl md:text-7xl font-black mb-4">About Our Kitchen</h1>
                    <p className="text-amber-100 text-lg max-w-2xl mx-auto font-medium">
                        Elevating your dining experience with passion, premium ingredients, and a dash of love.
                    </p>
                </Container>
            </div>

            <Container>
                {/* Story Section */}
                <div className="flex flex-col lg:flex-row items-center gap-16 py-20">
                    <div className="lg:w-1/2 relative">
                        <div className="absolute -top-6 -left-6 w-32 h-32 bg-amber-100 rounded-full -z-10 animate-pulse"></div>
                        <img 
                            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800" 
                            alt="Chef cooking" 
                            className="rounded-[3rem] shadow-2xl border-8 border-white"
                        />
                        <div className="absolute -bottom-10 -right-6 bg-white p-8 rounded-3xl shadow-xl hidden md:block border border-amber-50">
                            <p className="text-4xl font-black text-amber-600">10+</p>
                            <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">Years of Excellence</p>
                        </div>
                    </div>

                    <div className="lg:w-1/2 space-y-6">
                        <span className="text-amber-600 font-black uppercase tracking-widest text-sm italic">Our Story</span>
                        <h2 className="text-4xl font-black text-gray-900 leading-tight">
                            Bringing the Finest Flavors <br /> 
                            To Your Table Since 2014.
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            Started as a small family kitchen, **MealMaster** has grown into a community of food lovers. We believe that great food shouldn't just be a luxury—it should be an everyday joy.
                        </p>
                        <p className="text-gray-500">
                            Our team of expert chefs meticulously selects fresh, local ingredients to craft meals that don't just fill your stomach but also nourish your soul. From our signature pastas to our locally-inspired dishes, every plate tells a story of tradition and innovation.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                            <div className="flex items-center gap-3">
                                <div className="text-amber-500 text-2xl">✔</div>
                                <span className="font-bold text-gray-700">100% Organic Ingredients</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-amber-500 text-2xl">✔</div>
                                <span className="font-bold text-gray-700">Fastest Home Delivery</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistics Section */}
                <div className="bg-gray-900 rounded-[4rem] p-10 md:p-16 my-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
                        {stats.map((stat) => (
                            <div key={stat.id} className="text-center group">
                                <div className="text-amber-500 text-4xl mb-4 flex justify-center group-hover:scale-110 transition-transform">
                                    {stat.icon}
                                </div>
                                <h3 className="text-3xl md:text-5xl font-black text-white mb-2">{stat.value}</h3>
                                <p className="text-gray-400 font-medium text-sm uppercase tracking-widest">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mission & Vision Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-20">
                    <div className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all">
                        <h3 className="text-2xl font-black mb-4 flex items-center gap-3">
                             <span className="bg-amber-500 w-2 h-8 rounded-full"></span> Our Mission
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            To democratize high-quality dining by making gourmet meals accessible, affordable, and convenient for everyone, without compromising on taste or health standards.
                        </p>
                    </div>
                    <div className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all">
                        <h3 className="text-2xl font-black mb-4 flex items-center gap-3">
                             <span className="bg-gray-900 w-2 h-8 rounded-full"></span> Our Vision
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            To become the world's most trusted food platform, fostering a global community where chefs and food enthusiasts connect through the universal language of delicious food.
                        </p>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default AboutUs;