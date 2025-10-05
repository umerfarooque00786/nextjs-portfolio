'use client';

import React, { useState } from 'react';
import { Card } from './Card';
import { Button } from './Button';

export const DemoCredentials: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const credentials = [
    {
      type: 'Admin Account',
      email: 'admin@portfolio.com',
      password: 'admin123',
      description: 'Full access to admin dashboard with management features',
      color: 'blue'
    },
    {
      type: 'User Account',
      email: 'user@portfolio.com',
      password: 'user123',
      description: 'Standard user dashboard with personal features',
      color: 'green'
    },
    {
      type: 'Demo Account',
      email: 'demo@test.com',
      password: 'demo123',
      description: 'Test account for demonstration purposes',
      color: 'purple'
    }
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={() => setIsVisible(!isVisible)}
        className="mb-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        size="sm"
      >
        {isVisible ? 'Hide' : 'Show'} Demo Credentials
      </Button>

      {isVisible && (
        <Card variant="glass" className="p-4 w-80 max-h-96 overflow-y-auto">
          <h3 className="text-lg font-bold text-white mb-3">Demo Login Credentials</h3>
          <div className="space-y-3">
            {credentials.map((cred, index) => (
              <div key={index} className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-2 h-2 rounded-full bg-${cred.color}-400`}></div>
                  <h4 className="font-semibold text-white text-sm">{cred.type}</h4>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Email:</span>
                    <span className="text-white font-mono">{cred.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Password:</span>
                    <span className="text-white font-mono">{cred.password}</span>
                  </div>
                  <p className="text-gray-300 text-xs mt-2">{cred.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-yellow-300 text-xs">
              💡 These are demo credentials for testing purposes only.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};
