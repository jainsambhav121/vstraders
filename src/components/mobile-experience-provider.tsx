
'use client';

import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import SplashScreen from '@/components/splash-screen';
import OnboardingScreen from '@/components/onboarding-screen';

const ONBOARDING_COMPLETED_KEY = 'onboardingCompleted';

export function MobileExperienceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && isMobile) {
      const onboardingCompleted = localStorage.getItem(ONBOARDING_COMPLETED_KEY) === 'true';

      if (onboardingCompleted) {
        setShowSplash(false);
        setShowOnboarding(false);
        return;
      }

      const splashTimer = setTimeout(() => {
        setShowSplash(false);
        setShowOnboarding(true);
      }, 2000); // Show splash for 2 seconds

      return () => clearTimeout(splashTimer);
    } else if (isClient) {
      setShowSplash(false);
    }
  }, [isMobile, isClient]);

  const handleOnboardingComplete = () => {
    localStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
    setShowOnboarding(false);
  };

  if (!isClient) {
    return null;
  }

  if (isMobile) {
    if (showSplash) {
      return <SplashScreen />;
    }
    if (showOnboarding) {
      return <OnboardingScreen onComplete={handleOnboardingComplete} />;
    }
  }

  return <>{children}</>;
}
