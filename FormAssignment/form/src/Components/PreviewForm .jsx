import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import FormField from './FormField';
import validateField from './validateField';

const PreviewForm = ({ currentForm }) => {
  const [formValues, setFormValues] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});

  // Initialize form values with defaults
  useEffect(() => {
    if (currentForm?.fields) {
      const initialValues = {};
      currentForm.fields.forEach(field => {
        if (!field.isDerived && field.defaultValue) {
          initialValues[field.id] = field.defaultValue;
        }
      });
      setFormValues(initialValues);
    }
  }, [currentForm]);

  const handleFieldChange = (fieldId, value) => {
    setFormValues({ ...formValues, [fieldId]: value });
    
    // Clear errors for this field
    if (fieldErrors[fieldId]) {
      setFieldErrors({ ...fieldErrors, [fieldId]: [] });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (currentForm?.fields) {
      currentForm.fields.forEach(field => {
        if (!field.isDerived) {
          const fieldValue = formValues[field.id];
          const validationErrors = validateField(fieldValue, field);
          if (validationErrors.length > 0) {
            errors[field.id] = validationErrors;
          }
        }
      });
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Form submitted successfully!');
    }
  };

  if (!currentForm || !currentForm.fields?.length) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center py-12">
          <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">No Form to Preview</h2>
          <p className="text-gray-500">Please create a form first to see the preview.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Form Preview</h2>
        <p className="text-gray-600">{currentForm.name || 'Untitled Form'}</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        {currentForm.fields.map(field => (
          <FormField
            key={field.id}
            field={field}
            value={formValues[field.id]}
            onChange={(value) => handleFieldChange(field.id, value)}
            errors={fieldErrors[field.id] || []}
            allValues={formValues}
            allFields={currentForm.fields}
          />
        ))}

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit Form
        </button>
      </form>
    </div>
  );
};

export default PreviewForm;