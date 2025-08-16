import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Star, Zap } from 'lucide-react';
import { SubscriptionTier, SUBSCRIPTION_FEATURES, SUBSCRIPTION_PRICES } from '@/types/subscription';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const SubscriptionPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedTier, setSelectedTier] = useState<SubscriptionTier>('premium');
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const tiers = [
    {
      id: 'free' as SubscriptionTier,
      name: 'Free',
      icon: <Zap className="h-6 w-6" />,
      color: 'bg-gray-100 text-gray-800',
      price: 0,
      description: 'Basic features to get started',
    },
    {
      id: 'premium' as SubscriptionTier,
      name: 'Premium',
      icon: <Star className="h-6 w-6" />,
      color: 'bg-purple-100 text-purple-800',
      price: SUBSCRIPTION_PRICES.premium,
      description: 'Enhanced matching and communication',
      popular: true,
    },
    {
      id: 'elite' as SubscriptionTier,
      name: 'Elite',
      icon: <Crown className="h-6 w-6" />,
      color: 'bg-yellow-100 text-yellow-800',
      price: SUBSCRIPTION_PRICES.elite,
      description: 'Premium features plus exclusive perks',
    },
  ];

  const handleSubscribe = (tier: SubscriptionTier) => {
    if (tier === 'free') {
      toast({
        title: "You're already on the free plan!",
        description: "Upgrade to Premium or Elite for more features.",
      });
      return;
    }

    // Simulate subscription process
    toast({
      title: `Subscribed to ${tier.charAt(0).toUpperCase() + tier.slice(1)}!`,
      description: "Your subscription is now active.",
    });
    
    navigate('/profile');
  };

  const getFeatureList = (tier: SubscriptionTier) => {
    const features = SUBSCRIPTION_FEATURES[tier];
    const featureList = [
      `${features.maxPhotos} photos`,
      features.unlimitedLikes ? 'Unlimited likes' : 'Limited likes',
      features.advancedFilters ? 'Advanced filters' : null,
      features.videoChat ? 'Video chat' : null,
      features.priorityMatching ? 'Priority matching' : null,
      features.readReceipts ? 'Read receipts' : null,
      features.boostProfile ? 'Profile boost' : null,
      features.hideAds ? 'No ads' : null,
      features.incognitoMode ? 'Incognito mode' : null,
      features.seeWhoLikedYou ? 'See who liked you' : null,
      `${features.superLikes} super likes per day`,
      features.rewindSwipes ? 'Rewind swipes' : null,
    ].filter(Boolean);

    return featureList;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Choose Your Plan</h1>
          <p className="text-gray-600">Unlock premium features and find your perfect match</p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm">
            <Button
              variant={billingPeriod === 'monthly' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setBillingPeriod('monthly')}
            >
              Monthly
            </Button>
            <Button
              variant={billingPeriod === 'yearly' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setBillingPeriod('yearly')}
            >
              Yearly
              <Badge className="ml-2 bg-green-100 text-green-800">Save 17%</Badge>
            </Button>
          </div>
        </div>

        {/* Subscription Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <Card
              key={tier.id}
              className={`relative ${
                tier.popular ? 'ring-2 ring-purple-500 shadow-lg' : ''
              }`}
            >
              {tier.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <div className="flex justify-center mb-2">
                  {tier.icon}
                </div>
                <CardTitle className="text-xl">{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
                
                <div className="mt-4">
                  {tier.id === 'free' ? (
                    <div className="text-3xl font-bold">Free</div>
                  ) : (
                    <div className="text-3xl font-bold">
                      ${tier.price[billingPeriod]}
                      <span className="text-sm font-normal text-gray-600">
                        /{billingPeriod === 'monthly' ? 'month' : 'year'}
                      </span>
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-2 mb-6">
                  {getFeatureList(tier.id).map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSubscribe(tier.id)}
                  className="w-full"
                  variant={tier.popular ? 'default' : 'outline'}
                >
                  {tier.id === 'free' ? 'Current Plan' : `Get ${tier.name}`}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            ← Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;