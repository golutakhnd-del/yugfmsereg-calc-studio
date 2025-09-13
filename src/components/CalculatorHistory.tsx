import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Clock, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HistoryEntry {
  calculation: string;
  result: string;
  timestamp: Date;
}

interface CalculatorHistoryProps {
  history: HistoryEntry[];
  onClose: () => void;
  onSelectResult: (result: string) => void;
}

const CalculatorHistory = ({ history, onClose, onSelectResult }: CalculatorHistoryProps) => {
  const { toast } = useToast();

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('hi-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const copyCalculation = async (calculation: string, result: string) => {
    try {
      await navigator.clipboard.writeText(`${calculation} = ${result}`);
      toast({
        title: "कॉपी हो गया",
        description: "गणना क्लिपबोर्ड में कॉपी कर दी गई"
      });
    } catch (err) {
      toast({
        title: "त्रुटि",
        description: "कॉपी करने में त्रुटि हुई",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="absolute inset-0 z-10 bg-background/95 backdrop-blur-md border-2 rounded-2xl">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <h3 className="font-semibold">गणना इतिहास</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="h-80">
          {history.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>कोई इतिहास नहीं मिला</p>
            </div>
          ) : (
            <div className="space-y-2">
              {history.map((entry, index) => (
                <Card 
                  key={index} 
                  className="p-3 hover:bg-accent/50 transition-colors cursor-pointer group"
                  onClick={() => onSelectResult(entry.result)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-sm font-mono">
                        {entry.calculation} = <span className="font-semibold">{entry.result}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {formatTime(entry.timestamp)}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyCalculation(entry.calculation, entry.result);
                      }}
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>

        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            परिणाम पर क्लिक करके उसे उपयोग करें
          </p>
        </div>
      </div>
    </Card>
  );
};

export default CalculatorHistory;