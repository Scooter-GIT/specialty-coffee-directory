import mixpanel from 'mixpanel-browser';

// Initialize Mixpanel
if (process.env.NEXT_PUBLIC_MIXPANEL_TOKEN) {
  mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN);
}

export const analytics = {
  trackSearch: (query: string, filters: object) => {
    mixpanel.track('Search Initiated', {
      query,
      filters,
      timestamp: new Date().toISOString()
    });
  },

  trackRoasterView: (roasterId: string, roasterName: string) => {
    mixpanel.track('Roaster Viewed', {
      roasterId,
      roasterName,
      timestamp: new Date().toISOString()
    });
  },

  trackUserJourney: (entryPoint: string, pageSequence: string[]) => {
    mixpanel.track('User Journey', {
      entryPoint,
      pageSequence,
      timeOnSite: performance.now(),
      timestamp: new Date().toISOString()
    });
  }
};