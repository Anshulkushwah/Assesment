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
      return parentValues.reduce((sum, val) => sum + (Number(val) || 0), 0);
    }
    
    return '';
  } catch (error) {
    console.error('Error calculating derived value:', error);
    return 'Error';
  }
};

export default calculateDerivedValue;