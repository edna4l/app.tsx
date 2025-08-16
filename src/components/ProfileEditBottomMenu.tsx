import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Save, X, Eye, Camera, Heart, Crown } from 'lucide-react';
import { SubscriptionTier } from '@/types/subscription';

interface ProfileEditBottomMenuProps {
  onSave: () => void;
  onCancel: () => void;
  onPreview: () => void;
  onAddPhoto: () => void;
  onBoostProfile: () => void;
  currentTier: SubscriptionTier;
  hasUnsavedChanges: boolean;
  isLoading: boolean;
}

const ProfileEditBottomMenu: React.FC<ProfileEditBottomMenuProps> = ({
  onSave,
  onCancel,
  onPreview,
  onAddPhoto,
  onBoostProfile,
  currentTier,
  hasUnsavedChanges,
  isLoading,
}) => {
  return (
    <Card className="fixed bottom-0 left-0 right-0 p-4 border-t bg-white/95 backdrop-blur-sm z-50">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <Button
          variant="outline"
          size="sm"
          onClick={onCancel}
          className="flex-1 mr-2"
        >
          <X className="h-4 w-4 mr-1" />
          Cancel
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onPreview}
          className="flex-1 mr-2"
        >
          <Eye className="h-4 w-4 mr-1" />
          Preview
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onAddPhoto}
          className="flex-1 mr-2"
        >
          <Camera className="h-4 w-4 mr-1" />
          Photo
        </Button>
        
        {currentTier === 'elite' && (
          <Button
            variant="outline"
            size="sm"
            onClick={onBoostProfile}
            className="flex-1 mr-2 text-yellow-600 border-yellow-300"
          >
            <Crown className="h-4 w-4 mr-1" />
            Boost
          </Button>
        )}
        
        <Button
          onClick={onSave}
          disabled={!hasUnsavedChanges || isLoading}
          className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600"
        >
          <Save className="h-4 w-4 mr-1" />
          {isLoading ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </Card>
  );
};

export default ProfileEditBottomMenu;