import React from 'react';
import { Edit, Settings, Camera, MapPin, Heart, Sparkles, User } from 'lucide-react';
import PrideCard from './PrideCard';

interface ProfileViewProps {
  profile?: {
    id?: string;
    username?: string;
    full_name?: string;
    bio?: string;
    location?: string;
    avatar_url?: string;
    birthdate?: string;
    phone?: string;
    website?: string;
    preferred_contact_method?: string;
  } | null;
}

const ProfileView: React.FC<ProfileViewProps> = ({ profile }) => {
  const calculateAge = (birthdate?: string) => {
    if (!birthdate) return null;
    const today = new Date();
    const birth = new Date(birthdate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const age = profile?.birthdate ? calculateAge(profile.birthdate) : null;

  if (!profile) {
    return (
      <div className="flex-1 overflow-y-auto padding-responsive">
        <div className="glass-pride rounded-2xl p-6 shadow-sm text-center">
          <User className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="wedding-heading text-xl mb-2">Complete Your Profile</h3>
          <p className="text-gray-600">Click Edit to add your information and photos</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto padding-responsive">
      {/* Header */}
      <div className="glass-pride-strong shadow-sm padding-responsive flex items-center justify-between mb-6 rounded-xl">
        <h1 className="wedding-heading text-responsive font-bold rainbow-header">
          Your Profile
        </h1>
      </div>

      {/* Profile Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Main Photo */}
        {profile.avatar_url && (
          <div className="relative">
            <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={profile.avatar_url}
                alt={profile.full_name || 'Profile'}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </div>
        )}

        {/* Basic Info */}
        <div className="glass-pride rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="wedding-heading text-2xl font-bold text-gray-900">
                {profile.full_name || profile.username || 'Anonymous'}{age ? `, ${age}` : ''}
              </h2>
              {profile.location && (
                <div className="flex items-center text-gray-600 mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  {profile.location}
                </div>
              )}
            </div>
          </div>
          {profile.bio && (
            <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
          )}
        </div>

        {/* Contact Info */}
        {(profile.phone || profile.website) && (
          <div className="glass-pride rounded-2xl p-6 shadow-sm">
            <h3 className="wedding-heading text-lg font-semibold text-gray-900 mb-4">
              Contact Information
            </h3>
            <div className="space-y-2">
              {profile.phone && (
                <p className="text-gray-700">
                  <span className="font-medium">Phone:</span> {profile.phone}
                </p>
              )}
              {profile.website && (
                <p className="text-gray-700">
                  <span className="font-medium">Website:</span> 
                  <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline ml-1">
                    {profile.website}
                  </a>
                </p>
              )}
              {profile.preferred_contact_method && (
                <p className="text-gray-700">
                  <span className="font-medium">Preferred Contact:</span> {profile.preferred_contact_method}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Username */}
        {profile.username && (
          <div className="glass-pride rounded-2xl p-6 shadow-sm">
            <h3 className="wedding-heading text-lg font-semibold text-gray-900 mb-2">
              Username
            </h3>
            <p className="text-gray-700">@{profile.username}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileView;