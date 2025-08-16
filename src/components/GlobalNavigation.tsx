import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface GlobalNavigationProps {
  showBackButton?: boolean;
  title?: string;
  onBack?: () => void;
}

const GlobalNavigation: React.FC<GlobalNavigationProps> = ({
  showBackButton = false,
  title = '',
  onBack
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-white/20">
      <div className="flex items-center gap-3">
        {showBackButton && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="hover:bg-white/20 rounded-full p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        )}
        {title && (
          <h1 className="text-xl font-bold gradient-text-pride">{title}</h1>
        )}
      </div>
    </div>
  );
};

export default GlobalNavigation;