
'use client';
import { useState }from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, X, Send, User } from 'lucide-react';
import { chat } from '@/ai/flows/chat-flow';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user' as const, text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const history = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        content: [{ text: msg.text }],
      }));

      const botResponse = await chat({
        history,
        message: input,
      });

      setMessages(prev => [...prev, { sender: 'bot' as const, text: botResponse }]);
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages(prev => [...prev, { sender: 'bot' as const, text: 'Sorry, I encountered an error.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 h-16 w-16 rounded-full shadow-lg"
        aria-label="Toggle Chatbot"
      >
        {isOpen ? <X className="h-8 w-8" /> : <Bot className="h-8 w-8" />}
      </Button>

      {isOpen && (
        <Card className="fixed bottom-24 right-4 z-50 w-full max-w-sm shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-6 w-6" /> AI Assistant
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-80 pr-4">
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                    {msg.sender === 'bot' && <Bot className="h-6 w-6 flex-shrink-0 text-primary" />}
                    <div className={`rounded-lg px-4 py-2 ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      <p className="text-sm">{msg.text}</p>
                    </div>
                     {msg.sender === 'user' && <User className="h-6 w-6 flex-shrink-0" />}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-start gap-3">
                    <Bot className="h-6 w-6 flex-shrink-0 text-primary" />
                    <div className="rounded-lg bg-muted px-4 py-2">
                      <p className="text-sm animate-pulse">Typing...</p>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <div className="flex w-full gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                disabled={isTyping}
              />
              <Button onClick={handleSendMessage} disabled={isTyping} aria-label="Send Message">
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
