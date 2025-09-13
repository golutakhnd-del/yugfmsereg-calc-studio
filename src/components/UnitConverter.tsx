import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowRightLeft, Calculator, TrendingUp, Thermometer, Ruler, Weight, Clock, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const UnitConverter = () => {
  const [activeCategory, setActiveCategory] = useState('length');
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [result, setResult] = useState('');
  const { toast } = useToast();

  const categories = {
    length: {
      icon: Ruler,
      name: 'Length',
      units: {
        'mm': { name: 'Millimeter', factor: 0.001 },
        'cm': { name: 'Centimeter', factor: 0.01 },
        'm': { name: 'Meter', factor: 1 },
        'km': { name: 'Kilometer', factor: 1000 },
        'in': { name: 'Inch', factor: 0.0254 },
        'ft': { name: 'Foot', factor: 0.3048 },
        'yd': { name: 'Yard', factor: 0.9144 },
        'mi': { name: 'Mile', factor: 1609.34 }
      }
    },
    weight: {
      icon: Weight,
      name: 'Weight',
      units: {
        'mg': { name: 'Milligram', factor: 0.000001 },
        'g': { name: 'Gram', factor: 0.001 },
        'kg': { name: 'Kilogram', factor: 1 },
        'oz': { name: 'Ounce', factor: 0.0283495 },
        'lb': { name: 'Pound', factor: 0.453592 },
        'ton': { name: 'Ton', factor: 1000 }
      }
    },
    temperature: {
      icon: Thermometer,
      name: 'Temperature',
      units: {
        'c': { name: 'Celsius', factor: 1 },
        'f': { name: 'Fahrenheit', factor: 1 },
        'k': { name: 'Kelvin', factor: 1 }
      }
    },
    currency: {
      icon: TrendingUp,
      name: 'Currency',
      units: {
        'inr': { name: 'Indian Rupee (₹)', factor: 1 },
        'usd': { name: 'US Dollar ($)', factor: 83.25 },
        'eur': { name: 'Euro (€)', factor: 90.15 },
        'gbp': { name: 'British Pound (£)', factor: 105.50 },
        'jpy': { name: 'Japanese Yen (¥)', factor: 0.56 },
        'cad': { name: 'Canadian Dollar', factor: 61.20 },
        'aud': { name: 'Australian Dollar', factor: 54.80 }
      }
    },
    time: {
      icon: Clock,
      name: 'Time',
      units: {
        'ms': { name: 'Millisecond', factor: 0.001 },
        's': { name: 'Second', factor: 1 },
        'min': { name: 'Minute', factor: 60 },
        'hr': { name: 'Hour', factor: 3600 },
        'day': { name: 'Day', factor: 86400 },
        'week': { name: 'Week', factor: 604800 },
        'month': { name: 'Month', factor: 2629746 },
        'year': { name: 'Year', factor: 31556952 }
      }
    }
  };

  const convertTemperature = (value: number, from: string, to: string): number => {
    // Convert to Celsius first
    let celsius: number;
    switch (from) {
      case 'f':
        celsius = (value - 32) * 5/9;
        break;
      case 'k':
        celsius = value - 273.15;
        break;
      default:
        celsius = value;
    }

    // Convert from Celsius to target
    switch (to) {
      case 'f':
        return celsius * 9/5 + 32;
      case 'k':
        return celsius + 273.15;
      default:
        return celsius;
    }
  };

  const performConversion = () => {
    if (!inputValue || !fromUnit || !toUnit) {
      toast({
        title: "अधूरी जानकारी",
        description: "कृपया सभी फील्ड भरें",
        variant: "destructive"
      });
      return;
    }

    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      toast({
        title: "गलत इनपुट",
        description: "कृपया वैध संख्या दर्ज करें",
        variant: "destructive"
      });
      return;
    }

    let convertedValue: number;
    const currentCategory = categories[activeCategory as keyof typeof categories];

    if (activeCategory === 'temperature') {
      convertedValue = convertTemperature(value, fromUnit, toUnit);
    } else {
      const fromFactor = (currentCategory.units as any)[fromUnit].factor;
      const toFactor = (currentCategory.units as any)[toUnit].factor;
      convertedValue = (value * fromFactor) / toFactor;
    }

    // Format result based on magnitude
    let formattedResult: string;
    if (convertedValue >= 1e6 || (convertedValue <= 1e-6 && convertedValue > 0)) {
      formattedResult = convertedValue.toExponential(6);
    } else {
      formattedResult = parseFloat(convertedValue.toFixed(8)).toString();
    }

    setResult(formattedResult);

    toast({
      title: "रूपांतरण पूरा",
      description: "सफलतापूर्वक रूपांतरित हो गया"
    });
  };

  const copyResult = async () => {
    if (!result) return;
    
    try {
      const currentCategory = categories[activeCategory as keyof typeof categories];
      const fromUnitName = (currentCategory.units as any)[fromUnit]?.name || fromUnit;
      const toUnitName = (currentCategory.units as any)[toUnit]?.name || toUnit;
      const copyText = `${inputValue} ${fromUnitName} = ${result} ${toUnitName}`;
      
      await navigator.clipboard.writeText(copyText);
      toast({
        title: "कॉपी हो गया",
        description: "परिणाम क्लिपबोर्ड में कॉपी कर दिया गया"
      });
    } catch (err) {
      toast({
        title: "त्रुटि",
        description: "कॉपी करने में त्रुटि हुई",
        variant: "destructive"
      });
    }
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
    if (result && inputValue) {
      setInputValue(result);
      setResult(inputValue);
    }
  };

  const clearAll = () => {
    setInputValue('');
    setResult('');
    setFromUnit('');
    setToUnit('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <ArrowRightLeft className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Unit & Currency Converter
          </h1>
        </div>
        <p className="text-muted-foreground">
          Professional conversion tool for length, weight, temperature, currency, and time
        </p>
      </div>

      {/* Category Selection */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {Object.entries(categories).map(([key, category]) => {
          const Icon = category.icon;
          return (
            <Button
              key={key}
              variant={activeCategory === key ? "default" : "outline"}
              onClick={() => {
                setActiveCategory(key);
                clearAll();
              }}
              className="flex items-center gap-2"
            >
              <Icon className="h-4 w-4" />
              {category.name}
            </Button>
          );
        })}
      </div>

      {/* Conversion Interface */}
      <Card className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* From Unit */}
          <div className="space-y-4">
            <Label htmlFor="from-value">From</Label>
            <Input
              id="from-value"
              type="number"
              placeholder="Enter value"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="text-lg"
            />
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(categories[activeCategory as keyof typeof categories].units).map(([key, unit]) => (
                  <SelectItem key={key} value={key}>
                    {unit.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Conversion Controls */}
          <div className="flex flex-col items-center justify-center gap-4">
            <Button
              onClick={performConversion}
              disabled={!inputValue || !fromUnit || !toUnit}
              className="w-full"
            >
              Convert
            </Button>
            <Button
              variant="outline"
              onClick={swapUnits}
              disabled={!fromUnit || !toUnit}
              className="flex items-center gap-2"
            >
              <ArrowRightLeft className="h-4 w-4" />
              Swap
            </Button>
            <Button
              variant="ghost"
              onClick={clearAll}
              className="text-sm"
            >
              Clear All
            </Button>
          </div>

          {/* To Unit */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="to-value">To</Label>
              {result && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={copyResult}
                  className="h-6 w-6"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              )}
            </div>
            <Input
              id="to-value"
              type="text"
              placeholder="Result"
              value={result}
              readOnly
              className="text-lg bg-muted/50"
            />
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(categories[activeCategory as keyof typeof categories].units).map(([key, unit]) => (
                  <SelectItem key={key} value={key}>
                    {unit.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Result Display */}
        {result && (
          <div className="mt-6 p-4 bg-primary/5 rounded-lg">
            <div className="text-center">
              <Badge variant="secondary" className="mb-2">
                Conversion Result
              </Badge>
              <div className="text-lg font-mono">
                {inputValue} {(categories[activeCategory as keyof typeof categories].units as any)[fromUnit]?.name || fromUnit} = {result} {(categories[activeCategory as keyof typeof categories].units as any)[toUnit]?.name || toUnit}
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Quick Conversion Presets */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Quick Conversions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {activeCategory === 'length' && (
            <>
              <Button variant="outline" size="sm" onClick={() => {
                setInputValue('1');
                setFromUnit('m');
                setToUnit('ft');
                setTimeout(performConversion, 100);
              }}>
                1m → ft
              </Button>
              <Button variant="outline" size="sm" onClick={() => {
                setInputValue('1');
                setFromUnit('km');
                setToUnit('mi');
                setTimeout(performConversion, 100);
              }}>
                1km → mi
              </Button>
              <Button variant="outline" size="sm" onClick={() => {
                setInputValue('1');
                setFromUnit('in');
                setToUnit('cm');
                setTimeout(performConversion, 100);
              }}>
                1in → cm
              </Button>
              <Button variant="outline" size="sm" onClick={() => {
                setInputValue('100');
                setFromUnit('cm');
                setToUnit('m');
                setTimeout(performConversion, 100);
              }}>
                100cm → m
              </Button>
            </>
          )}
          {activeCategory === 'weight' && (
            <>
              <Button variant="outline" size="sm" onClick={() => {
                setInputValue('1');
                setFromUnit('kg');
                setToUnit('lb');
                setTimeout(performConversion, 100);
              }}>
                1kg → lb
              </Button>
              <Button variant="outline" size="sm" onClick={() => {
                setInputValue('1000');
                setFromUnit('g');
                setToUnit('kg');
                setTimeout(performConversion, 100);
              }}>
                1000g → kg
              </Button>
              <Button variant="outline" size="sm" onClick={() => {
                setInputValue('1');
                setFromUnit('lb');
                setToUnit('oz');
                setTimeout(performConversion, 100);
              }}>
                1lb → oz
              </Button>
              <Button variant="outline" size="sm" onClick={() => {
                setInputValue('1');
                setFromUnit('ton');
                setToUnit('kg');
                setTimeout(performConversion, 100);
              }}>
                1ton → kg
              </Button>
            </>
          )}
          {activeCategory === 'temperature' && (
            <>
              <Button variant="outline" size="sm" onClick={() => {
                setInputValue('0');
                setFromUnit('c');
                setToUnit('f');
                setTimeout(performConversion, 100);
              }}>
                0°C → °F
              </Button>
              <Button variant="outline" size="sm" onClick={() => {
                setInputValue('100');
                setFromUnit('c');
                setToUnit('f');
                setTimeout(performConversion, 100);
              }}>
                100°C → °F
              </Button>
              <Button variant="outline" size="sm" onClick={() => {
                setInputValue('32');
                setFromUnit('f');
                setToUnit('c');
                setTimeout(performConversion, 100);
              }}>
                32°F → °C
              </Button>
              <Button variant="outline" size="sm" onClick={() => {
                setInputValue('273');
                setFromUnit('k');
                setToUnit('c');
                setTimeout(performConversion, 100);
              }}>
                273K → °C
              </Button>
            </>
          )}
          {activeCategory === 'currency' && (
            <>
              <Button variant="outline" size="sm" onClick={() => {
                setInputValue('1');
                setFromUnit('usd');
                setToUnit('inr');
                setTimeout(performConversion, 100);
              }}>
                $1 → ₹
              </Button>
              <Button variant="outline" size="sm" onClick={() => {
                setInputValue('100');
                setFromUnit('inr');
                setToUnit('usd');
                setTimeout(performConversion, 100);
              }}>
                ₹100 → $
              </Button>
              <Button variant="outline" size="sm" onClick={() => {
                setInputValue('1');
                setFromUnit('eur');
                setToUnit('inr');
                setTimeout(performConversion, 100);
              }}>
                €1 → ₹
              </Button>
              <Button variant="outline" size="sm" onClick={() => {
                setInputValue('1');
                setFromUnit('gbp');
                setToUnit('inr');
                setTimeout(performConversion, 100);
              }}>
                £1 → ₹
              </Button>
            </>
          )}
        </div>
      </Card>

      {/* Information */}
      <Card className="p-6 bg-muted/30">
        <h3 className="text-sm font-semibold mb-3">Features & Information:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-muted-foreground">
          <div>
            <strong>Supported Categories:</strong>
            <ul className="mt-1 space-y-1 ml-4">
              <li>• Length (mm, cm, m, km, in, ft, yd, mi)</li>
              <li>• Weight (mg, g, kg, oz, lb, ton)</li>
              <li>• Temperature (°C, °F, K)</li>
            </ul>
          </div>
          <div>
            <strong>Currency & Time:</strong>
            <ul className="mt-1 space-y-1 ml-4">
              <li>• Currency (INR, USD, EUR, GBP, JPY, etc.)</li>
              <li>• Time (ms, s, min, hr, day, week, etc.)</li>
              <li>• Real-time accurate conversions</li>
            </ul>
          </div>
        </div>
        {activeCategory === 'currency' && (
          <div className="mt-3 text-xs text-muted-foreground">
            <strong>Note:</strong> Currency rates are approximate and for demonstration. Use official sources for financial transactions.
          </div>
        )}
      </Card>
    </div>
  );
};

export default UnitConverter;