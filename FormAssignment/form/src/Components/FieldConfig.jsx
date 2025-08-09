import React, { useState } from 'react';
import { ArrowUp, ArrowDown, Trash2 } from 'lucide-react';
import DerivedFieldConfig from './DerivedFieldConfig';
import ValidationConfig from './ValidationConfig';

const FieldConfig = ({ field, onChange, allFields, onDelete, onMoveUp, onMoveDown, canMoveUp, canMoveDown }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const fieldTypes = [
    { value: 'text', label: 'Text' },
    { value: 'number', label: 'Number' },
    { value: 'textarea', label: 'Textarea' },
    { value: 'select', label: 'Select' },
    { value: 'radio', label: 'Radio' },
    { value: 'checkbox', label: 'Checkbox' },
    { value: 'date', label: 'Date' }
  ];

  const updateField = (updates) => {
    onChange({ ...field, ...updates });
  };

  const updateValidations = (validationUpdates) => {
    updateField({
      validations: { ...field.validations, ...validationUpdates }
    });
  };

  const updateDerivedConfig = (configUpdates) => {
    updateField({
      derivedConfig: { ...field.derivedConfig, ...configUpdates }
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-medium">Field Configuration</h3>
        <div className="flex space-x-2">
          <button
            onClick={onMoveUp}
            disabled={!canMoveUp}
            className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
          <button
            onClick={onMoveDown}
            disabled={!canMoveDown}
            className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-1 text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Field Type</label>
            <select
              value={field.type}
              onChange={(e) => updateField({ type: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {fieldTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Label</label>
            <input
              type="text"
              value={field.label || ''}
              onChange={(e) => updateField({ label: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={field.required || false}
              onChange={(e) => updateField({ required: e.target.checked })}
              className="mr-2"
            />
            Required Field
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={field.isDerived || false}
              onChange={(e) => updateField({ isDerived: e.target.checked })}
              className="mr-2"
            />
            Derived Field
          </label>
        </div>

        {field.isDerived && (
          <DerivedFieldConfig
            field={field}
            allFields={allFields}
            onUpdate={updateDerivedConfig}
          />
        )}

        {!field.isDerived && (
          <div>
            <label className="block text-sm font-medium mb-1">Default Value</label>
            <input
              type="text"
              value={field.defaultValue || ''}
              onChange={(e) => updateField({ defaultValue: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {(field.type === 'select' || field.type === 'radio') && (
          <div>
            <label className="block text-sm font-medium mb-1">Options (one per line)</label>
            <textarea
              value={field.options?.join('\n') || ''}
              onChange={(e) => updateField({ options: e.target.value.split('\n').filter(opt => opt.trim()) })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          {showAdvanced ? 'Hide' : 'Show'} Advanced Validations
        </button>

        {showAdvanced && (
          <ValidationConfig
            validations={field.validations || {}}
            onUpdate={updateValidations}
          />
        )}
      </div>
    </div>
  );
};

export default FieldConfig;