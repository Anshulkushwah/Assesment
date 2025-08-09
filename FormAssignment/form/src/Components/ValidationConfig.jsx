import React from 'react';

const ValidationConfig = ({ validations, onUpdate }) => {
  return (
    <div className="space-y-3 p-3 bg-gray-50 rounded-md">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">Min Length</label>
          <input
            type="number"
            value={validations.minLength || ''}
            onChange={(e) => onUpdate({ minLength: e.target.value ? parseInt(e.target.value) : undefined })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Max Length</label>
          <input
            type="number"
            value={validations.maxLength || ''}
            onChange={(e) => onUpdate({ maxLength: e.target.value ? parseInt(e.target.value) : undefined })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
      
      <div className="flex space-x-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={validations.email || false}
            onChange={(e) => onUpdate({ email: e.target.checked })}
            className="mr-2"
          />
          Email validation
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={validations.password || false}
            onChange={(e) => onUpdate({ password: e.target.checked })}
            className="mr-2"
          />
          Password validation
        </label>
      </div>
    </div>
  );
};

export default ValidationConfig;