export type SubscriptionTier = 'free' | 'premium' | 'elite';

export interface SubscriptionFeatures {
  maxPhotos: number;
  advancedFilters: boolean;
  videoChat: boolean;
  priorityMatching: boolean;
  readReceipts: boolean;
  unlimitedLikes: boolean;
  boostProfile: boolean;
  hideAds: boolean;
  incognitoMode: boolean;
  superLikes: number;
  rewindSwipes: boolean;
  seeWhoLikedYou: boolean;
  swipeProfiles: boolean;
  dailySwipeLimit: number;
}

export const SUBSCRIPTION_FEATURES: Record<SubscriptionTier, SubscriptionFeatures> = {
  free: {
    maxPhotos: 3,
    advancedFilters: false,
    videoChat: false,
    priorityMatching: false,
    readReceipts: false,
    unlimitedLikes: false,
    boostProfile: false,
    hideAds: false,
    incognitoMode: false,
    superLikes: 1,
    rewindSwipes: false,
    seeWhoLikedYou: false,
    swipeProfiles: true,
    dailySwipeLimit: 50,
  },
  premium: {
    maxPhotos: 6,
    advancedFilters: true,
    videoChat: true,
    priorityMatching: true,
    readReceipts: true,
    unlimitedLikes: true,
    boostProfile: false,
    hideAds: true,
    incognitoMode: false,
    superLikes: 5,
    rewindSwipes: true,
    seeWhoLikedYou: true,
    swipeProfiles: true,
    dailySwipeLimit: -1,
  },
  elite: {
    maxPhotos: 10,
    advancedFilters: true,
    videoChat: true,
    priorityMatching: true,
    readReceipts: true,
    unlimitedLikes: true,
    boostProfile: true,
    hideAds: true,
    incognitoMode: true,
    superLikes: 10,
    rewindSwipes: true,
    seeWhoLikedYou: true,
    swipeProfiles: true,
    dailySwipeLimit: -1,
  }
};

export const SUBSCRIPTION_PRICES = {
  premium: { monthly: 19.99, yearly: 199.99 },
  elite: { monthly: 39.99, yearly: 399.99 },
};