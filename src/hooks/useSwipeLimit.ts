import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { SUBSCRIPTION_FEATURES } from '@/types/subscription';

interface SwipeData {
  date: string;
  count: number;
}

export const useSwipeLimit = () => {
  const { user, subscription } = useAuth();
  const [dailySwipes, setDailySwipes] = useState(0);
  const [isLimitReached, setIsLimitReached] = useState(false);

  const features = SUBSCRIPTION_FEATURES[subscription || 'free'];
  const dailyLimit = features.dailySwipeLimit;

  useEffect(() => {
    if (!user) return;

    const today = new Date().toDateString();
    const stored = localStorage.getItem(`swipes_${user.id}`);
    
    if (stored) {
      const swipeData: SwipeData = JSON.parse(stored);
      if (swipeData.date === today) {
        setDailySwipes(swipeData.count);
        setIsLimitReached(dailyLimit > 0 && swipeData.count >= dailyLimit);
      } else {
        // New day, reset count
        setDailySwipes(0);
        setIsLimitReached(false);
        localStorage.setItem(`swipes_${user.id}`, JSON.stringify({
          date: today,
          count: 0
        }));
      }
    } else {
      localStorage.setItem(`swipes_${user.id}`, JSON.stringify({
        date: today,
        count: 0
      }));
    }
  }, [user, dailyLimit]);

  const incrementSwipe = () => {
    if (!user || (dailyLimit > 0 && dailySwipes >= dailyLimit)) return false;

    const newCount = dailySwipes + 1;
    const today = new Date().toDateString();
    
    setDailySwipes(newCount);
    setIsLimitReached(dailyLimit > 0 && newCount >= dailyLimit);
    
    localStorage.setItem(`swipes_${user.id}`, JSON.stringify({
      date: today,
      count: newCount
    }));

    return true;
  };

  const getRemainingSwipes = () => {
    if (dailyLimit === -1) return -1; // Unlimited
    return Math.max(0, dailyLimit - dailySwipes);
  };

  return {
    dailySwipes,
    isLimitReached,
    remainingSwipes: getRemainingSwipes(),
    incrementSwipe,
    isUnlimited: dailyLimit === -1
  };
};