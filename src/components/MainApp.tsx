import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Calculator from './Calculator';
import EnglishHindiTranslator from './EnglishHindiTranslator';
import UnitConverter from './UnitConverter';

const MainApp = () => {
  const [currentTab, setCurrentTab] = useState('calculator');
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const renderCurrentTab = () => {
    switch (currentTab) {
      case 'calculator':
        return <Calculator />;
      case 'translator':
        return <EnglishHindiTranslator />;
      case 'converter':
        return <UnitConverter />;
      default:
        return <Calculator />;
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Premium 3D Floating Shapes */}
      <div className="floating-shapes">
        <div className="shape-1"></div>
        <div className="shape-2"></div>
        <div className="shape-3"></div>
      </div>

      {/* Navigation */}
      <Navbar 
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        darkMode={darkMode}
        onThemeToggle={() => setDarkMode(!darkMode)}
      />

      {/* Main Content */}
      <div className="pt-20 pb-8">
        {renderCurrentTab()}
      </div>
    </div>
  );
};

export default MainApp;