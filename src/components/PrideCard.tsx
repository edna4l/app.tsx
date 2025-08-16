import React from 'react';
import { Heart, Star, MapPin, Sparkles } from 'lucide-react';

interface PrideCardProps {
  name: string;
  age: number;
  location: string;
  bio: string;
  photo: string;
  prideFlags?: string[];
  interests?: string[];
}

const PrideCard: React.FC<PrideCardProps> = ({
  name,
  age,
  location,
  bio,
  photo,
  prideFlags = [],
  interests = []
}) => {
  return (
    <div className="card-pride p-6 max-w-sm mx-auto relative overflow-hidden group hover:scale-[1.02] transition-all duration-500 bg-white/95 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl">
      {/* Identity-based gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-200/40 via-purple-200/40 to-indigo-200/40" />
      <div className="absolute inset-0 bg-gradient-to-tr from-yellow-200/30 via-green-200/30 to-blue-200/30" />
      
      {/* Floating sparkles */}
      <div className="absolute top-4 right-4">
        <Sparkles className="w-4 h-4 text-pink-400" />
      </div>
      <div className="absolute top-8 right-8">
        <Sparkles className="w-3 h-3 text-purple-400" />
      </div>
      <div className="absolute bottom-8 left-4">
        <Sparkles className="w-5 h-5 text-indigo-400" />
      </div>

      {/* Profile Image */}
      <div className="relative mb-4 z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-300/50 via-purple-300/50 to-indigo-300/50 rounded-lg blur-sm" />
        <img
          src={photo}
          alt={name}
          className="relative w-full h-64 object-cover rounded-lg shadow-lg group-hover:shadow-2xl transition-all duration-500 mix-blend-overlay group-hover:mix-blend-normal"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:scale-110 hover:rotate-12 transition-all duration-300 cursor-pointer group/heart">
          <Heart className="w-5 h-5 text-red-500 group-hover/heart:animate-pulse" />
        </div>
      </div>

      {/* Profile Info */}
      <div className="space-y-4 relative z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-800 group-hover:bg-gradient-to-r group-hover:from-pink-600 group-hover:via-purple-600 group-hover:to-indigo-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500 drop-shadow-sm">
            {name}, {age}
          </h3>
          <Star className="w-5 h-5 text-yellow-500 hover:scale-110 hover:rotate-12 transition-all duration-300 cursor-pointer" />
        </div>

        <div className="flex items-center text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
          <MapPin className="w-4 h-4 mr-2 group-hover:text-purple-500 group-hover:scale-110 transition-all duration-300" />
          <span className="text-sm font-medium">{location}</span>
        </div>

        <p className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-800 transition-colors duration-300">{bio}</p>

        {/* Pride Flags */}
        {prideFlags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {prideFlags.map((flag, index) => (
              <span
                key={index}
                className="text-xs px-3 py-1 bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 text-purple-800 rounded-full hover:from-pink-200 hover:via-purple-200 hover:to-indigo-200 hover:scale-105 transition-all duration-300 cursor-pointer font-medium border border-purple-200/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Sparkles className="w-3 h-3 inline mr-1" />
                {flag}
              </span>
            ))}
          </div>
        )}

        {/* Interests */}
        {interests.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {interests.map((interest, index) => (
              <span
                key={index}
                className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gradient-to-r hover:from-pink-100 hover:to-purple-100 hover:text-purple-700 hover:scale-105 transition-all duration-300 cursor-pointer font-medium"
                style={{ animationDelay: `${(index + prideFlags.length) * 100}ms` }}
              >
                <Sparkles className="w-3 h-3 inline mr-1" />
                {interest}
              </span>
            ))}
          </div>
        )}

        {/* Enhanced Action Buttons */}
        <div className="flex gap-3 pt-3">
          <button className="btn-pride flex-1 text-sm font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-3 px-4 rounded-lg hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 hover:scale-105 hover:shadow-lg transition-all duration-300 relative overflow-hidden group/btn">
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
            <span className="relative z-10">💜 Like</span>
          </button>
          <button className="bg-gray-200 text-gray-700 px-4 py-3 rounded-lg text-sm hover:bg-gray-300 hover:scale-105 transition-all duration-300 font-medium">
            Pass
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrideCard;