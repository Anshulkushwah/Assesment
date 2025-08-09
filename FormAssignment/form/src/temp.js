ast 8 characters long');
      }
      if (!/\d/.test(value)) {
        errors.push('Password must contain at least one number');
      }
    }
  }
  
  return errors;
};

// Calculate derived field value
const calculateDerivedValue = (field, allValues, allFields) => {
  if (!field.isDerived || !field.derivedConfig) return '';
  
  try {
    const parentValues = field.derivedConfig.parentFields?.map(parentId => allValues[parentId] || '') || [];
    
    if (field.derivedConfig.formula?.type === 'age_from_dob' && parentValues[0]) {
      const birthDate = new Date(parentValues[0]);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1;
      }
      return age;
    }
    
    if (field.derivedConfig.formula?.type === 'sum') {
      return parentValues.reduce((sum, val) => sum + (Number(val) || e-100 text-blue-700'
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

// Field Configuration Component
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
    updateFieldelete}
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
              onChange={(e) => updateFie{allFields}
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:out-3">
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
            <option value=lue ? parseInt(e.target.value) : undefined })}
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

// Form Field Renderer Component
const FormField = ({ field, value, onChange, errors, allValues, allFields }) => {
  const displayValue = field.isDerived 
    ? calculateDerivedValue(fi 'textarea':
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

// Create Form Page Component
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

  const updateField = (fieldId, updarms.push(formToSave);
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
       t-blue-600"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Field
        </button>
      </div>
    </div>
  );
};

// Preview Form Page Component
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
      c-2xl mx-auto p-6">
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

// My Forms Page Component
const MyForms = ({ onNavigate, setCurlick={() => onNavigate('create')}
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
         case 'create':
        return (
          <CreateForm 
            onNavigate={navigate} 
            currentForm={currentForm}
            setCurrentForm={setCurrentForm}
          />
        );
      case 'preview':
        return <PreviewForm currentForm={currentForm} />;
      case 'myforms':
        return <MyForms onNavigate={navigate} setCurrentForm={setCurrentForm} />;
      default:
        return (
          <CreateForm 
            onNavigate={navigate} 
            currentForm={currentForm}
            setCurrentForm={setCurrentForm}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={currentPage} onNavigate={navigate} />
      {renderCurrentPage()}
    </div>
  );
};

export default App;
