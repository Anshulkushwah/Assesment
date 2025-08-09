import React, { useState, useEffect } from 'react';
import { Eye, Save, Plus } from 'lucide-react';
import FieldConfig from './FieldConfig';

const CreateForm = ({ onNavigate, currentForm, setCurrentForm }) => {
  const [formName, setFormName] = useState(currentForm?.name || '');
  const [fields, setFields] = useState(currentForm?.fields || []);

  // Update current form when state changes
  useEffect(() => {
    setCurrentForm({ name: formName, fields });
  }, [formName, fields, setCurrentForm]);

  const addField = () => {
    const newField = {
      id: Date.now().toString(),
      type: 'text',
      label: 'New Field',
      required: false,
      isDerived: false,
      validations: {}
    };
    setFields([...fields, newField]);
  };

  const updateField = (fieldId, updatedField) => {
    setFields(fields.map(field => 
      field.id === fieldId ? updatedField : field
    ));
  };

  const deleteField = (fieldId) => {
    setFields(fields.filter(field => field.id !== fieldId));
  };

  const moveField = (fieldId, direction) => {
    const currentIndex = fields.findIndex(field => field.id === fieldId);
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    if (newIndex >= 0 && newIndex < fields.length) {
      const newFields = [...fields];
      const [movedField] = newFields.splice(currentIndex, 1);
      newFields.splice(newIndex, 0, movedField);
      setFields(newFields);
    }
  };

  const saveForm = () => {
    if (!formName.trim()) {
      alert('Please enter a form name');
      return;
    }
    
    const savedForms = JSON.parse(sessionStorage.getItem('savedForms') || '[]');
    const formToSave = {
      id: Date.now().toString(),
      name: formName,
      fields,
      createdAt: new Date().toISOString()
    };
    
    savedForms.push(formToSave);
    sessionStorage.setItem('savedForms', JSON.stringify(savedForms));
    
    alert('Form saved successfully!');
    setFormName('');
    setFields([]);
  };

  const previewForm = () => {
    onNavigate('preview');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Create New Form</h2>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Enter form name"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={previewForm}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </button>
          <button
            onClick={saveForm}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Form
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <FieldConfig
            key={field.id}
            field={field}
            onChange={(updatedField) => updateField(field.id, updatedField)}
            allFields={fields}
            onDelete={() => deleteField(field.id)}
            onMoveUp={() => moveField(field.id, 'up')}
            onMoveDown={() => moveField(field.id, 'down')}
            canMoveUp={index > 0}
            canMoveDown={index < fields.length - 1}
          />
        ))}
        
        <button
          onClick={addField}
          className="flex items-center justify-center w-full py-4 border-2 border-dashed border-gray-300 rounded-md text-gray-600 hover:border-blue-400 hover:text-blue-600"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Field
        </button>
      </div>
    </div>
  );
};

export default CreateForm;