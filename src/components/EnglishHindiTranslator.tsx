import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowRight, Copy, Volume2, History, Download, RotateCcw, Languages } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TranslationEntry {
  english: string;
  hindi: string;
  timestamp: Date;
}

const EnglishHindiTranslator = () => {
  const [englishText, setEnglishText] = useState('');
  const [hindiText, setHindiText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<TranslationEntry[]>([]);
  const { toast } = useToast();

  // Simple English to Hindi word dictionary
  const englishToHindiDict: { [key: string]: string } = {
    'hello': 'नमस्ते',
    'goodbye': 'अलविदा',
    'thank': 'धन्यवाद',
    'thanks': 'धन्यवाद',
    'please': 'कृपया',
    'yes': 'हाँ',
    'no': 'नहीं',
    'water': 'पानी',
    'food': 'खाना',
    'house': 'घर',
    'school': 'स्कूल',
    'book': 'किताब',
    'pen': 'कलम',
    'paper': 'कागज़',
    'computer': 'कंप्यूटर',
    'mobile': 'मोबाइल',
    'phone': 'फोन',
    'car': 'कार',
    'bus': 'बस',
    'train': 'ट्रेन',
    'money': 'पैसा',
    'time': 'समय',
    'day': 'दिन',
    'night': 'रात',
    'morning': 'सुबह',
    'evening': 'शाम',
    'good': 'अच्छा',
    'bad': 'बुरा',
    'big': 'बड़ा',
    'small': 'छोटा',
    'hot': 'गर्म',
    'cold': 'ठंडा',
    'mother': 'माँ',
    'father': 'पिता',
    'brother': 'भाई',
    'sister': 'बहन',
    'friend': 'दोस्त',
    'love': 'प्रेम',
    'work': 'काम',
    'study': 'पढ़ाई',
    'play': 'खेल',
    'eat': 'खाना',
    'drink': 'पीना',
    'sleep': 'सोना',
    'walk': 'चलना',
    'run': 'दौड़ना',
    'come': 'आना',
    'go': 'जाना',
    'see': 'देखना',
    'hear': 'सुनना',
    'speak': 'बोलना',
    'read': 'पढ़ना',
    'write': 'लिखना',
    'i': 'मैं',
    'you': 'तुम',
    'he': 'वह',
    'she': 'वह',
    'we': 'हम',
    'they': 'वे',
    'and': 'और',
    'or': 'या',
    'but': 'लेकिन',
    'with': 'के साथ',
    'without': 'के बिना',
    'in': 'में',
    'on': 'पर',
    'at': 'पर',
    'to': 'को',
    'from': 'से',
    'for': 'के लिए',
    'is': 'है',
    'are': 'हैं',
    'am': 'हूँ',
    'was': 'था',
    'were': 'थे',
    'will': 'होगा',
    'have': 'पास है',
    'has': 'पास है',
    'had': 'था',
    'do': 'करना',
    'does': 'करता है',
    'did': 'किया',
    'can': 'सकता है',
    'could': 'सकता था',
    'should': 'चाहिए',
    'would': 'होगा',
    'may': 'सकता है',
    'might': 'हो सकता है',
    'must': 'जरूर',
    'this': 'यह',
    'that': 'वह',
    'these': 'ये',
    'those': 'वे',
    'here': 'यहाँ',
    'there': 'वहाँ',
    'where': 'कहाँ',
    'when': 'कब',
    'why': 'क्यों',
    'what': 'क्या',
    'who': 'कौन',
    'how': 'कैसे',
    'which': 'कौन सा',
    'all': 'सब',
    'some': 'कुछ',
    'any': 'कोई',
    'many': 'बहुत',
    'much': 'बहुत',
    'more': 'और',
    'most': 'सबसे',
    'less': 'कम',
    'few': 'कुछ',
    'little': 'थोड़ा',
    'new': 'नया',
    'old': 'पुराना',
    'first': 'पहला',
    'last': 'अंतिम',
    'next': 'अगला',
    'previous': 'पिछला',
    'one': 'एक',
    'two': 'दो',
    'three': 'तीन',
    'four': 'चार',
    'five': 'पाँच',
    'six': 'छह',
    'seven': 'सात',
    'eight': 'आठ',
    'nine': 'नौ',
    'ten': 'दस',
    'today': 'आज',
    'tomorrow': 'कल',
    'yesterday': 'कल',
    'now': 'अब',
    'then': 'तब',
    'always': 'हमेशा',
    'never': 'कभी नहीं',
    'sometimes': 'कभी कभी',
    'often': 'अक्सर',
    'usually': 'आमतौर पर',
    'welcome': 'स्वागत है',
    'sorry': 'माफ करना',
    'excuse': 'माफ करना',
    'congratulations': 'बधाई हो',
    'happy': 'खुश',
    'sad': 'उदास',
    'angry': 'गुस्सा',
    'beautiful': 'सुंदर',
    'ugly': 'बदसूरत',
    'easy': 'आसान',
    'difficult': 'मुश्किल',
    'important': 'महत्वपूर्ण',
    'necessary': 'आवश्यक',
    'possible': 'संभव',
    'impossible': 'असंभव',
    'right': 'सही',
    'wrong': 'गलत',
    'true': 'सच',
    'false': 'झूठ',
    'open': 'खुला',
    'close': 'बंद',
    'start': 'शुरू',
    'stop': 'रुकना',
    'finish': 'समाप्त',
    'begin': 'शुरू',
    'end': 'अंत',
    'buy': 'खरीदना',
    'sell': 'बेचना',
    'give': 'देना',
    'take': 'लेना',
    'bring': 'लाना',
    'send': 'भेजना',
    'receive': 'प्राप्त करना',
    'help': 'मदद',
    'need': 'चाहिए',
    'want': 'चाहना',
    'like': 'पसंद',
    'dislike': 'नापसंद',
    'know': 'जानना',
    'understand': 'समझना',
    'learn': 'सीखना',
    'teach': 'सिखाना',
    'think': 'सोचना',
    'believe': 'विश्वास',
    'remember': 'याद रखना',
    'forget': 'भूलना',
    'try': 'कोशिश',
    'succeed': 'सफल',
    'fail': 'असफल',
    'win': 'जीतना',
    'lose': 'हारना',
    'find': 'खोजना',
    'search': 'तलाश',
    'look': 'देखना',
    'watch': 'देखना',
    'listen': 'सुनना',
    'talk': 'बात करना',
    'tell': 'बताना',
    'ask': 'पूछना',
    'answer': 'जवाब',
    'question': 'सवाल',
    'problem': 'समस्या',
    'solution': 'समाधान',
    'idea': 'विचार',
    'plan': 'योजना',
    'hope': 'उम्मीद',
    'wish': 'चाहना',
    'dream': 'सपना',
    'fear': 'डर',
    'worry': 'चिंता',
    'peace': 'शांति',
    'war': 'युद्ध',
    'health': 'स्वास्थ्य',
    'sick': 'बीमार',
    'medicine': 'दवा',
    'doctor': 'डॉक्टर',
    'hospital': 'अस्पताल',
    'family': 'परिवार',
    'child': 'बच्चा',
    'children': 'बच्चे',
    'man': 'आदमी',
    'woman': 'औरत',
    'boy': 'लड़का',
    'girl': 'लड़की',
    'person': 'व्यक्ति',
    'people': 'लोग',
    'city': 'शहर',
    'village': 'गाँव',
    'country': 'देश',
    'world': 'दुनिया',
    'earth': 'धरती',
    'sky': 'आसमान',
    'sun': 'सूरज',
    'moon': 'चाँद',
    'star': 'तारा',
    'tree': 'पेड़',
    'flower': 'फूल',
    'animal': 'जानवर',
    'bird': 'पक्षी',
    'fish': 'मछली',
    'dog': 'कुत्ता',
    'cat': 'बिल्ली',
    'cow': 'गाय',
    'horse': 'घोड़ा',
    'elephant': 'हाथी',
    'color': 'रंग',
    'red': 'लाल',
    'blue': 'नीला',
    'green': 'हरा',
    'yellow': 'पीला',
    'black': 'काला',
    'white': 'सफेद',
    'clothes': 'कपड़े',
    'music': 'संगीत',
    'name': 'नाम',
    'age': 'उम्र'
  };

  const translateText = async () => {
    if (!englishText.trim()) {
      toast({
        title: "त्रुटि",
        description: "कृपया अनुवाद के लिए कुछ टेक्स्ट लिखें",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simple word-by-word translation
    const words = englishText.toLowerCase().split(/\s+/);
    const translatedWords = words.map(word => {
      // Remove punctuation for lookup
      const cleanWord = word.replace(/[^\w]/g, '');
      return englishToHindiDict[cleanWord] || word;
    });
    
    const translated = translatedWords.join(' ');
    setHindiText(translated);

    // Add to history
    const newEntry: TranslationEntry = {
      english: englishText,
      hindi: translated,
      timestamp: new Date()
    };
    setHistory(prev => [newEntry, ...prev.slice(0, 49)]);

    setIsLoading(false);
    
    toast({
      title: "अनुवाद पूरा",
      description: "टेक्स्ट सफलतापूर्वक अनुवादित हो गया"
    });
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "कॉपी हो गया",
        description: `${type} क्लिपबोर्ड में कॉपी कर दिया गया`
      });
    } catch (err) {
      toast({
        title: "त्रुटि",
        description: "कॉपी करने में त्रुटि हुई",
        variant: "destructive"
      });
    }
  };

  const speakText = (text: string, lang: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'hindi' ? 'hi-IN' : 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
      
      toast({
        title: "बोल रहा है",
        description: "टेक्स्ट-टू-स्पीच चालू है"
      });
    } else {
      toast({
        title: "त्रुटि",
        description: "आपका ब्राउज़र टेक्स्ट-टू-स्पीच समर्थित नहीं करता",
        variant: "destructive"
      });
    }
  };

  const clearAll = () => {
    setEnglishText('');
    setHindiText('');
    setHistory([]);
    toast({
      title: "सफाई हो गई",
      description: "सभी डेटा साफ कर दिया गया है"
    });
  };

  const downloadHistory = () => {
    if (history.length === 0) {
      toast({
        title: "कोई डेटा नहीं",
        description: "डाउनलोड करने के लिए कोई इतिहास नहीं है",
        variant: "destructive"
      });
      return;
    }

    const content = history.map((entry, index) => 
      `${index + 1}. English: ${entry.english}\n   Hindi: ${entry.hindi}\n   Time: ${entry.timestamp.toLocaleString('hi-IN')}\n`
    ).join('\n');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `translation-history-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "डाउनलोड पूरा",
      description: "अनुवाद इतिहास डाउनलोड हो गया"
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Languages className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            English to Hindi Translator
          </h1>
        </div>
        <p className="text-muted-foreground">
          Professional translation tool with text-to-speech and history tracking
        </p>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-2 mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center gap-2"
        >
          <History className="h-4 w-4" />
          History ({history.length})
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={downloadHistory}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Download
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={clearAll}
          className="flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Clear All
        </Button>
      </div>

      {/* Translation Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* English Input */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="secondary">English</Badge>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(englishText, 'English text')}
                  disabled={!englishText}
                  className="h-8 w-8"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => speakText(englishText, 'english')}
                  disabled={!englishText}
                  className="h-8 w-8"
                >
                  <Volume2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Textarea
              placeholder="Enter English text here..."
              value={englishText}
              onChange={(e) => setEnglishText(e.target.value)}
              className="min-h-32 resize-none"
            />
            <Button 
              onClick={translateText}
              disabled={isLoading || !englishText.trim()}
              className="w-full flex items-center gap-2"
            >
              {isLoading ? 'Translating...' : 'Translate'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>

        {/* Hindi Output */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="secondary">हिंदी (Hindi)</Badge>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(hindiText, 'हिंदी टेक्स्ट')}
                  disabled={!hindiText}
                  className="h-8 w-8"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => speakText(hindiText, 'hindi')}
                  disabled={!hindiText}
                  className="h-8 w-8"
                >
                  <Volume2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Textarea
              placeholder="Hindi translation will appear here..."
              value={hindiText}
              readOnly
              className="min-h-32 resize-none bg-muted/50"
            />
            <div className="text-xs text-muted-foreground text-center">
              Translation result • Click speaker to hear pronunciation
            </div>
          </div>
        </Card>
      </div>

      {/* History Panel */}
      {showHistory && (
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <History className="h-5 w-5" />
                Translation History
              </h3>
              <Badge variant="outline">{history.length} entries</Badge>
            </div>
            
            <ScrollArea className="h-80">
              {history.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <Languages className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No translation history yet</p>
                  <p className="text-xs">Start translating to see history</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {history.map((entry, index) => (
                    <Card key={index} className="p-4 hover:bg-accent/50 transition-colors">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 space-y-1">
                            <div className="text-sm">
                              <strong>EN:</strong> {entry.english}
                            </div>
                            <div className="text-sm">
                              <strong>HI:</strong> {entry.hindi}
                            </div>
                          </div>
                          <div className="flex gap-1 ml-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => copyToClipboard(`${entry.english} = ${entry.hindi}`, 'Translation')}
                              className="h-6 w-6"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {entry.timestamp.toLocaleString('hi-IN')}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
        </Card>
      )}

      {/* Usage Instructions */}
      <Card className="p-6 bg-muted/30">
        <h3 className="text-sm font-semibold mb-3">Usage Instructions:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-muted-foreground">
          <div>
            <strong>Features:</strong>
            <ul className="mt-1 space-y-1 ml-4">
              <li>• Word-by-word translation</li>
              <li>• Text-to-speech support</li>
              <li>• Copy to clipboard</li>
              <li>• Translation history</li>
            </ul>
          </div>
          <div>
            <strong>Supported:</strong>
            <ul className="mt-1 space-y-1 ml-4">
              <li>• Common English words</li>
              <li>• Basic sentences</li>
              <li>• Numbers and greetings</li>
              <li>• Download history as TXT</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EnglishHindiTranslator;