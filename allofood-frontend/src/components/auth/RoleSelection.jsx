import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Truck } from 'lucide-react';
import Card from '../ui/card/card';

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    navigate('/register', { state: { selectedRole: role } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Role
          </h1>
          <p className="text-gray-600 mb-8">
            Select how you want to use our platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Client Role Card */}
          <Card 
            className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-black"
            onClick={() => handleRoleSelect('client')}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-gray-100 rounded-full">
                <User className="w-12 h-12 text-gray-900" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Client</h2>
              <p className="text-gray-600 text-center">
                Browse and order from our wide selection of services
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Place orders easily</li>
                <li>• Track your deliveries</li>
                <li>• Save favorite items</li>
              </ul>
            </div>
          </Card>

          {/* Delivery Role Card */}
          <Card 
            className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-black"
            onClick={() => handleRoleSelect('delivery')}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-gray-100 rounded-full">
                <Truck className="w-12 h-12 text-gray-900" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Delivery Partner</h2>
              <p className="text-gray-600 text-center">
                Join our delivery network and start earning
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Flexible schedule</li>
                <li>• Earn competitive rates</li>
                <li>• Choose your delivery area</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;