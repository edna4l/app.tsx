import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Compass, 
  Heart, 
  MessageCircle, 
  User, 
  Calendar,
  Users
} from 'lucide-react';

// TODO: Replace with your actual user logic
const user = null; // e.g. useAuthContext() or prop

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navItems = [
    { path: '/', icon: Compass, label: 'Discover' },
    { path: '/matches', icon: Heart, label: 'Matches' },
    { path: '/chat', icon: MessageCircle, label: 'Chat' },
    { path: '/social', icon: Users, label: 'Social' },
    { path: '/events', icon: Calendar, label: 'Events' },
    { path: '/profile', icon: User, label: 'Profile' },
    // Add Sign In only if not signed in
    ...(!user ? [{ path: '/signin', icon: User, label: 'Sign In' }] : []),
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className={`fixed bottom-0 left-0 right-0 glass-pride-strong border-t border-white/20 z-40 transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : 'translate-y-full'
    }`}>
      <div className="flex justify-around items-center py-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'text-white scale-110' 
                  : 'text-white/60 hover:text-white hover:scale-105'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-pink-400' : ''}`} />
              <span className="text-xs mt-1">{label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
export { BottomNavigation };
