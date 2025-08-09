import React from 'react';
import { Plus, Eye, FileText } from 'lucide-react';

const Navigation = ({ currentPage, onNavigate }) => {
  const navItems = [
    { key: 'create', label: 'Create Form', icon: Plus },
    { key: 'preview', label: 'Preview', icon: Eye },
    { key: 'myforms', label: 'My Forms', icon: FileText }
  ];

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-xl font-bold text-gray-900">Form Builder</h1>
          <div className="flex space-x-1">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  onClick={() => onNavigate(item.key)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    currentPage === item.key
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;