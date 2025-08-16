import React from 'react';
import ChatView from '@/components/ChatView';
import { ResponsiveWrapper } from '@/components/ResponsiveWrapper';
import BottomNavigation from '@/components/BottomNavigation';

const ChatPage: React.FC = () => {
  return (
    <div className="page-gradient min-h-screen flex flex-col relative">
      <div className="flex-1 overflow-hidden relative z-10">
        <ResponsiveWrapper maxWidth="2xl" className="h-full">
          <div className="glass-pride rounded-2xl overflow-hidden">
            <ChatView />
          </div>
        </ResponsiveWrapper>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default ChatPage;