import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Brain } from 'lucide-react';

interface CalculatorMemoryProps {
  memory: number;
}

const CalculatorMemory = ({ memory }: CalculatorMemoryProps) => {
  if (memory === 0) return null;

  return (
    <Card className="fixed top-4 right-4 p-3 bg-background/90 backdrop-blur-md border-2 shadow-lg">
      <div className="flex items-center gap-2">
        <Brain className="h-4 w-4 text-primary" />
        <div className="text-sm">
          <div className="text-xs text-muted-foreground">Memory</div>
          <div className="font-mono font-semibold">{memory}</div>
        </div>
      </div>
    </Card>
  );
};

export default CalculatorMemory;