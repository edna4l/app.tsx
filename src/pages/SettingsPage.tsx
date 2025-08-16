import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Crown, 
  Settings, 
  Bell, 
  Shield, 
  Eye, 
  CreditCard,
  User,
  LogOut,
  ChevronRight,
  Smartphone,
  Globe,
  Heart,
  MessageCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { SubscriptionTier } from '@/types/subscription';
import PaymentPreferences from '@/components/PaymentPreferences';
import SubscriptionManagement from '@/components/SubscriptionManagement';
import BillingHistory from '@/components/BillingHistory';
import PricingTiers from '@/components/PricingTiers';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  
  // Mock subscription state - would come from context/database
  const [currentTier, setCurrentTier] = useState<SubscriptionTier>('free');
  
  // Enhanced settings state
  const [settings, setSettings] = useState({
    notifications: {
      matches: true,
      messages: true,
      likes: false,
      events: true,
      marketing: false,
      pushNotifications: true,
      emailNotifications: true,
      smsNotifications: false
    },
    privacy: {
      showOnline: true,
      showDistance: true,
      showAge: true,
      profileDiscoverable: true,
      showReadReceipts: false,
      incognitoMode: false,
      hideFromSearch: false
    },
    safety: {
      photoVerification: false,
      twoFactor: false,
      blockScreenshots: false,
      requireVerification: false,
      autoBlockSuspicious: true
    },
    app: {
      darkMode: false,
      reducedMotion: false,
      highContrast: false,
      largeText: false,
      autoPlayVideos: true,
      soundEffects: true
    },
    matching: {
      ageRange: [18, 35],
      maxDistance: 50,
      showMeOnPride: true,
      prioritizeVerified: false,
      hideAlreadySeen: true
    }
  });

  const tierInfo = {
    free: { name: 'Free', color: 'bg-gray-100 text-gray-800' },
    premium: { name: 'Premium', color: 'bg-blue-100 text-blue-800' },
    elite: { name: 'Elite', color: 'bg-purple-100 text-purple-800' }
  };

  const handleUpgrade = () => {
    navigate('/subscription');
  };

  const updateNotificationSetting = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value }
    }));
  };

  const updatePrivacySetting = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      privacy: { ...prev.privacy, [key]: value }
    }));
  };

  const updateSafetySetting = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      safety: { ...prev.safety, [key]: value }
    }));
  };

  const updateAppSetting = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      app: { ...prev.app, [key]: value }
    }));
  };

  const updateMatchingSetting = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      matching: { ...prev.matching, [key]: value }
    }));
  };

  const handleSignOut = async () => {
    if (confirm('Are you sure you want to sign out?')) {
      await signOut();
      navigate('/signin');
    }
  };

  const formatSettingName = (key: string) => {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Settings</h1>
          <Button variant="ghost" onClick={() => navigate(-1)}>
            Done
          </Button>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(settings.notifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span>{formatSettingName(key)}</span>
                    <Switch 
                      checked={value}
                      onCheckedChange={(checked) => updateNotificationSetting(key, checked)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* App Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  App Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(settings.app).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span>{formatSettingName(key)}</span>
                    <Switch 
                      checked={value}
                      onCheckedChange={(checked) => updateAppSetting(key, checked)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Matching Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Matching Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(settings.matching).filter(([key]) => typeof settings.matching[key] === 'boolean').map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span>{formatSettingName(key)}</span>
                    <Switch 
                      checked={value}
                      onCheckedChange={(checked) => updateMatchingSetting(key, checked)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            {/* Privacy Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Privacy Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(settings.privacy).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span>{formatSettingName(key)}</span>
                    <Switch 
                      checked={value}
                      onCheckedChange={(checked) => updatePrivacySetting(key, checked)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Safety & Security */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Safety & Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(settings.safety).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span>{formatSettingName(key)}</span>
                    <Switch 
                      checked={value}
                      onCheckedChange={(checked) => updateSafetySetting(key, checked)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            {/* Subscription Management */}
            <SubscriptionManagement 
              currentTier={currentTier}
              onUpgrade={handleUpgrade}
            />

            {/* Billing History */}
            <BillingHistory />

            {/* Pricing Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Available Plans</CardTitle>
              </CardHeader>
              <CardContent>
                <PricingTiers 
                  currentTier={currentTier}
                  onTierSelect={(tier, period) => {
                    console.log('Selected tier:', tier, period);
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            {/* Account Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Account Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  variant="ghost" 
                  className="w-full justify-between" 
                  onClick={() => navigate('/profile/edit')}
                >
                  Edit Profile
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between"
                  onClick={() => navigate('/verification')}
                >
                  Verification
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between"
                  onClick={() => toast({ title: "Coming Soon", description: "Account deletion will be available soon." })}
                >
                  Delete Account
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Sign Out */}
            <Card>
              <CardContent className="pt-6">
                <Button 
                  variant="destructive" 
                  className="w-full"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsPage;