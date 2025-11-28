import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-tight">VSTRADERS</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium home furnishings for your perfect sanctuary. Quality mattresses, pillows, and bedding delivered to your door.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Shop</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/shop?category=mattresses" className="hover:text-white transition-colors">Mattresses</Link></li>
              <li><Link to="/shop?category=pillows" className="hover:text-white transition-colors">Pillows</Link></li>
              <li><Link to="/shop?category=bedsheets" className="hover:text-white transition-colors">Bedsheets</Link></li>
              <li><Link to="/shop?category=protectors" className="hover:text-white transition-colors">Protectors</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Support</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/support" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/orders" className="hover:text-white transition-colors">Track Order</Link></li>
              <li><Link to="/returns" className="hover:text-white transition-colors">Returns & Refunds</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="mt-0.5 shrink-0" />
                <span>123 Furniture Lane, Design District, NY 10001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="shrink-0" />
                <span>support@vstraders.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} VSTRADERS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
