import React from 'react';
import { MessageSquare, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useAdminFeaturesStore } from '../../store/useAdminFeaturesStore';
import { Button } from '../../components/ui/Button';
import toast from 'react-hot-toast';

export const AdminSupport = () => {
  const { tickets, updateTicketStatus } = useAdminFeaturesStore();

  const handleStatusChange = (id: string, status: any) => {
    updateTicketStatus(id, status);
    toast.success(`Ticket marked as ${status}`);
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-orange-600 bg-orange-50';
      default: return 'text-blue-600 bg-blue-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Support Center</h1>
        <div className="flex gap-3">
           <div className="flex items-center gap-2 text-sm text-gray-500">
             <span className="w-2 h-2 rounded-full bg-green-500"></span> Online
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ticket List */}
        <div className="lg:col-span-2 space-y-4">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-gray-400">#{ticket.id}</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority} Priority
                  </span>
                </div>
                <span className="text-xs text-gray-400">{ticket.date}</span>
              </div>
              
              <h3 className="font-bold text-gray-900 mb-1">{ticket.subject}</h3>
              <p className="text-sm text-gray-500 mb-4">From: {ticket.user}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    ticket.status === 'Open' ? 'bg-red-100 text-red-800' :
                    ticket.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {ticket.status === 'Open' && <AlertCircle size={12} />}
                    {ticket.status === 'In Progress' && <Clock size={12} />}
                    {ticket.status === 'Resolved' && <CheckCircle size={12} />}
                    {ticket.status}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  {ticket.status !== 'Resolved' && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleStatusChange(ticket.id, 'Resolved')}
                    >
                      Mark Resolved
                    </Button>
                  )}
                  <Button size="sm">Reply</Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">Support Overview</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Open Tickets</span>
                <span className="font-bold text-gray-900">{tickets.filter(t => t.status === 'Open').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Avg Response Time</span>
                <span className="font-bold text-gray-900">2h 15m</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Customer Satisfaction</span>
                <span className="font-bold text-green-600">4.8/5.0</span>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <MessageSquare className="text-blue-600 mb-3" size={24} />
            <h3 className="font-bold text-blue-900 mb-2">Need Help?</h3>
            <p className="text-sm text-blue-700 mb-4">Check the internal knowledge base for support guidelines.</p>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white w-full">View Guidelines</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
