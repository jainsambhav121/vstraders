
import React, { useState, useRef, useEffect } from 'react';
import { BotIcon, XIcon, SendIcon } from './icons';
import { getChatbotResponse } from '../services/geminiService';

interface Message {
    text: string;
    sender: 'user' | 'bot';
}

const WhatsAppButton: React.FC = () => (
    <a
        href="https://wa.me/917217619150"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-36 md:bottom-20 right-5 z-50 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors"
        aria-label="Chat on WhatsApp"
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.267.651 4.383 1.89 6.279l-1.231 4.493 4.625-1.217zm-1.534-7.529c-.219-.111-1.297-.638-1.5-.71-.203-.072-.351-.111-.499.111-.148.222-.569.71-.697.86-.129.149-.258.168-.486.056-.227-.111-.947-.349-1.804-.9-1.016-.632-1.595-1.59-1.833-1.959-.239-.368-.129-.56.09-.709.204-.135.438-.352.663-.529.226-.177.303-.296.438-.496.135-.2.068-.375-.028-.514-.098-.139-.499-1.201-.683-1.646-.182-.444-.363-.386-.499-.396-.135-.008-.284-.008-.431-.008-.148 0-.396.056-.613.28-.218.223-.833.803-.833 1.959s.859 2.273 1.007 2.448c.149.177 1.668 2.562 4.053 3.582 2.384 1.02 2.384.683 2.803.623.42-.059 1.297-.529 1.482-.98.186-.453.186-.833.129-.981-.057-.148-.207-.222-.431-.332z"/>
        </svg>
    </a>
);

const AIChatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { text: "Hello! I'm the VSTRADERS AI assistant. How can I help you today?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (input.trim() === '' || isLoading) return;

        const userMessage: Message = { text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const botResponseText = await getChatbotResponse(input);
            const botMessage: Message = { text: botResponseText, sender: 'bot' };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            const errorMessage: Message = { text: "Sorry, I'm having trouble connecting.", sender: 'bot' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };
    
    return (
        <div>
            {!isOpen && <WhatsAppButton />}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-20 md:bottom-5 right-5 z-50 bg-white text-black p-3 rounded-full shadow-lg hover:bg-gray-200 transition-colors"
                aria-label="Toggle AI Chatbot"
            >
                {isOpen ? <XIcon className="w-6 h-6" /> : <BotIcon className="w-6 h-6" />}
            </button>

            {isOpen && (
                <div className="fixed bottom-36 md:bottom-20 right-5 z-50 w-80 h-[28rem] bg-black/80 backdrop-blur-xl border border-white/20 rounded-lg shadow-2xl flex flex-col">
                    <div className="p-4 border-b border-white/20 text-center font-bold">
                        VSTRADERS AI Assistant
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-xs rounded-lg px-3 py-2 ${msg.sender === 'user' ? 'bg-white text-black' : 'bg-white/10 text-white'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                             <div className="flex justify-start">
                                <div className="bg-white/10 text-white rounded-lg px-3 py-2">
                                    <span className="animate-pulse">...</span>
                                </div>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>
                    <div className="p-2 border-t border-white/20 flex items-center gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask a question..."
                            className="flex-1 bg-white/10 border border-white/20 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-white/50"
                            disabled={isLoading}
                        />
                        <button onClick={handleSend} disabled={isLoading} className="bg-white text-black p-2 rounded-full hover:bg-gray-200 disabled:opacity-50 transition-colors">
                            <SendIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIChatbot;
