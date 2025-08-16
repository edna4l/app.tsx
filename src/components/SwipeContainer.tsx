import React, { useState, useRef } from 'react';
import ProfileCard from './ProfileCard';
import { useSwipeLimit } from '@/hooks/useSwipeLimit';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
interface Profile {
  id: string;
  name: string;
  age: number;
  bio: string;
  photos: string[];
  location: string;
  interests: string[];
  pronouns: string;
  identity?: 'lesbian' | 'bisexual' | 'pansexual' | 'transgender' | 'rainbow';
}

// Mock data with identity information
const mockProfiles: Profile[] = [
  {
    id: '1',
    name: 'Alex',
    age: 28,
    bio: 'Artist and coffee enthusiast. Love hiking and finding hidden gems in the city. Looking for someone to share adventures with! 🌈✨',
    photos: ['/api/placeholder/400/600'],
    location: 'Brooklyn, NY',
    interests: ['Art', 'Coffee', 'Hiking', 'Photography', 'Music', 'Travel'],
    pronouns: 'she/her',
    identity: 'lesbian'
  },
  {
    id: '2', 
    name: 'Sam',
    age: 25,
    bio: 'Bookworm by day, DJ by night. Always down for deep conversations or dancing until sunrise. Feminist and proud! 💜',
    photos: ['/api/placeholder/400/600'],
    location: 'Manhattan, NY',
    interests: ['Reading', 'Music', 'Dancing', 'Activism', 'Cooking', 'Yoga'],
    pronouns: 'they/them',
    identity: 'bisexual'
  },
  {
    id: '3',
    name: 'Riley',
    age: 30,
    bio: 'Software engineer who loves rock climbing and indie films. Seeking genuine connections and meaningful conversations. 🏳️‍🌈',
    photos: ['/api/placeholder/400/600'],
    location: 'Queens, NY',
    interests: ['Tech', 'Climbing', 'Films', 'Gaming', 'Fitness', 'Cats'],
    pronouns: 'she/they',
    identity: 'pansexual'
  }
];

const SwipeContainer: React.FC = () => {
  const [profiles, setProfiles] = useState(mockProfiles);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { isLimitReached, remainingSwipes, incrementSwipe, isUnlimited } = useSwipeLimit();
  const handleSwipeLeft = () => {
    if (isLimitReached) return;
    if (!incrementSwipe()) return;
    
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setProfiles([]);
    }
  };

  const handleSwipeRight = () => {
    if (isLimitReached) return;
    if (!incrementSwipe()) return;
    
    console.log('Matched with:', profiles[currentIndex]?.name);
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setProfiles([]);
    }
  };

  const currentProfile = profiles[currentIndex];

  // Show limit reached message
  if (isLimitReached && !isUnlimited) {
    return (
      <div className="flex-1 flex items-center justify-center glass-pride-strong p-8 m-4 rounded-xl">
        <div className="text-center p-8 max-w-md">
          <div className="text-6xl mb-4">⏰</div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Daily Swipe Limit Reached!
          </h2>
          <p className="text-white/80 mb-6">
            You've used all 50 of your daily swipes. Upgrade to Premium for unlimited swipes!
          </p>
          <Button className="btn-pride">
            Upgrade to Premium
          </Button>
        </div>
      </div>
    );
  }

  if (!currentProfile) {
    return (
      <div className="flex-1 flex items-center justify-center glass-pride-strong p-8 m-4 rounded-xl">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🌈</div>
          <h2 className="text-2xl font-bold text-white mb-2">
            No more profiles!
          </h2>
          <p className="text-white/80">
            Check back later for more amazing people to connect with.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 relative p-2 min-h-[700px]">
      {/* Swipe counter */}
      {!isUnlimited && (
        <Card className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-3">
            <p className="text-sm font-medium">
              {remainingSwipes} swipes left today
            </p>
          </CardContent>
        </Card>
      )}
      
      <ProfileCard
        profile={currentProfile}
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
        style={{
          transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${dragOffset.x * 0.1}deg)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out'
        }}
      />
    </div>
  );
};

export default SwipeContainer;