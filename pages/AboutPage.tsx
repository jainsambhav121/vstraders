
import React from 'react';
import { teamMembers, reviews } from '../data/mockData';
import Carousel from '../components/Carousel';

const AboutPage: React.FC = () => {
    const socialLinks = {
        Instagram: '#', Facebook: '#', Twitter: '#', Pinterest: '#', WhatsApp: '#', YouTube: '#',
    };

    return (
        <div className="container mx-auto px-4 py-8 space-y-16">
            <section className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold">About VSTRADERS</h1>
                <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
                    We believe that comfort is not a luxury, but a necessity. VSTRADERS was founded with a simple mission: to create beautifully designed, high-quality home comfort products that enhance everyday living.
                </p>
            </section>

            <section className="grid md:grid-cols-2 gap-8 items-center">
                <div className="aspect-video md:aspect-square rounded-lg overflow-hidden">
                    <img src="https://picsum.photos/id/155/800/800" alt="Our Story" className="w-full h-full object-cover"/>
                </div>
                <div>
                    <h2 className="text-3xl font-bold mb-4">Our Story</h2>
                    <p className="text-gray-300">
                        From a small workshop to a beloved national brand, our journey has been driven by a passion for quality craftsmanship and a commitment to our customers. We started with the perfect pillow and have since expanded to a full range of products that bring comfort and style to your home.
                    </p>
                </div>
            </section>

            <section className="grid md:grid-cols-2 gap-8 items-center">
                <div className="md:order-2 aspect-video md:aspect-square rounded-lg overflow-hidden">
                    <img src="https://picsum.photos/id/165/800/800" alt="Our Vision" className="w-full h-full object-cover"/>
                </div>
                <div className="md:order-1">
                    <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                    <p className="text-gray-300">
                        Our vision is to be the most trusted name in home comfort. We aim to innovate continuously, using sustainable materials and ethical practices to create products that not only feel good but also do good for the planet.
                    </p>
                </div>
            </section>
            
            <section>
                <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                        <h3 className="text-xl font-bold mb-2">Unmatched Quality</h3>
                        <p className="text-gray-400">We use only the finest materials to ensure durability and lasting comfort.</p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                        <h3 className="text-xl font-bold mb-2">Customer-Centric</h3>
                        <p className="text-gray-400">Your satisfaction is our priority. We offer a 30-night trial and hassle-free returns.</p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                        <h3 className="text-xl font-bold mb-2">Sustainable Practices</h3>
                        <p className="text-gray-400">We are committed to eco-friendly manufacturing and packaging.</p>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {teamMembers.map(member => (
                        <div key={member.name} className="text-center bg-white/5 p-6 rounded-lg border border-white/10">
                             <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4"/>
                             <h3 className="text-xl font-bold">{member.name}</h3>
                             <p className="text-gray-400 mb-2">{member.role}</p>
                             <p className="text-gray-300 italic">{`"${member.testimonial}"`}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                 <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
                 <Carousel>
                    {reviews.map(review => (
                         <div key={review.id} className="min-w-full flex justify-center p-4">
                             <div className="bg-white/5 backdrop-blur-md p-8 rounded-lg border border-white/10 max-w-2xl text-center">
                                 <img src={review.image} alt={review.name} className="w-20 h-20 rounded-full mx-auto mb-4"/>
                                 <p className="text-lg text-gray-300 mb-4">{`"${review.comment}"`}</p>
                                 <h4 className="font-bold text-xl">{review.name}</h4>
                                 <div className="flex justify-center mt-1">{'⭐'.repeat(review.rating)}</div>
                             </div>
                         </div>
                    ))}
                 </Carousel>
            </section>

            <section className="text-center">
                <h2 className="text-3xl font-bold mb-4">Follow Us</h2>
                <div className="flex justify-center gap-6">
                    {Object.entries(socialLinks).map(([name, link]) => (
                        <a key={name} href={link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">{name}</a>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
