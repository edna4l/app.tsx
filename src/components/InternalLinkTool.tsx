import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Copy, Check, ExternalLink } from 'lucide-react';

const APP_PAGES = [
  { name: 'Home', path: '/', description: 'Main dashboard and swipe interface' },
  { name: 'Matches', path: '/matches', description: 'View your matches and conversations' },
  { name: 'Community', path: '/community', description: 'Discover events and connect with community' },
  { name: 'Profile', path: '/profile', description: 'Edit your profile and preferences' },
  { name: 'Chat', path: '/chat', description: 'Message your matches' },
  { name: 'Settings', path: '/settings', description: 'App settings and preferences' }
];

export const InternalLinkTool: React.FC = () => {
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  const copyToClipboard = async (path: string) => {
    try {
      const fullUrl = `${window.location.origin}${path}`;
      await navigator.clipboard.writeText(fullUrl);
      setCopiedPath(path);
      setTimeout(() => setCopiedPath(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const navigateToPage = (path: string) => {
    window.location.href = path;
  };

  return (
    <Card className="p-6 glass-card">
      <div className="flex items-center gap-2 mb-4">
        <ExternalLink className="w-5 h-5 text-purple-400" />
        <h3 className="text-lg font-semibold text-white">Internal Navigation</h3>
      </div>
      <p className="text-sm text-gray-300 mb-6">Navigate between app pages or copy links to share</p>
      
      <div className="space-y-3">
        {APP_PAGES.map((page) => (
          <div key={page.path} className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-purple-500/20">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="text-xs border-purple-400 text-purple-400">
                  {page.name}
                </Badge>
                <span className="text-xs text-gray-400 font-mono">{page.path}</span>
              </div>
              <p className="text-sm text-gray-300">{page.description}</p>
            </div>
            <div className="flex gap-2 ml-4">
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigateToPage(page.path)}
                className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
              >
                Go
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(page.path)}
                className="border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-white"
              >
                {copiedPath === page.path ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default InternalLinkTool;