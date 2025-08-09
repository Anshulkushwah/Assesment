import React, { useState } from 'react';
import Navigation from './Components/Navigation';
import CreateForm from './Components/CreateForm ';
import PreviewForm from './Components/PreviewForm ';
import MyForms from './Components/MyForms';

const App = () => {
  const [currentPage, setCurrentPage] = useState('create');
  const [currentForm, setCurrentForm] = useState({ name: '', fields: [] });

  const navigate = (page) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
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