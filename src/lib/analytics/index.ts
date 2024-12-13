import mixpanel from 'mixpanel-browser';

type SearchEvent = {
  query: string;
  filters?: Record<string, unknown>;
};

type RoasterViewEvent = {
  roasterId: string;
  roasterName: string;
};

type UserJourneyEvent = {
  entryPoint: string;
  pageSequence: string[];
};

// Only initialize on client side
const initAnalytics = () => {
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_MIXPANEL_TOKEN) {
    mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN, {
      debug: process.env.NODE_ENV !== 'production',
      track_pageview: true
    });
  }
};

// Initialize analytics
initAnalytics();

export const analytics = {
  trackSearch: (data: SearchEvent) => {
    if (typeof window === 'undefined') return;
    
    mixpanel.track('Search Initiated', {
      ...data,
      timestamp: new Date().toISOString()
    });
  },

  trackRoasterView: (data: RoasterViewEvent) => {
    if (typeof window === 'undefined') return;

    mixpanel.track('Roaster Viewed', {
      ...data,
      timestamp: new Date().toISOString()
    });
  },

  trackUserJourney: (data: UserJourneyEvent) => {
    if (typeof window === 'undefined') return;

    mixpanel.track('User Journey', {
      ...data,
      timeOnSite: performance.now(),
      timestamp: new Date().toISOString()
    });
  }
};