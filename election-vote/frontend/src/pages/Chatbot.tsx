import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Loader2, Trash2, Globe } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const ELECTION_KB: Record<string, string> = {
  vote: "In India, voting is conducted using Electronic Voting Machines (EVMs). Registered voters go to their designated polling station, verify identity, receive a ballot token, and press the button next to their chosen candidate. The EVM records the vote electronically.",
  evm: "An Electronic Voting Machine (EVM) is a simple electronic device used to conduct elections. It consists of a Control Unit with the polling officer and a Balloting Unit in the voting compartment. EVMs were first used in India in 1982 (Paravur, Kerala) and nationwide from 2004.",
  register: "To register as a voter in India: 1) Visit voters.eci.gov.in 2) Fill Form 6 for new registration 3) Provide proof of age and address 4) Submit the form online or at your local BLO (Booth Level Officer). You must be 18+ and an Indian citizen.",
  eci: "The Election Commission of India (ECI) is an autonomous constitutional body responsible for administering election processes in India. It was established on January 25, 1950. The Chief Election Commissioner heads the commission.",
  lok: "The Lok Sabha is the lower house of India's Parliament. It has 543 elected seats. Members are elected by the general public through direct elections every 5 years. To form a government, a party/coalition needs a majority of 272 seats.",
  candidate: "To become a candidate: 1) File nomination with the Returning Officer 2) Pay security deposit (₹25,000 for Lok Sabha) 3) Submit affidavit of criminal records and assets 4) Withdrawal can happen within 2 days of scrutiny. The candidate must be an Indian citizen, 25+ years for Lok Sabha.",
  mcc: "The Model Code of Conduct (MCC) is a set of guidelines issued by ECI for political parties and candidates during elections. It comes into force from the date of announcement of election schedule and remains in force till the date of announcement of results.",
  vvpat: "VVPAT (Voter Verified Paper Audit Trail) is a machine attached to the EVM that provides visual verification of the vote cast. It prints a paper slip showing the candidate's name and symbol that the voter can see for 7 seconds before it drops into a sealed box.",
  counting: "Vote counting takes place at a designated Counting Centre. EVMs from all polling stations are brought in after election. Candidates and their counting agents monitor the process. The candidate with the highest votes wins (First Past the Post system).",
  tamil: "தேர்தல் செயல்முறை: வாக்காளர் பதிவு → வேட்பு மனு → பிரச்சாரம் → வாக்களிப்பு → வாக்கு எண்ணிக்கை → முடிவு அறிவிப்பு. இந்தியாவில் EVM மூலம் வாக்களிக்கப்படுகிறது.",
};

function getAIResponse(message: string): string {
  const lower = message.toLowerCase();
  
  for (const [key, value] of Object.entries(ELECTION_KB)) {
    if (lower.includes(key)) return value;
  }

  if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey')) {
    return "Hello! 👋 I'm VoterEd AI, your election education assistant. Ask me about voting process, EVM machines, candidate registration, Model Code of Conduct, or any other election-related topic!";
  }
  if (lower.includes('thanks') || lower.includes('thank you')) {
    return "You're welcome! 😊 Feel free to ask more questions about the election process. An informed voter is the backbone of democracy!";
  }
  if (lower.includes('party') || lower.includes('political')) {
    return "India has a multi-party system. Major parties include INC (Congress), BJP, regional parties like DMK, AIADMK, SP, BSP etc. The ECI recognizes parties as 'National Party' or 'State Party' based on vote share criteria.";
  }
  if (lower.includes('age') || lower.includes('eligible')) {
    return "To vote in India: You must be at least 18 years old on the qualifying date (January 1 of the year of revision), an Indian citizen, and a resident of the constituency. To contest for Lok Sabha, minimum age is 25 years.";
  }
  if (lower.includes('constitution') || lower.includes('article')) {
    return "Key constitutional provisions for elections: Article 324 (Election Commission), Article 325 (No discrimination in electoral rolls), Article 326 (Adult suffrage), Articles 327-329 (Parliament and State Legislature powers regarding elections).";
  }

  return "That's an interesting question about elections! 🗳️ I can help you with topics like: voter registration, EVM machines, candidate nomination, Model Code of Conduct (MCC), VVPAT, vote counting process, and the role of Election Commission of India. What would you like to know?";
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'ai',
      content: "Hello! 👋 I'm VoterEd AI, your intelligent election education assistant. I can answer questions about the Indian election process, voter registration, EVMs, candidate rules, and much more. What would you like to learn today?",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ta'>('en');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking delay
    await new Promise(r => setTimeout(r, 800 + Math.random() * 800));

    const response = language === 'ta' && input.toLowerCase().includes('tamil')
      ? ELECTION_KB.tamil
      : getAIResponse(input);

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'ai',
      content: response,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  const suggestions = [
    'How do I register to vote?',
    'What is an EVM?',
    'Explain the Model Code of Conduct',
    'How does vote counting work?',
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-600 to-indigo-600 rounded-2xl p-3">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-950" />
            </div>
            <div>
              <h2 className="text-white font-bold">VoterEd AI Assistant</h2>
              <p className="text-emerald-400 text-xs">Online • Ready to help</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLanguage(l => l === 'en' ? 'ta' : 'en')}
              className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-lg text-sm text-slate-300 hover:border-primary-500 transition-colors"
            >
              <Globe className="w-4 h-4" />
              {language === 'en' ? 'EN' : 'தமிழ்'}
            </button>
            <button
              onClick={() => setMessages(prev => [prev[0]])}
              className="p-2 text-slate-500 hover:text-red-400 transition-colors"
              title="Clear chat"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2" style={{ minHeight: '400px', maxHeight: '500px' }}>
          <AnimatePresence initial={false}>
            {messages.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-end gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  msg.role === 'ai'
                    ? 'bg-gradient-to-br from-primary-600 to-indigo-600'
                    : 'bg-slate-700'
                }`}>
                  {msg.role === 'ai'
                    ? <Bot className="w-4 h-4 text-white" />
                    : <User className="w-4 h-4 text-white" />}
                </div>
                <div className={`max-w-[75%] px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'chat-bubble-user text-white'
                    : 'chat-bubble-ai text-slate-200'
                }`}>
                  {msg.content}
                  <p className="text-xs opacity-50 mt-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-end gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-600 to-indigo-600 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="chat-bubble-ai px-5 py-4">
                <div className="flex gap-1.5">
                  <div className="typing-dot w-2 h-2 rounded-full bg-slate-400" />
                  <div className="typing-dot w-2 h-2 rounded-full bg-slate-400" />
                  <div className="typing-dot w-2 h-2 rounded-full bg-slate-400" />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick Suggestions */}
        {messages.length <= 2 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => { setInput(s); }}
                className="text-xs bg-slate-800 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-full hover:border-primary-500 hover:text-primary-400 transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="flex gap-3 bg-slate-900 border border-slate-800 rounded-2xl p-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            placeholder="Ask me anything about elections..."
            className="flex-1 bg-transparent text-white text-sm placeholder-slate-500 px-3 focus:outline-none"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isTyping}
            className="bg-gradient-to-r from-primary-600 to-indigo-600 text-white p-3 rounded-xl hover:opacity-90 transition-all disabled:opacity-40 active:scale-95"
          >
            {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
