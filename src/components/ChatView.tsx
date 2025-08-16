import React, { useState } from 'react';
import { Send, ArrowLeft, Heart, Smile } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'them';
  timestamp: string;
}

const ChatView: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages] = useState<Message[]>([
    { id: '1', text: 'Hey! Thanks for the match 😊', sender: 'them', timestamp: '2:30 PM' },
    { id: '2', text: 'Hi! I love your photos, especially the hiking one!', sender: 'me', timestamp: '2:32 PM' },
    { id: '3', text: 'Thank you! That was from my trip to the Catskills. Do you like hiking too?', sender: 'them', timestamp: '2:35 PM' },
    { id: '4', text: 'Yes! I try to get out every weekend. Would love to hear about your favorite trails!', sender: 'me', timestamp: '2:37 PM' },
  ]);

  const handleSend = () => {
    if (message.trim()) {
      // Handle sending message
      setMessage('');
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="glass-pride-strong shadow-sm padding-responsive flex items-center mb-4 rounded-xl">
        <button className="p-2 rounded-full hover:bg-white/20 transition-colors mr-3">
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <img
          src="/api/placeholder/40/40"
          alt="Alex"
          className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-white/30"
        />
        <div className="flex-1">
          <h2 className="font-semibold rainbow-header">Alex</h2>
          <p className="text-sm text-green-300">Online now</p>
        </div>
        <button className="p-2 rounded-full hover:bg-white/20 transition-colors">
          <Heart className="w-5 h-5 text-pink-300" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                msg.sender === 'me'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-br-md'
                  : 'bg-white text-gray-800 rounded-bl-md shadow-sm'
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <p className={`text-xs mt-1 ${
                msg.sender === 'me' ? 'text-pink-100' : 'text-gray-500'
              }`}>
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="glass-pride border-t border-white/30 px-4 py-4 m-4 rounded-xl">
        <div className="flex items-center space-x-3">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Smile className="w-5 h-5 text-gray-500" />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className={`p-3 rounded-full transition-all ${
              message.trim()
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-200 text-gray-400'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatView;