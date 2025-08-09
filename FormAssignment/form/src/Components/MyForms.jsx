import React, { useState, useEffect } from 'react';
import { FileText, Trash2, Calendar, Settings } from 'lucide-react';

const MyForms = ({ onNavigate, setCurrentForm }) => {
  const [savedForms, setSavedForms] = useState([]);

  useEffect(() => {
    const forms = JSON.parse(sessionStorage.getItem('savedForms') || '[]');
    setSavedForms(forms);
  }, []);

  const openForm = (form) => {
    setCurrentForm(form);
    onNavigate('preview');
  };

  const deleteForm = (formId) => {
    if (window.confirm('Are you sure you want to delete this form?')) {
      const updatedForms = savedForms.filter(form => form.id !== formId);
      setSavedForms(updatedForms);
      sessionStorage.setItem('savedForms', JSON.stringify(updatedForms));
    }
  };

  if (savedForms.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">No Forms Created Yet</h2>
          <p className="text-gray-500 mb-4">Start building your first form to see it here.</p>
          <button
            onClick={() => onNavigate('create')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create New Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Forms</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {savedForms.map(form => (
          <div key={form.id} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold">{form.name}</h3>
              <button
                onClick={() => deleteForm(form.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="text-sm text-gray-600 mb-4">
              <div className="flex items-center mb-1">
                <Calendar className="w-4 h-4 mr-1" />
                Created: {new Date(form.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <Settings className="w-4 h-4 mr-1" />
                {form.fields.length} field{form.fields.length !== 1 ? 's' : ''}
              </div>
            </div>
            
            <button
              onClick={() => openForm(form)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              View Form
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyForms;