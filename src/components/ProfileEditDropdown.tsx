import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreVertical, Save, Eye, Share2, Settings, Crown } from 'lucide-react';
import { SubscriptionTier } from '@/types/subscription';

interface ProfileEditDropdownProps {
  onSave: () => void;
  onPreview: () => void;
  onShare: () => void;
  onSettings: () => void;
  onUpgrade: () => void;
  currentTier: SubscriptionTier;
  hasUnsavedChanges: boolean;
}

const ProfileEditDropdown: React.FC<ProfileEditDropdownProps> = ({
  onSave,
  onPreview,
  onShare,
  onSettings,
  onUpgrade,
  currentTier,
  hasUnsavedChanges,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={onSave} disabled={!hasUnsavedChanges}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onPreview}>
          <Eye className="mr-2 h-4 w-4" />
          Preview Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onShare}>
          <Share2 className="mr-2 h-4 w-4" />
          Share Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onSettings}>
          <Settings className="mr-2 h-4 w-4" />
          Profile Settings
        </DropdownMenuItem>
        {currentTier === 'free' && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onUpgrade} className="text-purple-600">
              <Crown className="mr-2 h-4 w-4" />
              Upgrade Account
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileEditDropdown;