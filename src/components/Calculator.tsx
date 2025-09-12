import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewOperand, setWaitingForNewOperand] = useState(false);

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
          result = inputValue !== 0 ? prevValue / inputValue : 0;
          break;
        default:
          return;
      }

      const resultString = result.toString();
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
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [display, operation, previousValue, waitingForNewOperand]);

  const formatDisplay = (value: string) => {
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
      
      <div className="calculator-glass rounded-2xl p-6 w-full max-w-sm premium-container">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-sm font-medium text-hsl(var(--primary)) mb-1">
            YUGFMSEREG
          </div>
          <h1 className="text-lg font-semibold text-hsl(var(--foreground)) opacity-80">
            Calculator
          </h1>
        </div>

        {/* Display */}
        <div className="display-glass rounded-xl p-6 mb-6">
          <div className="text-right">
            <div className="text-3xl font-light text-hsl(var(--display-foreground)) break-all">
              {formatDisplay(display)}
            </div>
            {operation && previousValue && (
              <div className="text-sm text-hsl(var(--display-secondary)) mt-1">
                {previousValue} {operation}
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
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
            onClick={() => {
              const result = (parseFloat(display) / 100).toString();
              setDisplay(result);
            }}
          >
            %
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="button-operator rounded-xl h-14 text-xl font-medium"
            onClick={() => performOperation('÷')}
          >
            ÷
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
            onClick={() => performOperation('×')}
          >
            ×
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
            onClick={() => performOperation('-')}
          >
            −
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
            className="button-operator rounded-xl h-14 text-xl font-medium"
            onClick={() => performOperation('+')}
          >
            +
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
          <Button
            variant="outline"
            size="lg"
            className="button-equals rounded-xl h-14 text-xl font-semibold"
            onClick={calculate}
          >
            =
          </Button>
        </div>

        {/* Hint */}
        <div className="text-center mt-6">
          <p className="text-xs text-hsl(var(--display-secondary)) opacity-70">
            Use keyboard shortcuts: numbers, +, -, *, /, Enter, Esc
          </p>
        </div>
      </div>
    </div>
  );
};

export default Calculator;