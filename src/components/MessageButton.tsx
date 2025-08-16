import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

interface MessageButtonProps {
  userId: string;
  userName: string;
  className?: string;
}

const MessageButton: React.FC<MessageButtonProps> = ({ userId, userName, className }) => {
  return (
    <Button className={className} onClick={() => console.log(`Message ${userName}`)}>
      <MessageCircle className="w-5 h-5 mr-2" />
      Send Message
    </Button>
  );
};

export default MessageButton;