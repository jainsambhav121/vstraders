
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

const MAX_RECENTLY_VIEWED = 10;

interface RecentlyViewedContextType {
  recentlyViewed: string[];
  addRecentlyViewed: (productId: string) => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('vstraders-recently-viewed');
    if (stored) {
      setRecentlyViewed(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('vstraders-recently-viewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const addRecentlyViewed = useCallback((productId: string) => {
    setRecentlyViewed(prev => {
      const updated = [productId, ...prev.filter(id => id !== productId)];
      return updated.slice(0, MAX_RECENTLY_VIEWED);
    });
  }, []);

  const value = {
    recentlyViewed,
    addRecentlyViewed,
  };

  return <RecentlyViewedContext.Provider value={value}>{children}</RecentlyViewedContext.Provider>;
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext);
  if (context === undefined) {
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider');
  }
  return context;
}
