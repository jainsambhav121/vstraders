import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, Package } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';

export const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="w-24 h-24 bg-black rounded-full flex items-center justify-center mx-auto"
        >
          <CheckCircle className="text-white w-12 h-12" />
        </motion.div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Order Confirmed!</h1>
          <p className="text-gray-500 text-lg">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-left space-y-4">
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-full border border-gray-200">
              <Package className="w-6 h-6 text-gray-900" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Order #TRX-8859</p>
              <p className="text-sm text-gray-500">Estimated Delivery: 3-5 Business Days</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link to="/account">
            <Button variant="outline" className="w-full sm:w-auto">
              View Order Details
            </Button>
          </Link>
          <Link to="/shop">
            <Button className="w-full sm:w-auto">
              Continue Shopping <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
