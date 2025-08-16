import React from 'react';
import { Button } from '@/components/ui/button';
import { MoreVertical } from 'lucide-react';

interface ProfileMenuProps {
  userId: string;
  userName: string;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ userId, userName }) => {
  return (
    <Button variant="ghost" size="sm" onClick={() => console.log(`Menu for ${userName}`)}>
      <MoreVertical className="w-4 h-4" />
    </Button>
  );
};

export default ProfileMenu;