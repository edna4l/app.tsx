import React from 'react';
import { MessageCircle, Sparkles, Heart } from 'lucide-react';

interface Match {
  id: string;
  name: string;
  photo: string;
  lastMessage?: string;
  timestamp?: string;
  isNewMatch?: boolean;
  identity?: 'lesbian' | 'bisexual' | 'pansexual' | 'transgender' | 'rainbow';
  pronouns?: string;
}

const mockMatches: Match[] = [
  {
    id: '1',
    name: 'Alex',
    photo: '/api/placeholder/80/80',
    lastMessage: 'Hey! Thanks for the match 😊',
    timestamp: '2m ago',
    isNewMatch: true,
    identity: 'lesbian',
    pronouns: 'she/her'
  },
  {
    id: '2',
    name: 'Sam',
    photo: '/api/placeholder/80/80',
    lastMessage: 'Would love to grab coffee sometime!',
    timestamp: '1h ago',
    identity: 'bisexual',
    pronouns: 'they/them'
  },
  {
    id: '3',
    name: 'Riley',
    photo: '/api/placeholder/80/80',
    lastMessage: 'That hiking spot looks amazing!',
    timestamp: '3h ago',
    identity: 'pansexual',
    pronouns: 'she/they'
  }
];

const MatchesView: React.FC = () => {
  const identityBorderColors = {
    lesbian: 'border-orange-400',
    bisexual: 'border-purple-400',
    pansexual: 'border-pink-400',
    transgender: 'border-blue-400',
    rainbow: 'border-purple-400'
  };

  return (
    <div className="padding-responsive">
      {/* New Matches Section */}
      <div className="mb-6">
        <h2 className="wedding-heading text-lg font-semibold rainbow-header flex items-center">
          <Heart className="w-5 h-5 mr-2 text-red-400" />
          New Matches
        </h2>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {mockMatches.filter(match => match.isNewMatch).map((match) => (
            <div key={match.id} className="flex-shrink-0 text-center">
              <div className="relative">
                <img
                  src={match.photo}
                  alt={match.name}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 ${
                    match.identity ? identityBorderColors[match.identity] : 'border-pink-400'
                  } shadow-lg`}
                />
                <div className="absolute -top-1 -right-1 w-6 h-6 btn-pride rounded-full flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>
              <p className="text-sm font-medium text-white mt-2">{match.name}</p>
              <p className="text-xs text-white/70">{match.pronouns}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Messages Section */}
      <div>
        <h2 className="wedding-heading text-lg font-semibold rainbow-header flex items-center">
          <MessageCircle className="w-5 h-5 mr-2 text-blue-400" />
          Messages
        </h2>
        <div className="space-y-3">
          {mockMatches.map((match) => (
            <div
              key={match.id}
              className="glass-pride-strong p-4 rounded-xl hover:scale-105 transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={match.photo}
                  alt={match.name}
                  className={`w-12 h-12 rounded-full object-cover border-2 ${
                    match.identity ? identityBorderColors[match.identity] : 'border-pink-400'
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white">{match.name}</h3>
                    <span className="text-xs text-white/60">{match.timestamp}</span>
                  </div>
                  <p className="text-sm text-white/80 truncate">{match.lastMessage}</p>
                  <p className="text-xs text-white/60">{match.pronouns}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchesView;