import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface NavigationLinkProps {
  to: string;
  icon: LucideIcon;
  label: string;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({ to, icon: Icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 ${
        isActive
          ? 'btn-pride text-white shadow-lg transform scale-105 animate-pulse'
          : 'text-white/70 hover:text-white hover:bg-white/10 glass-pride'
      }`}
    >
      <Icon className={`w-6 h-6 mb-1 ${
        isActive ? 'animate-bounce' : ''
      }`} />
      <span className="text-xs font-medium">{label}</span>
    </Link>
  );
};

export default NavigationLink;