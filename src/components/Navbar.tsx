import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calculator, Languages, ArrowRightLeft, Moon, Sun } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  darkMode: boolean;
  onThemeToggle: () => void;
}

const Navbar = ({ currentTab, onTabChange, darkMode, onThemeToggle }: NavbarProps) => {
  const tabs = [
    { id: 'calculator', label: 'Calculator', icon: Calculator },
    { id: 'translator', label: 'Translator', icon: Languages },
    { id: 'converter', label: 'Converter', icon: ArrowRightLeft },
  ];

  return (
    <Card className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-background/90 backdrop-blur-md border-2 shadow-lg">
      <div className="flex items-center gap-2 p-2">
        {/* App Logo */}
        <div className="flex items-center gap-2 px-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
            <Calculator className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-sm hidden sm:block">YUGFMSEREG</span>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-1 bg-muted/50 rounded-lg p-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            
            return (
              <Button
                key={tab.id}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 text-xs ${
                  isActive 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </Button>
            );
          })}
        </div>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onThemeToggle}
          className="h-8 w-8"
        >
          {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>
    </Card>
  );
};

export default Navbar;