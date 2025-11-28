import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t border-gray-900">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <h2 className="text-3xl font-serif font-bold tracking-tight">
              VS<span className="text-purple-600">TRADERS</span>
            </h2>
            <p className="text-gray-400 leading-relaxed max-w-xs">
              Elevating your sleep experience with premium craftsmanship and sustainable luxury. Designed for the modern sanctuary.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-6 text-white">Explore</h4>
            <ul className="space-y-4">
              {['Our Story', 'Shop Collection', 'Blog & Insights', 'Sustainability', 'Careers'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center group">
                    <span className="w-0 group-hover:w-2 h-px bg-purple-600 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-6 text-white">Collections</h4>
            <ul className="space-y-4">
              {['Luxury Mattresses', 'Ergonomic Pillows', 'Egyptian Cotton Sheets', 'Protectors & Covers', 'New Arrivals'].map((item) => (
                <li key={item}>
                  <Link to="/shop" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center group">
                    <span className="w-0 group-hover:w-2 h-px bg-purple-600 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-6 text-white">Concierge</h4>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4 group">
                <MapPin className="text-purple-600 mt-1 group-hover:text-white transition-colors shrink-0" size={20} />
                <span className="text-gray-400">J-3/48, Arvind Nagar, Yamuna Vihar,<br />Shahdara, New Delhi, Delhi, 110053</span>
              </li>
              <li className="flex items-start space-x-4 group">
                <Phone className="text-purple-600 mt-1 group-hover:text-white transition-colors shrink-0" size={20} />
                <div className="flex flex-col">
                  <span className="text-gray-400">+91 7217619150</span>
                  <span className="text-gray-500 text-xs mt-1">Mon-Fri from 9am to 5pm.</span>
                </div>
              </li>
              <li className="flex items-center space-x-4 group">
                <Mail className="text-purple-600 group-hover:text-white transition-colors shrink-0" size={20} />
                <div className="flex flex-col">
                  <span className="text-gray-400">vstrader418@gmail.com</span>
                  <span className="text-gray-500 text-xs mt-1">Reach out to us at any time.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">&copy; 2024 VSTRADERS. All rights reserved.</p>
          <div className="flex space-x-6 text-sm text-gray-500">
            <Link to="#" className="hover:text-purple-400 transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-purple-400 transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-purple-400 transition-colors">Shipping & Returns</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
