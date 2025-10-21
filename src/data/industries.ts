export interface Industry {
    slug: string;
    title: string;
    icon: string;
    pain: string;
    solution: string;
  }
  
  export const industries: Industry[] = [
    {
      slug: 'oil-gas-energy',
      title: 'Oil & Gas / Energy',
      icon: 'OilBarrel',
      pain: 'Trust & CSR transparency',
      solution: 'Investor dashboards, CSR portals',
    },
    {
      slug: 'banking-fintech',
      title: 'Banking & Fintech',
      icon: 'Landmark',
      pain: 'Outdated banking experiences',
      solution: 'Mobile-first, secure banking portals',
    },
    {
      slug: 'real-estate',
      title: 'Real Estate',
      icon: 'Building2',
      pain: 'Low property visibility',
      solution: 'Showcase sites, VR/3D property tours',
    },
    {
      slug: 'agriculture',
      title: 'Agriculture',
      icon: 'Sprout',
      pain: 'Farmer-to-buyer disconnect',
      solution: 'Market linkage, e-commerce platforms',
    },
    {
      slug: 'telecoms-tech',
      title: 'Telecoms & Tech',
      icon: 'Radio',
      pain: 'Customer support inefficiency',
      solution: 'Interactive dashboards, self-service',
    },
    {
      slug: 'entertainment-lifestyle',
      title: 'Entertainment & Lifestyle',
      icon: 'Music',
      pain: 'Poor fan engagement',
      solution: 'Streaming-ready & ticketing platforms',
    },
  ];