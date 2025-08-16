import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Shield, Users, MessageCircle, ArrowLeft } from 'lucide-react';
import LoginForm from '@/components/LoginForm';
import CreateAccountForm from '@/components/CreateAccountForm';
import { PasswordResetForm } from '@/components/PasswordResetForm';
import { UserProfile } from '@/components/UserProfile';
import { authService, AuthUser } from '@/lib/auth';
import { Link } from 'react-router-dom';

const HeroesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error checking user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();

    const { data: { subscription } } = authService.onAuthStateChange((user) => {
      setUser(user);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = () => {
    setUser(null);
    setActiveTab('login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center text-white hover:text-gray-300 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to App
          </Link>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 rainbow-header">
              Welcome back, {user.name || user.email}!
            </h1>
            <p className="text-lg text-gray-300">
              Manage your profile and account settings
            </p>
          </div>
          <UserProfile user={user} onSignOut={handleSignOut} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900">
      {/* Navigation */}
      <div className="container mx-auto px-4 py-4">
        <Link to="/" className="inline-flex items-center text-white hover:text-gray-300 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to App
        </Link>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 rainbow-header wedding-title">
            Unleash Your Spirit with Violets and Vibes – Your Premier Online Lesbian Dating and Social Hub!
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Are you ready to connect with extraordinary individuals who share your passion for life and love? Join our dynamic community, where LGBT, LGBTQ+, and LGBTQIA+ advocates come together to forge meaningful relationships. At Violets and Vibes, we don't just celebrate diverse identities; we empower each other to thrive in a supportive and uplifting environment.<br/><br/>Don't miss your chance to be part of a network that values connection, friendship, and love. Together, let's create lasting bonds and a vibrant space where everyone can flourish! Join us today and start your journey towards building the relationships you deserve.
          </p>

          
          {/* Feature Icons */}
          <div className="flex justify-center space-x-8 mb-12">
            <div className="text-center">
              <Heart className="w-12 h-12 text-pink-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-white">Connect</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-purple-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-white">Community</p>
            </div>
            <div className="text-center">
              <MessageCircle className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-white">Chat</p>
            </div>
            <div className="text-center">
              <Shield className="w-12 h-12 text-blue-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-white">Safe</p>
            </div>
          </div>
        </div>

        {/* Auth Forms */}
        <div className="flex justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                {showPasswordReset ? 'Reset Password' : 'Join the Community'}
              </CardTitle>
              <CardDescription>
                {showPasswordReset 
                  ? 'Enter your email to reset your password'
                  : 'Sign in or create your account to get started'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {showPasswordReset ? (
                <PasswordResetForm onBack={() => setShowPasswordReset(false)} />
              ) : (
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="login">Sign In</TabsTrigger>
                    <TabsTrigger value="register">Create Account</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login">
                    <LoginForm onForgotPassword={() => setShowPasswordReset(true)} />
                  </TabsContent>
                  
                  <TabsContent value="register">
                    <CreateAccountForm />
                  </TabsContent>
                </Tabs>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HeroesPage;