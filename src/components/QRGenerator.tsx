import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { QrCode, Download, Copy, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import QRCode from 'qrcode';

interface QRGeneratorProps {
  onClose: () => void;
  defaultText?: string;
}

const QRGenerator = ({ onClose, defaultText = '' }: QRGeneratorProps) => {
  const [text, setText] = useState(defaultText);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const generateQRCode = async () => {
    if (!text.trim()) {
      toast({
        title: "त्रुटि",
        description: "कृपया कुछ टेक्स्ट डालें",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      const url = await QRCode.toDataURL(text, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      setQrCodeUrl(url);
      
      toast({
        title: "QR कोड बन गया",
        description: "QR कोड सफलतापूर्वक जेनरेट हो गया"
      });
    } catch (error) {
      toast({
        title: "त्रुटि",
        description: "QR कोड बनाने में त्रुटि हुई",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeUrl) return;
    
    const link = document.createElement('a');
    link.download = `qrcode-${Date.now()}.png`;
    link.href = qrCodeUrl;
    link.click();
    
    toast({
      title: "डाउनलोड हो गया",
      description: "QR कोड डाउनलोड हो गया"
    });
  };

  const copyQRCode = async () => {
    if (!qrCodeUrl) return;
    
    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      
      toast({
        title: "कॉपी हो गया",
        description: "QR कोड क्लिपबोर्ड में कॉपी हो गया"
      });
    } catch (error) {
      toast({
        title: "त्रुटि",
        description: "QR कोड कॉपी करने में त्रुटि हुई",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md bg-background/95 backdrop-blur-md border-2 rounded-2xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <QrCode className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">QR Code Generator</h2>
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

          {/* Input Section */}
          <div className="space-y-4 mb-6">
            <div>
              <Label htmlFor="qr-text">Text या URL डालें:</Label>
              <Input
                id="qr-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="कुछ भी टाइप करें..."
                className="mt-2"
              />
            </div>
            
            <Button 
              onClick={generateQRCode}
              disabled={isGenerating || !text.trim()}
              className="w-full"
            >
              {isGenerating ? 'QR कोड बन रहा है...' : 'QR कोड बनाएं'}
            </Button>
          </div>

          {/* QR Code Display */}
          {qrCodeUrl && (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <img 
                    src={qrCodeUrl} 
                    alt="Generated QR Code"
                    className="w-48 h-48"
                  />
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={downloadQRCode}
                  className="flex-1"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  onClick={copyQRCode}
                  className="flex-1"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default QRGenerator;