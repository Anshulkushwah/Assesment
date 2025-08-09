import React from 'react';

const DerivedFieldConfig = ({ field, allFields, onUpdate }) => {
  const availableFields = allFields.filter(f => f.id !== field.id && !f.isDerived);

  const updateFormula = (formulaUpdates) => {
    onUpdate({
      formula: { ...field.derivedConfig?.formula, ...formulaUpdates }
    });
  };

  return (
    <div className="p-3 bg-blue-50 rounded-md">
      <h4 className="font-medium mb-2">Derived Field Configuration</h4>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">Parent Fields</label>
          <select
            multiple
            value={field.derivedConfig?.parentFields || []}
            onChange={(e) => {
              const selectedFields = Array.from(e.target.selectedOptions, option => option.value);
              onUpdate({ parentFields: selectedFields });
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            {availableFields.map(f => (
              <option key={f.id} value={f.id}>{f.label}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Formula Type</label>
          <select
            value={field.derivedConfig?.formula?.type || 'age_from_dob'}
            onChange={(e) => updateFormula({ type: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="age_from_dob">Age from Date of Birth</option>
            <option value="sum">Sum of Fields</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DerivedFieldConfig;