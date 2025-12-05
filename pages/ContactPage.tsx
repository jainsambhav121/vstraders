
import React, { useState } from 'react';
import { faqs, reviews } from '../data/mockData';
import Carousel from '../components/Carousel';
import { SendIcon } from '../components/icons';

const ContactPage: React.FC = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const contactDetails = {
        Email: 'vstrader418@gmail.com',
        Phone: '+91 7217619150',
        Address: 'J-3/48, Arvind Nagar, Yamuna Vihar, Shahdara, New Delhi, 110053',
    };

    return (
        <div className="container mx-auto px-4 py-8 space-y-16">
            <section className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold">Get In Touch</h1>
                <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                    We'd love to hear from you. Whether you have a question about our products, pricing, or anything else, our team is ready to answer all your questions.
                </p>
            </section>
            
            <section className="grid md:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                    <div className="space-y-4 text-lg">
                        {Object.entries(contactDetails).map(([key, value]) => (
                            <div key={key}>
                                <h3 className="font-bold">{key}:</h3>
                                <p className="text-gray-300">{value}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
                     <form className="space-y-4">
                        <input type="text" placeholder="Your Name" className="w-full bg-white/10 border border-white/20 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-white/50" />
                        <input type="email" placeholder="Your Email" className="w-full bg-white/10 border border-white/20 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-white/50" />
                        <input type="tel" placeholder="Your Phone Number" className="w-full bg-white/10 border border-white/20 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-white/50" />
                        <textarea placeholder="Your Comment" rows={4} className="w-full bg-white/10 border border-white/20 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-white/50"></textarea>
                        <button type="submit" className="w-full flex items-center justify-center gap-2 bg-white text-black font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transition-colors">
                            Send Message <SendIcon className="w-5 h-5"/>
                        </button>
                    </form>
                </div>
            </section>

            <section>
                 <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
                 <div className="max-w-3xl mx-auto space-y-4">
                     {faqs.map((faq, index) => (
                        <div key={index} className="bg-white/5 border border-white/10 rounded-lg">
                            <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full flex justify-between items-center text-left p-4 font-semibold">
                                <span>{faq.question}</span>
                                <span>{openFaq === index ? '-' : '+'}</span>
                            </button>
                            {openFaq === index && (
                                <div className="p-4 pt-0 text-gray-300">
                                    <p>{faq.answer}</p>
                                </div>
                            )}
                        </div>
                     ))}
                 </div>
            </section>
            
            <section>
                 <h2 className="text-3xl font-bold text-center mb-8">Happy Customers</h2>
                 <Carousel>
                    {reviews.map(review => (
                         <div key={review.id} className="min-w-full flex justify-center p-4">
                             <div className="bg-white/5 backdrop-blur-md p-8 rounded-lg border border-white/10 max-w-2xl text-center">
                                 <img src={review.image} alt={review.name} className="w-20 h-20 rounded-full mx-auto mb-4"/>
                                 <p className="text-lg text-gray-300 mb-4">{`"${review.comment}"`}</p>
                                 <h4 className="font-bold text-xl">{review.name}</h4>
                             </div>
                         </div>
                    ))}
                 </Carousel>
            </section>
        </div>
    );
};

export default ContactPage;
