import React, { useState } from 'react';
import { Plus, Trash2, FileText, HelpCircle, Globe } from 'lucide-react';
import { useAdminFeaturesStore } from '../../store/useAdminFeaturesStore';
import { Button } from '../../components/ui/Button';
import toast from 'react-hot-toast';

export const AdminContent = () => {
  const { faqs, addFAQ, deleteFAQ } = useAdminFeaturesStore();
  const [activeTab, setActiveTab] = useState<'faq' | 'seo'>('faq');
  
  const [newFAQ, setNewFAQ] = useState({ question: '', answer: '' });

  const handleAddFAQ = (e: React.FormEvent) => {
    e.preventDefault();
    addFAQ({
      id: Math.random().toString(36).substr(2, 9),
      ...newFAQ
    });
    setNewFAQ({ question: '', answer: '' });
    toast.success('FAQ added successfully');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>

      <div className="flex space-x-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('faq')}
          className={`pb-4 px-4 font-medium text-sm transition-colors relative ${
            activeTab === 'faq' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <HelpCircle size={16} /> FAQs
          </div>
          {activeTab === 'faq' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900"></span>}
        </button>
        <button
          onClick={() => setActiveTab('seo')}
          className={`pb-4 px-4 font-medium text-sm transition-colors relative ${
            activeTab === 'seo' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <Globe size={16} /> SEO Settings
          </div>
          {activeTab === 'seo' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900"></span>}
        </button>
      </div>

      {activeTab === 'faq' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4">Add New FAQ</h3>
              <form onSubmit={handleAddFAQ} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                  <input
                    type="text"
                    required
                    value={newFAQ.question}
                    onChange={(e) => setNewFAQ({ ...newFAQ, question: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                  <textarea
                    required
                    rows={4}
                    value={newFAQ.answer}
                    onChange={(e) => setNewFAQ({ ...newFAQ, answer: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <Button type="submit" className="w-full">Add FAQ</Button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start gap-4">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">{faq.question}</h4>
                  <p className="text-gray-600 text-sm">{faq.answer}</p>
                </div>
                <button 
                  onClick={() => deleteFAQ(faq.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-2xl bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg mb-6">Global SEO Configuration</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
              <input
                type="text"
                defaultValue="VSTRADERS | Premium Home Furnishings"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <p className="text-xs text-gray-500 mt-1">Recommended length: 50-60 characters</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
              <textarea
                rows={3}
                defaultValue="Shop premium mattresses, pillows, and bedding at VSTRADERS. Experience luxury sleep with our high-quality home furnishing products."
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <p className="text-xs text-gray-500 mt-1">Recommended length: 150-160 characters</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Keywords</label>
              <input
                type="text"
                defaultValue="mattress, pillow, bedding, home decor, luxury sleep"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <Button onClick={() => toast.success('SEO settings saved')}>Save Changes</Button>
          </div>
        </div>
      )}
    </div>
  );
};
