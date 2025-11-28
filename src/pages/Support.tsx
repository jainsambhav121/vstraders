import React from 'react';
import { MessageCircle, Mail, FileQuestion } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Support = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-4">How can we help?</h1>
      <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
        Find answers to common questions or contact our support team directly.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="p-6 bg-gray-50 rounded-lg text-center hover:shadow-md transition-shadow">
          <FileQuestion size={40} className="mx-auto mb-4 text-gray-900" />
          <h3 className="font-semibold text-lg mb-2">FAQ</h3>
          <p className="text-gray-500 text-sm mb-4">Browse our frequently asked questions</p>
          <Button variant="outline" size="sm">View FAQ</Button>
        </div>
        <div className="p-6 bg-gray-50 rounded-lg text-center hover:shadow-md transition-shadow">
          <MessageCircle size={40} className="mx-auto mb-4 text-gray-900" />
          <h3 className="font-semibold text-lg mb-2">Live Chat</h3>
          <p className="text-gray-500 text-sm mb-4">Chat with our support team</p>
          <Button variant="outline" size="sm">Start Chat</Button>
        </div>
        <div className="p-6 bg-gray-50 rounded-lg text-center hover:shadow-md transition-shadow">
          <Mail size={40} className="mx-auto mb-4 text-gray-900" />
          <h3 className="font-semibold text-lg mb-2">Email Support</h3>
          <p className="text-gray-500 text-sm mb-4">Get a response within 24 hours</p>
          <Button variant="outline" size="sm">Send Email</Button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            "What is your return policy?",
            "How do I track my order?",
            "Do you ship internationally?",
            "How do I care for my memory foam mattress?"
          ].map((q, i) => (
            <details key={i} className="group bg-white border border-gray-200 rounded-lg">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4">
                <span>{q}</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="text-gray-600 mt-3 group-open:animate-fadeIn p-4 pt-0">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
};
