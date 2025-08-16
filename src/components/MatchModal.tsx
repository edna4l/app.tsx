import React from 'react';
import { Heart, MessageCircle, X, Sparkles } from 'lucide-react';

interface MatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  matchedUser: {
    name: string;
    photo: string;
  };
  currentUser: {
    name: string;
    photo: string;
  };
}

const MatchModal: React.FC<MatchModalProps> = ({ 
  isOpen, 
  onClose, 
  matchedUser, 
  currentUser 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 max-w-sm w-full mx-4 text-center relative overflow-hidden border border-white/20 shadow-2xl">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200/80 via-purple-200/80 to-indigo-200/80" />
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-200/40 via-green-200/40 to-blue-200/40" />
        
        {/* Sparkles */}
        <div className="absolute top-4 left-8">
          <Sparkles className="w-4 h-4 text-pink-400" />
        </div>
        <div className="absolute top-12 right-12">
          <Sparkles className="w-3 h-3 text-purple-400" />
        </div>
        <div className="absolute bottom-16 left-6">
          <Sparkles className="w-5 h-5 text-indigo-400" />
        </div>
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 hover:scale-110 transition-all duration-200 z-10 backdrop-blur-sm"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Content */}
        <div className="relative z-10">
          {/* Celebration emoji with enhanced animation */}
          <div className="text-6xl mb-4 animate-bounce">🎉</div>
          
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2 drop-shadow-sm">
            It's a Match!
          </h2>
          
          <p className="text-gray-700 mb-6 font-medium">
            You and {matchedUser.name} liked each other
          </p>

          {/* Enhanced profile photos */}
          <div className="flex items-center justify-center space-x-6 mb-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity animate-pulse" />
              <img
                src={currentUser.photo}
                alt={currentUser.name}
                className="relative w-24 h-24 rounded-full object-cover border-4 border-white shadow-xl hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-4 rounded-full shadow-lg hover:scale-110 hover:rotate-12 transition-all duration-300 animate-pulse">
              <Heart className="w-8 h-8 text-white" />
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity animate-pulse delay-500" />
              <img
                src={matchedUser.photo}
                alt={matchedUser.name}
                className="relative w-24 h-24 rounded-full object-cover border-4 border-white shadow-xl hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Enhanced action buttons */}
          <div className="space-y-4">
            <button className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-4 px-6 rounded-full font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <MessageCircle className="w-5 h-5 mr-2 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative z-10">Send Message</span>
            </button>
            
            <button
              onClick={onClose}
              className="w-full bg-white/80 backdrop-blur-sm text-gray-700 py-3 px-6 rounded-full font-semibold hover:bg-white hover:scale-105 hover:shadow-lg transition-all duration-300 border border-gray-200"
            >
              Keep Swiping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchModal;