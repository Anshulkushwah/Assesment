import React from 'react';
import calculateDerivedValue from './calculateDerivedValue';

const FormField = ({ field, value, onChange, errors, allValues, allFields }) => {
  const displayValue = field.isDerived 
    ? calculateDerivedValue(field, allValues, allFields)
    : value;

  const baseClasses = "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";
  const errorClasses = errors.length > 0 ? "border-red-500" : "border-gray-300";

  const renderInput = () => {
    if (field.isDerived) {
      return (
        <input
          type="text"
          value={displayValue || ''}
          readOnly
          className={`${baseClasses} ${errorClasses} bg-gray-100`}
        />
      );
    }

    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className={`${baseClasses} ${errorClasses}`}
          />
        );
      case 'number':
        return (
          <input
            type="number"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className={`${baseClasses} ${errorClasses}`}
          />
        );
      case 'textarea':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            rows={4}
            className={`${baseClasses} ${errorClasses}`}
          />
        );
      case 'select':
        return (
          <select
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className={`${baseClasses} ${errorClasses}`}
          >
            <option value="">Select an option</option>
            {field.options?.map((option, idx) => (
              <option key={idx} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option, idx) => (
              <label key={idx} className="flex items-center">
                <input
                  type="radio"
                  name={field.id}
                  value={option}
                  checked={value === option}
                  onChange={(e) => onChange(e.target.value)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        );
      case 'checkbox':
        return (
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={!!value}
              onChange={(e) => onChange(e.target.checked)}
              className="mr-2"
            />
            {field.label}
          </label>
        );
      case 'date':
        return (
          <input
            type="date"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className={`${baseClasses} ${errorClasses}`}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
        {field.isDerived && <span className="text-blue-500 ml-1">(Calculated)</span>}
      </label>
      {renderInput()}
      {errors.length > 0 && (
        <div className="mt-1">
          {errors.map((error, idx) => (
            <p key={idx} className="text-red-500 text-sm">{error}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormField;