import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Moon, Sun, Copy, History, RotateCcw, QrCode } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import CalculatorHistory from './CalculatorHistory';
import CalculatorMemory from './CalculatorMemory';
import QRGenerator from './QRGenerator';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewOperand, setWaitingForNewOperand] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const [showQRGenerator, setShowQRGenerator] = useState(false);
  const [history, setHistory] = useState<Array<{
    calculation: string;
    result: string;
    timestamp: Date;
  }>>([]);
  const [memory, setMemory] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addToHistory = (calculation: string, result: string) => {
    const newEntry = {
      calculation,
      result,
      timestamp: new Date()
    };
    setHistory(prev => [newEntry, ...prev.slice(0, 49)]); // Keep last 50 entries
  };

  const inputNumber = (num: string) => {
    if (waitingForNewOperand) {
      setDisplay(num);
      setWaitingForNewOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForNewOperand) {
      setDisplay('0.');
      setWaitingForNewOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewOperand(false);
  };

  const clearAll = () => {
    clear();
    setMemory(0);
    setHistory([]);
    toast({
      title: "सफाई हो गई",
      description: "सभी डेटा साफ कर दिया गया है"
    });
  };

  const squareRoot = () => {
    const num = parseFloat(display);
    if (num < 0) {
      setDisplay('Error');
      return;
    }
    const result = Math.sqrt(num).toString();
    addToHistory(`√${display}`, result);
    setDisplay(result);
    setWaitingForNewOperand(true);
  };

  const percentage = () => {
    const result = (parseFloat(display) / 100).toString();
    addToHistory(`${display}%`, result);
    setDisplay(result);
    setWaitingForNewOperand(true);
  };

  const square = () => {
    const num = parseFloat(display);
    const result = (num * num).toString();
    addToHistory(`${display}²`, result);
    setDisplay(result);
    setWaitingForNewOperand(true);
  };

  const power = () => {
    const num = parseFloat(display);
    const exponent = parseFloat(prompt("Enter exponent:") || "2");
    const result = Math.pow(num, exponent).toString();
    addToHistory(`${display}^${exponent}`, result);
    setDisplay(result);
    setWaitingForNewOperand(true);
  };

  const sin = () => {
    const num = parseFloat(display);
    const result = Math.sin(num * Math.PI / 180).toString();
    addToHistory(`sin(${display}°)`, result);
    setDisplay(result);
    setWaitingForNewOperand(true);
  };

  const cos = () => {
    const num = parseFloat(display);
    const result = Math.cos(num * Math.PI / 180).toString();
    addToHistory(`cos(${display}°)`, result);
    setDisplay(result);
    setWaitingForNewOperand(true);
  };

  const tan = () => {
    const num = parseFloat(display);
    const result = Math.tan(num * Math.PI / 180).toString();
    addToHistory(`tan(${display}°)`, result);
    setDisplay(result);
    setWaitingForNewOperand(true);
  };

  const log = () => {
    const num = parseFloat(display);
    if (num <= 0) {
      setDisplay('Error');
      return;
    }
    const result = Math.log10(num).toString();
    addToHistory(`log(${display})`, result);
    setDisplay(result);
    setWaitingForNewOperand(true);
  };

  const ln = () => {
    const num = parseFloat(display);
    if (num <= 0) {
      setDisplay('Error');
      return;
    }
    const result = Math.log(num).toString();
    addToHistory(`ln(${display})`, result);
    setDisplay(result);
    setWaitingForNewOperand(true);
  };

  const factorial = () => {
    const num = parseInt(display);
    if (num < 0 || num > 170) {
      setDisplay('Error');
      return;
    }
    let result = 1;
    for (let i = 2; i <= num; i++) {
      result *= i;
    }
    addToHistory(`${display}!`, result.toString());
    setDisplay(result.toString());
    setWaitingForNewOperand(true);
  };

  const pi = () => {
    const result = Math.PI.toString();
    addToHistory('π', result);
    setDisplay(result);
    setWaitingForNewOperand(true);
  };

  const e = () => {
    const result = Math.E.toString();
    addToHistory('e', result);
    setDisplay(result);
    setWaitingForNewOperand(true);
  };

  const reciprocal = () => {
    const num = parseFloat(display);
    if (num === 0) {
      setDisplay('Error');
      return;
    }
    const result = (1 / num).toString();
    addToHistory(`1/${display}`, result);
    setDisplay(result);
    setWaitingForNewOperand(true);
  };

  const memoryAdd = () => {
    setMemory(memory + parseFloat(display));
    toast({
      title: "मेमोरी में जोड़ा गया",
      description: `${display} मेमोरी में जोड़ दिया गया`
    });
    setWaitingForNewOperand(true);
  };

  const memorySubtract = () => {
    setMemory(memory - parseFloat(display));
    toast({
      title: "मेमोरी से घटाया गया",
      description: `${display} मेमोरी से घटा दिया गया`
    });
    setWaitingForNewOperand(true);
  };

  const memoryRecall = () => {
    setDisplay(memory.toString());
    setWaitingForNewOperand(true);
  };

  const memoryClear = () => {
    setMemory(0);
    toast({
      title: "मेमोरी साफ",
      description: "मेमोरी साफ कर दी गई"
    });
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(display);
    } else if (operation) {
      const currentValue = previousValue || '0';
      const prevValue = parseFloat(currentValue);
      let result: number;

      switch (operation) {
        case '+':
          result = prevValue + inputValue;
          break;
        case '-':
          result = prevValue - inputValue;
          break;
        case '×':
          result = prevValue * inputValue;
          break;
        case '÷':
          if (inputValue === 0) {
            setDisplay('Error');
            return;
          }
          result = prevValue / inputValue;
          break;
        default:
          return;
      }

      const resultString = result.toString();
      const calculation = `${currentValue} ${operation} ${display}`;
      
      if (nextOperation === '=') {
        addToHistory(calculation, resultString);
      }
      
      setDisplay(resultString);
      setPreviousValue(resultString);
    }

    setWaitingForNewOperand(true);
    setOperation(nextOperation);
  };

  const calculate = () => {
    if (operation && previousValue !== null) {
      performOperation('=');
      setOperation(null);
      setPreviousValue(null);
      setWaitingForNewOperand(true);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(display);
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

  const handleKeyPress = (event: KeyboardEvent) => {
    const { key } = event;
    
    if (key >= '0' && key <= '9') {
      inputNumber(key);
    } else if (key === '.') {
      inputDecimal();
    } else if (key === '+' || key === '-') {
      performOperation(key);
    } else if (key === '*') {
      performOperation('×');
    } else if (key === '/') {
      event.preventDefault();
      performOperation('÷');
    } else if (key === 'Enter' || key === '=') {
      calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
      clear();
    } else if (key === 'Backspace') {
      if (display.length > 1) {
        setDisplay(display.slice(0, -1));
      } else {
        setDisplay('0');
      }
    } else if (key === 's' || key === 'S') {
      squareRoot();
    } else if (key === '%') {
      percentage();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [display, operation, previousValue, waitingForNewOperand]);

  const formatDisplay = (value: string) => {
    if (value === 'Error') return value;
    const num = parseFloat(value);
    if (value.length > 12) {
      if (num >= 1e12 || (num <= 1e-6 && num > 0)) {
        return num.toExponential(6);
      }
      return parseFloat(value).toPrecision(12);
    }
    return value;
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 relative">
      {/* Premium 3D Floating Shapes */}
      <div className="floating-shapes">
        <div className="shape-1"></div>
        <div className="shape-2"></div>
        <div className="shape-3"></div>
      </div>
      
      <div className="calculator-glass rounded-2xl p-6 w-full max-w-md premium-container relative">
        {/* Header with controls */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-sm font-medium text-primary mb-1">
              YUGFMSEREG
            </div>
            <h1 className="text-lg font-semibold text-foreground opacity-80">
              Smart Calculator
            </h1>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
              className="h-8 w-8"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowHistory(!showHistory)}
              className="h-8 w-8"
            >
              <History className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowQRGenerator(true)}
              className="h-8 w-8"
              title="QR Generator"
            >
              <QrCode className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={clearAll}
              className="h-8 w-8"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Memory indicator */}
        {memory !== 0 && (
          <div className="mb-4">
            <Badge variant="secondary" className="text-xs">
              Memory: {memory}
            </Badge>
          </div>
        )}

        {/* Display */}
        <Card className="display-glass rounded-xl p-6 mb-6">
          <div className="text-right">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs text-muted-foreground">
                {operation && previousValue && `${previousValue} ${operation}`}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={copyToClipboard}
                className="h-6 w-6"
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
            <div className="text-3xl font-light text-foreground break-all">
              {formatDisplay(display)}
            </div>
          </div>
        </Card>

        {/* History Panel */}
        {showHistory && (
          <CalculatorHistory 
            history={history} 
            onClose={() => setShowHistory(false)}
            onSelectResult={(result) => {
              setDisplay(result);
              setWaitingForNewOperand(true);
              setShowHistory(false);
            }}
          />
        )}

        {/* Memory Functions Row */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          <Button
            variant="outline"
            size="sm"
            className="button-base rounded-lg h-10 text-sm"
            onClick={memoryClear}
          >
            MC
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="button-base rounded-lg h-10 text-sm"
            onClick={memoryRecall}
          >
            MR
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="button-base rounded-lg h-10 text-sm"
            onClick={memoryAdd}
          >
            M+
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="button-base rounded-lg h-10 text-sm"
            onClick={memorySubtract}
          >
            M-
          </Button>
        </div>

        {/* Scientific Functions Row */}
        <div className="grid grid-cols-4 gap-3 mb-3">
          <Button
            variant="outline"
            size="lg"
            className="button-base rounded-xl h-12 text-sm"
            onClick={squareRoot}
          >
            √
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="button-base rounded-xl h-12 text-sm"
            onClick={square}
          >
            x²
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="button-base rounded-xl h-12 text-sm"
            onClick={reciprocal}
          >
            1/x
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="button-operator rounded-xl h-12 text-lg font-medium"
            onClick={() => performOperation('÷')}
          >
            ÷
          </Button>
        </div>

        {/* Main Calculator Buttons */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <Button
            variant="outline"
            size="lg"
            className="button-clear rounded-xl h-14 text-lg font-medium"
            onClick={clear}
          >
            AC
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="button-base rounded-xl h-14 text-lg"
            onClick={() => {
              if (display.length > 1) {
                setDisplay(display.slice(0, -1));
              } else {
                setDisplay('0');
              }
            }}
          >
            ⌫
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="button-base rounded-xl h-14 text-lg"
            onClick={percentage}
          >
            %
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="button-operator rounded-xl h-14 text-xl font-medium"
            onClick={() => performOperation('×')}
          >
            ×
          </Button>

          {/* Row 2 */}
          <Button
            variant="outline"
            size="lg"
            className="button-base rounded-xl h-14 text-xl font-medium"
            onClick={() => inputNumber('7')}
          >
            7
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="button-base rounded-xl h-14 text-xl font-medium"
            onClick={() => inputNumber('8')}
          >
            8
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="button-base rounded-xl h-14 text-xl font-medium"
            onClick={() => inputNumber('9')}
          >
            9
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="button-operator rounded-xl h-14 text-xl font-medium"
            onClick={() => performOperation('-')}
          >
            −
          </Button>

          {/* Row 3 */}
          <Button
            variant="outline"
            size="lg"
            className="button-base rounded-xl h-14 text-xl font-medium"
            onClick={() => inputNumber('4')}
          >
            4
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="button-base rounded-xl h-14 text-xl font-medium"
            onClick={() => inputNumber('5')}
          >
            5
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="button-base rounded-xl h-14 text-xl font-medium"
            onClick={() => inputNumber('6')}
          >
            6
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="button-operator rounded-xl h-14 text-xl font-medium"
            onClick={() => performOperation('+')}
          >
            +
          </Button>

          {/* Row 4 */}
          <Button
            variant="outline"
            size="lg"
            className="button-base rounded-xl h-14 text-xl font-medium"
            onClick={() => inputNumber('1')}
          >
            1
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="button-base rounded-xl h-14 text-xl font-medium"
            onClick={() => inputNumber('2')}
          >
            2
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="button-base rounded-xl h-14 text-xl font-medium"
            onClick={() => inputNumber('3')}
          >
            3
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="button-equals rounded-xl h-14 text-xl font-semibold row-span-2"
            onClick={calculate}
          >
            =
          </Button>

          {/* Row 5 */}
          <Button
            variant="outline"
            size="lg"
            className="button-base rounded-xl h-14 text-xl font-medium col-span-2"
            onClick={() => inputNumber('0')}
          >
            0
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="button-base rounded-xl h-14 text-xl font-medium"
            onClick={inputDecimal}
          >
            .
          </Button>
        </div>

        {/* Keyboard shortcuts hint */}
        <div className="text-center mt-4">
          <p className="text-xs text-muted-foreground opacity-70">
            Keyboard shortcuts: 0-9, +, -, *, /, Enter, Esc, %, S (√)
          </p>
        </div>
      </div>

      <CalculatorMemory memory={memory} />
      
      {/* QR Generator Modal */}
      {showQRGenerator && (
        <QRGenerator 
          onClose={() => setShowQRGenerator(false)}
          defaultText={display !== '0' ? display : ''}
        />
      )}
    </div>
  );
};

export default Calculator;