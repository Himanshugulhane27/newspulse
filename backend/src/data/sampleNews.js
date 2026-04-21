// Sample news data served as fallback when NewsAPI is rate-limited
// These articles are used so the UI remains functional during API outages

const sampleArticles = {
  general: [
    {
      source: { id: 'sample', name: 'World News Today' },
      author: 'Sarah Mitchell',
      title: 'Global Leaders Convene for International Climate Summit 2026',
      description: 'World leaders gather to discuss ambitious climate targets and renewable energy commitments at the annual summit, with new pledges expected from major economies.',
      url: 'https://example.com/climate-summit-2026',
      urlToImage: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      content: 'Leaders from over 190 nations have gathered for what is being called the most important climate summit in a decade. New commitments on carbon reduction and clean energy investment are expected to be announced.'
    },
    {
      source: { id: 'sample', name: 'Global Report' },
      author: 'James Walker',
      title: 'UN General Assembly Opens with Focus on Global Security',
      description: 'The annual United Nations General Assembly kicks off with world leaders addressing pressing security challenges and humanitarian crises across multiple regions.',
      url: 'https://example.com/un-assembly-2026',
      urlToImage: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      content: 'The 81st session of the UN General Assembly has opened with a focus on international security, climate action, and sustainable development goals.'
    },
    {
      source: { id: 'sample', name: 'Breaking World' },
      author: 'Emily Chen',
      title: 'International Space Station Celebrates 28 Years in Orbit',
      description: 'NASA and partner agencies mark a major milestone as the ISS completes 28 years of continuous human presence in low Earth orbit.',
      url: 'https://example.com/iss-anniversary',
      urlToImage: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      content: 'The International Space Station marks its 28th anniversary of continuous habitation, with new modules and experiments continuing to push the boundaries of space science.'
    },
    {
      source: { id: 'sample', name: 'Daily Insight' },
      author: 'Michael Torres',
      title: 'Breakthrough in Quantum Computing Achieves New Milestone',
      description: 'Researchers demonstrate quantum supremacy in practical applications for the first time, potentially transforming cryptography and drug discovery.',
      url: 'https://example.com/quantum-breakthrough',
      urlToImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      content: 'A team of researchers has demonstrated quantum computing advantage in solving real-world optimization problems, marking a significant step forward for the technology.'
    },
    {
      source: { id: 'sample', name: 'World Herald' },
      author: 'Lisa Park',
      title: 'Global Ocean Cleanup Initiative Removes 10 Million Tons of Plastic',
      description: 'The international ocean cleanup effort reaches a major milestone, with significant reductions in plastic waste observed across multiple ocean regions.',
      url: 'https://example.com/ocean-cleanup',
      urlToImage: 'https://images.unsplash.com/photo-1484291470158-b8f8d608850d?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      content: 'The global initiative to clean up ocean plastic waste has reached a major milestone, with projects across the Pacific, Atlantic, and Indian Oceans contributing to the effort.'
    },
    {
      source: { id: 'sample', name: 'News Central' },
      author: 'David Kim',
      title: 'Renewable Energy Now Powers 45% of Global Electricity',
      description: 'A new report shows renewable energy sources have reached a record share of global electricity generation, driven by massive solar and wind deployments.',
      url: 'https://example.com/renewable-energy-record',
      urlToImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      content: 'Renewable energy sources now account for 45% of global electricity generation, up from 38% just two years ago, according to a new International Energy Agency report.'
    },
    {
      source: { id: 'sample', name: 'The Daily Wire' },
      author: 'Anna Rodriguez',
      title: 'New Archaeological Discovery Rewrites Ancient History Timeline',
      description: 'Excavations in Southeast Asia uncover artifacts dating back 50,000 years, challenging existing theories about early human migration patterns.',
      url: 'https://example.com/archaeology-discovery',
      urlToImage: 'https://images.unsplash.com/photo-1599930113854-d6d7fd521f10?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
      content: 'Archaeologists have unearthed tools and artifacts in a cave system that suggest human presence in the region much earlier than previously believed.'
    },
    {
      source: { id: 'sample', name: 'Global Events' },
      author: 'Robert Chang',
      title: 'World Food Program Launches Initiative to End Hunger by 2035',
      description: 'The WFP announces an ambitious new program targeting food insecurity in developing nations with innovative agricultural technology and distribution systems.',
      url: 'https://example.com/wfp-initiative',
      urlToImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      content: 'The World Food Program has announced its most ambitious initiative yet, aiming to eliminate severe food insecurity globally by 2035 through technology-driven solutions.'
    },
    {
      source: { id: 'sample', name: 'International Press' },
      author: 'Maria Fernandez',
      title: 'Global Literacy Rates Reach All-Time High of 92%',
      description: 'UNESCO reports that global literacy rates have reached their highest level ever, with particular gains in Sub-Saharan Africa and South Asia.',
      url: 'https://example.com/literacy-milestone',
      urlToImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
      content: 'Global literacy rates have reached 92%, up from 86% a decade ago, according to new data from UNESCO. Investment in education technology has been cited as a key driver.'
    },
    {
      source: { id: 'sample', name: 'World Monitor' },
      author: 'Thomas Lee',
      title: 'Trans-Pacific Rail Link Project Gets Green Light from Six Nations',
      description: 'A major international infrastructure project connecting Asia and the Americas via undersea rail receives approval, with construction set to begin in 2027.',
      url: 'https://example.com/trans-pacific-rail',
      urlToImage: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
      content: 'Six nations have signed a historic agreement to build the first-ever trans-Pacific rail link, a project estimated to cost over $200 billion and take 15 years to complete.'
    },
    {
      source: { id: 'sample', name: 'News Network' },
      author: 'Patricia Wong',
      title: 'Electric Vehicle Sales Surpass Combustion Engine Cars for First Time',
      description: 'Global EV sales overtake traditional combustion engine vehicles in a landmark shift for the automotive industry, driven by falling battery costs.',
      url: 'https://example.com/ev-sales-milestone',
      urlToImage: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 11 * 60 * 60 * 1000).toISOString(),
      content: 'For the first time in automotive history, electric vehicle sales have surpassed those of internal combustion engine vehicles globally, marking a watershed moment for the industry.'
    },
    {
      source: { id: 'sample', name: 'The Observer' },
      author: 'Kevin Brown',
      title: 'Scientists Discover New Species in Deep Ocean Expedition',
      description: 'A deep-sea expedition discovers over 30 previously unknown species in the Mariana Trench, including bioluminescent creatures never seen before.',
      url: 'https://example.com/deep-sea-discovery',
      urlToImage: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      content: 'Marine biologists have discovered over 30 new species during a four-month expedition to the deepest parts of the Mariana Trench, expanding our understanding of deep-sea ecosystems.'
    }
  ],
  technology: [
    {
      source: { id: 'sample', name: 'Tech Insider' },
      author: 'Alex Rivera',
      title: 'Apple Unveils Revolutionary AR Glasses with All-Day Battery Life',
      description: 'Apple announces its next-generation augmented reality glasses with breakthrough battery technology and seamless integration with the Apple ecosystem.',
      url: 'https://example.com/apple-ar-glasses',
      urlToImage: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      content: 'Apple has unveiled its latest AR glasses featuring an innovative solid-state battery that provides 18 hours of continuous use, along with a new spatial computing interface.'
    },
    {
      source: { id: 'sample', name: 'Wired Today' },
      author: 'Jennifer Liu',
      title: 'GPT-6 Achieves Human-Level Performance on Scientific Research Tasks',
      description: 'OpenAI latest language model demonstrates the ability to independently design and analyze scientific experiments across multiple disciplines.',
      url: 'https://example.com/gpt6-science',
      urlToImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      content: 'OpenAI has released GPT-6, which has achieved human-level performance on scientific reasoning and experimental design tasks across physics, chemistry, and biology.'
    },
    {
      source: { id: 'sample', name: 'Tech Chronicle' },
      author: 'Ryan Park',
      title: 'Tesla Full Self-Driving Gets Level 4 Certification in Europe',
      description: 'European regulators certify Tesla FSD system for fully autonomous operation in highway conditions, marking a first for consumer vehicles in the EU.',
      url: 'https://example.com/tesla-fsd-europe',
      urlToImage: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      content: 'Tesla has received Level 4 autonomous driving certification from EU regulators, allowing its vehicles to operate without human intervention on approved highway routes.'
    },
    {
      source: { id: 'sample', name: 'Digital Trends' },
      author: 'Sophie Martinez',
      title: 'Samsung Launches Foldable Tablet with Triple-Screen Design',
      description: 'Samsung introduces a revolutionary three-panel foldable tablet that transforms from phone to laptop-sized display.',
      url: 'https://example.com/samsung-tri-fold',
      urlToImage: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      content: 'Samsung has launched its most ambitious foldable device yet: a triple-screen tablet that unfolds to provide a 17-inch display while folding down to pocket size.'
    },
    {
      source: { id: 'sample', name: 'TechRadar' },
      author: 'Daniel Chen',
      title: '6G Networks Begin Testing with 100x Speed Improvement Over 5G',
      description: 'Major telecom companies begin 6G network trials promising speeds of up to 1 terabit per second, enabling new applications in holographic communication.',
      url: 'https://example.com/6g-testing',
      urlToImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      content: 'Trials of 6G wireless networks have begun in select cities, with early results showing speeds 100 times faster than current 5G networks, potentially enabling real-time holographic communication.'
    },
    {
      source: { id: 'sample', name: 'Ars Technica' },
      author: 'Michelle Wang',
      title: 'Microsoft Announces Windows 13 with Native AI Integration',
      description: 'The next version of Windows features a deeply integrated AI assistant capable of understanding context across all applications and automating complex workflows.',
      url: 'https://example.com/windows-13',
      urlToImage: 'https://images.unsplash.com/photo-1624571409108-e9a41746af53?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      content: 'Microsoft has unveiled Windows 13 with Copilot deeply integrated at the OS level, capable of understanding user context across all applications and automating multi-step tasks.'
    },
    {
      source: { id: 'sample', name: 'The Verge' },
      author: 'Chris Anderson',
      title: 'Breakthrough Battery Technology Charges EVs in Under 5 Minutes',
      description: 'A startup backed by major automakers demonstrates a new solid-state battery that can fully charge an electric vehicle in less than 5 minutes.',
      url: 'https://example.com/fast-charge-battery',
      urlToImage: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
      content: 'QuantumCell has demonstrated a solid-state battery that can charge from 0 to 100% in under five minutes while maintaining 95% capacity after 5000 cycles.'
    },
    {
      source: { id: 'sample', name: 'CNET' },
      author: 'Laura Kim',
      title: 'Google DeepMind AI Solves New Class of Mathematical Problems',
      description: 'DeepMind latest AI system has solved several previously intractable mathematical problems, potentially accelerating research across multiple scientific fields.',
      url: 'https://example.com/deepmind-math',
      urlToImage: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      content: 'Google DeepMind has announced that its AI system has solved a class of mathematical problems in topology that have stumped mathematicians for decades.'
    },
    {
      source: { id: 'sample', name: 'ZDNet' },
      author: 'Mark Thompson',
      title: 'GitHub Copilot X Can Now Write Entire Applications from Descriptions',
      description: 'GitHub latest AI coding assistant can generate full-stack applications from natural language descriptions, including tests and documentation.',
      url: 'https://example.com/copilot-x',
      urlToImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
      content: 'GitHub has launched Copilot X, an AI assistant that can generate complete applications from natural language descriptions, including backend APIs, frontend UIs, tests, and documentation.'
    },
    {
      source: { id: 'sample', name: 'Engadget' },
      author: 'Jessica Lee',
      title: 'SpaceX Starship Completes First Commercial Passenger Flight',
      description: 'SpaceX Starship successfully carries its first paying passengers on a suborbital flight, marking a new era in commercial space travel.',
      url: 'https://example.com/starship-passenger',
      urlToImage: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
      content: 'SpaceX has completed its first commercial passenger flight aboard Starship, carrying 8 private passengers on a 90-minute suborbital journey around Earth.'
    },
    {
      source: { id: 'sample', name: 'Mashable' },
      author: 'Andrew Patel',
      title: 'Meta Launches Photorealistic Virtual Worlds for Remote Work',
      description: 'Meta introduces hyper-realistic virtual office environments that blur the line between physical and digital workspaces, powered by next-gen Quest headsets.',
      url: 'https://example.com/meta-virtual-office',
      urlToImage: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 11 * 60 * 60 * 1000).toISOString(),
      content: 'Meta has launched Horizon Workrooms 3.0, featuring photorealistic avatars and environments that make virtual meetings nearly indistinguishable from in-person meetings.'
    },
    {
      source: { id: 'sample', name: 'Gizmodo' },
      author: 'Nathan Scott',
      title: 'Boston Dynamics Unveils Humanoid Robot for Home Assistance',
      description: 'The Atlas Home robot can perform household tasks, from cooking to cleaning, using advanced AI and dexterous manipulation capabilities.',
      url: 'https://example.com/atlas-home',
      urlToImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      content: 'Boston Dynamics has revealed Atlas Home, a consumer-focused humanoid robot priced at $29,999 that can cook meals, clean, do laundry, and assist with other household tasks.'
    }
  ],
  business: [
    {
      source: { id: 'sample', name: 'Financial Times' },
      author: 'Robert Chen',
      title: 'S&P 500 Reaches All-Time High Amid Strong Tech Earnings',
      description: 'Major stock indices surge as technology giants report better-than-expected quarterly earnings, pushing overall market valuations to record levels.',
      url: 'https://example.com/sp500-record',
      urlToImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      content: 'The S&P 500 index has reached a new all-time high, driven by strong earnings reports from major technology companies including Apple, Microsoft, and NVIDIA.'
    },
    {
      source: { id: 'sample', name: 'Bloomberg' },
      author: 'Catherine Park',
      title: 'Federal Reserve Signals Interest Rate Cuts in Coming Months',
      description: 'Fed Chair signals a shift in monetary policy as inflation shows signs of stabilizing near target levels, potentially boosting economic growth.',
      url: 'https://example.com/fed-rate-cut',
      urlToImage: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      content: 'The Federal Reserve has signaled potential interest rate cuts in the coming months as inflation data continues to trend toward the 2% target.'
    },
    {
      source: { id: 'sample', name: 'Wall Street Journal' },
      author: 'Mark Williams',
      title: 'NVIDIA Becomes World Most Valuable Company at $5 Trillion',
      description: 'NVIDIA surpasses Apple and Microsoft to become the most valuable publicly traded company, driven by insatiable demand for AI computing chips.',
      url: 'https://example.com/nvidia-5t',
      urlToImage: 'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      content: 'NVIDIA has reached a market capitalization of $5 trillion, making it the most valuable company in the world as demand for AI accelerator chips continues to surge.'
    },
    {
      source: { id: 'sample', name: 'Reuters' },
      author: 'Sarah Johnson',
      title: 'Global GDP Growth Exceeds Expectations at 3.8% for Q1 2026',
      description: 'The world economy shows surprising resilience with growth figures beating analyst predictions, led by strong performance in emerging markets.',
      url: 'https://example.com/global-gdp',
      urlToImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      content: 'Global GDP grew by 3.8% in Q1 2026, exceeding analyst expectations of 3.2%, with emerging markets in Asia and Latin America leading the expansion.'
    },
    {
      source: { id: 'sample', name: 'CNBC' },
      author: 'David Lee',
      title: 'Amazon Launches Same-Day Drone Delivery in 50 Major Cities',
      description: 'Amazon Prime Air expands its drone delivery service to 50 metropolitan areas, promising delivery of small packages within 60 minutes of ordering.',
      url: 'https://example.com/amazon-drone-expansion',
      urlToImage: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      content: 'Amazon has expanded its Prime Air drone delivery service to 50 major cities across the US, offering 60-minute delivery for packages weighing up to 5 pounds.'
    },
    {
      source: { id: 'sample', name: 'Forbes' },
      author: 'Emily Zhang',
      title: 'Cryptocurrency Market Cap Surpasses $10 Trillion Milestone',
      description: 'The total cryptocurrency market capitalization crosses the $10 trillion mark as institutional adoption accelerates and Bitcoin ETFs attract record inflows.',
      url: 'https://example.com/crypto-10t',
      urlToImage: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      content: 'The cryptocurrency market has reached a combined market capitalization of $10 trillion, with Bitcoin alone accounting for $4.2 trillion.'
    },
    {
      source: { id: 'sample', name: 'Business Insider' },
      author: 'Tom Harris',
      title: 'Remote Work Now Permanent at 60% of Fortune 500 Companies',
      description: 'A survey reveals that most Fortune 500 companies have permanently adopted hybrid or fully remote work models, transforming commercial real estate markets.',
      url: 'https://example.com/remote-work-permanent',
      urlToImage: 'https://images.unsplash.com/photo-1585974738771-84483dd9f89f?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
      content: 'A comprehensive survey of Fortune 500 companies shows that 60% have made hybrid or remote work a permanent option, with 15% going fully remote.'
    },
    {
      source: { id: 'sample', name: 'The Economist' },
      author: 'Rachel Green',
      title: 'India Overtakes Japan as World Third-Largest Economy',
      description: 'India GDP officially surpasses Japan, making it the third-largest economy globally, driven by technology exports and a booming services sector.',
      url: 'https://example.com/india-economy',
      urlToImage: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      content: 'India has officially overtaken Japan to become the world third-largest economy by GDP, driven by strong growth in technology, services, and manufacturing sectors.'
    },
    {
      source: { id: 'sample', name: 'MarketWatch' },
      author: 'Brian Collins',
      title: 'Global Electric Vehicle Market Worth $1.5 Trillion in 2026',
      description: 'The EV industry reaches record market size as traditional automakers complete their transition to electric lineups and battery costs continue to fall.',
      url: 'https://example.com/ev-market-size',
      urlToImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
      content: 'The global electric vehicle market has reached a valuation of $1.5 trillion in 2026, with nearly every major automaker now offering fully electric lineups.'
    },
    {
      source: { id: 'sample', name: 'Financial Review' },
      author: 'Linda Su',
      title: 'Green Bonds Market Doubles to $4 Trillion as ESG Investing Grows',
      description: 'The green bond market has doubled in size over the past two years as investors increasingly prioritize environmental, social, and governance criteria.',
      url: 'https://example.com/green-bonds',
      urlToImage: 'https://images.unsplash.com/photo-1604594849809-dfedbc827105?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
      content: 'The global green bond market has reached $4 trillion in outstanding issuance, reflecting a dramatic shift in investor priorities toward sustainable finance.'
    },
    {
      source: { id: 'sample', name: 'Barrons' },
      author: 'Peter Yang',
      title: 'AI Startups Raise Record $120 Billion in Funding This Year',
      description: 'Venture capital investment in artificial intelligence companies reaches unprecedented levels, with enterprise AI and robotics attracting the most capital.',
      url: 'https://example.com/ai-funding-record',
      urlToImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 11 * 60 * 60 * 1000).toISOString(),
      content: 'AI startups have collectively raised over $120 billion in funding so far this year, surpassing the previous full-year record of $85 billion set in 2025.'
    },
    {
      source: { id: 'sample', name: 'The Street' },
      author: 'Nancy Kim',
      title: 'Walmart Launches AI-Powered Automated Grocery Stores',
      description: 'Walmart opens its first fully automated grocery stores featuring robot stockers, AI-powered checkout, and autonomous delivery vehicles.',
      url: 'https://example.com/walmart-ai-stores',
      urlToImage: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      content: 'Walmart has opened its first fully automated grocery stores in three major cities, featuring AI-powered inventory management, autonomous checkout, and robot delivery.'
    }
  ],
  sports: [
    {
      source: { id: 'sample', name: 'ESPN' },
      author: 'Mike Thompson',
      title: 'FIFA World Cup 2026 Breaks Viewership Records with 5 Billion Viewers',
      description: 'The FIFA World Cup hosted across North America draws record-breaking global viewership as soccer continues to grow in popularity worldwide.',
      url: 'https://example.com/world-cup-viewership',
      urlToImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      content: 'The 2026 FIFA World Cup has drawn over 5 billion cumulative viewers worldwide, setting new records for the most-watched sporting event in history.'
    },
    {
      source: { id: 'sample', name: 'Sports Illustrated' },
      author: 'Jessica Brown',
      title: 'Olympic Committee Announces New Sports for 2028 LA Games',
      description: 'The IOC confirms cricket, flag football, and esports as new additions to the 2028 Summer Olympics in Los Angeles.',
      url: 'https://example.com/olympics-2028-sports',
      urlToImage: 'https://images.unsplash.com/photo-1461896836934-bd45ba066667?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      content: 'The International Olympic Committee has confirmed three new sports for the 2028 Los Angeles Olympics: cricket, flag football, and competitive esports in approved titles.'
    },
    {
      source: { id: 'sample', name: 'BBC Sport' },
      author: 'James Miller',
      title: 'Champions League Final Draws Record 800 Million TV Audience',
      description: 'The UEFA Champions League final breaks its own viewership record as two historic clubs clash in a thrilling match decided in extra time.',
      url: 'https://example.com/ucl-final-viewership',
      urlToImage: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      content: 'The UEFA Champions League final drew a record global television audience of 800 million viewers as the match went to extra time and penalties.'
    },
    {
      source: { id: 'sample', name: 'Sky Sports' },
      author: 'Sarah Williams',
      title: 'Formula 1 Announces Las Vegas Night Race as Season Highlight',
      description: 'The Las Vegas Grand Prix returns with extended race distance and enhanced track layout, becoming the marquee event of the F1 calendar.',
      url: 'https://example.com/f1-las-vegas',
      urlToImage: 'https://images.unsplash.com/photo-1504707748692-419802cf939d?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      content: 'Formula 1 has announced major enhancements to the Las Vegas Grand Prix, with a longer track layout and extended night race format for the 2026 season.'
    },
    {
      source: { id: 'sample', name: 'The Athletic' },
      author: 'David Martinez',
      title: 'NBA Finals Set Merchandise and Revenue Records',
      description: 'The 2026 NBA Finals generate record merchandise sales and broadcast revenue, underscoring basketball growing global commercial appeal.',
      url: 'https://example.com/nba-finals-revenue',
      urlToImage: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      content: 'The 2026 NBA Finals have set new records for merchandise sales, broadcast revenue, and social media engagement, with the league announcing a $15 billion media deal.'
    },
    {
      source: { id: 'sample', name: 'Bleacher Report' },
      author: 'Tom Harris',
      title: 'Tennis Grand Slam Finals Adopt AI Line-Calling Across All Courts',
      description: 'All four Grand Slam tournaments will now use AI-powered line-calling technology, eliminating human line judges for the first time in the sport history.',
      url: 'https://example.com/tennis-ai-lines',
      urlToImage: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      content: 'All four Grand Slam tennis tournaments have announced the adoption of AI-powered line-calling technology across all courts, replacing human line judges permanently.'
    },
    {
      source: { id: 'sample', name: 'Fox Sports' },
      author: 'Rachel Adams',
      title: 'Major League Baseball Introduces Robot Umpires for 2026 Season',
      description: 'MLB completes its rollout of automated ball-strike technology across all 30 stadiums, with human umpires retained for other calls.',
      url: 'https://example.com/mlb-robot-umps',
      urlToImage: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
      content: 'Major League Baseball has completed the rollout of its Automated Ball-Strike system to all 30 stadiums for the 2026 season, with human umpires handling all other calls.'
    },
    {
      source: { id: 'sample', name: 'Goal.com' },
      author: 'Carlos Mendoza',
      title: 'Women Soccer League Revenues Surpass $5 Billion Globally',
      description: 'Women professional soccer leagues worldwide report combined revenues exceeding $5 billion for the first time, reflecting explosive growth in the sport.',
      url: 'https://example.com/women-soccer-revenue',
      urlToImage: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      content: 'Women professional soccer league revenues have surpassed $5 billion globally for the first time, driven by record broadcast deals and sponsorship agreements.'
    },
    {
      source: { id: 'sample', name: 'Cricbuzz' },
      author: 'Amit Sharma',
      title: 'IPL Becomes World Most Valuable Sports League Per Team',
      description: 'The Indian Premier League franchises now have the highest average valuation of any sports league in the world, surpassing NFL teams.',
      url: 'https://example.com/ipl-valuations',
      urlToImage: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
      content: 'IPL franchises now have an average valuation of $3.2 billion, making the league the most valuable per team in global sports, surpassing the NFL for the first time.'
    },
    {
      source: { id: 'sample', name: 'NBC Sports' },
      author: 'Kevin O\'Brien',
      title: 'Esports Included in 2028 Olympics with Five Game Titles',
      description: 'The IOC finalizes the list of five competitive gaming titles for the 2028 Los Angeles Olympics, marking a historic moment for competitive gaming.',
      url: 'https://example.com/esports-olympics',
      urlToImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
      content: 'The IOC has announced the five esports titles that will be featured in the 2028 Los Angeles Olympics, including both traditional and mobile gaming categories.'
    },
    {
      source: { id: 'sample', name: 'Runner\'s World' },
      author: 'Maria Santos',
      title: 'Marathon World Record Broken with Sub-1:55 Time',
      description: 'A Kenyan runner shatters the marathon world record by finishing in under 1 hour and 55 minutes, a feat once thought impossible.',
      url: 'https://example.com/marathon-record',
      urlToImage: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 11 * 60 * 60 * 1000).toISOString(),
      content: 'Kenyan runner Elisha Kipchoge has broken the marathon world record with a time of 1:54:32, becoming the first person to complete a marathon in under 1 hour and 55 minutes.'
    },
    {
      source: { id: 'sample', name: 'Cycling News' },
      author: 'Pierre Dupont',
      title: 'Tour de France Introduces Electric Bike Category for Amateurs',
      description: 'The Tour de France adds a new e-bike category allowing amateur riders to compete on the same legendary routes as professional cyclists.',
      url: 'https://example.com/tour-ebike',
      urlToImage: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      content: 'The Tour de France has announced a new e-bike category called "Tour E-Classique" that will allow amateur cyclists to ride the same mountain stages as the professional riders.'
    }
  ],
  health: [
    {
      source: { id: 'sample', name: 'WHO Health' },
      author: 'Dr. Sarah Chen',
      title: 'WHO Declares Malaria Eradicated in 15 More Countries',
      description: 'The World Health Organization certifies 15 additional countries as malaria-free, bringing the total to 60 nations in a historic public health achievement.',
      url: 'https://example.com/malaria-eradicated',
      urlToImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      content: 'The World Health Organization has certified 15 more countries as malaria-free, marking significant progress in the global fight against the mosquito-borne disease.'
    },
    {
      source: { id: 'sample', name: 'Medical News' },
      author: 'Dr. James Wilson',
      title: 'CRISPR Gene Therapy Cures Sickle Cell Disease in Clinical Trial',
      description: 'A groundbreaking gene therapy using CRISPR technology has successfully cured sickle cell disease in all 50 participants of a Phase 3 clinical trial.',
      url: 'https://example.com/crispr-sickle-cell',
      urlToImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      content: 'A CRISPR-based gene therapy has achieved a 100% success rate in curing sickle cell disease in a Phase 3 clinical trial involving 50 patients.'
    },
    {
      source: { id: 'sample', name: 'Health Daily' },
      author: 'Dr. Lisa Park',
      title: 'New Alzheimer Drug Shows 65% Reduction in Cognitive Decline',
      description: 'A breakthrough Alzheimer drug demonstrates unprecedented effectiveness in slowing cognitive decline, offering hope to millions of patients worldwide.',
      url: 'https://example.com/alzheimer-breakthrough',
      urlToImage: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      content: 'A new Alzheimer drug has shown a 65% reduction in cognitive decline over 18 months in a large-scale clinical trial, the most effective treatment to date.'
    },
    {
      source: { id: 'sample', name: 'The Lancet' },
      author: 'Dr. Emily Davis',
      title: 'Universal Cancer Blood Test Detects 50+ Types with 95% Accuracy',
      description: 'Scientists develop a simple blood test that can detect over 50 types of cancer at early stages with remarkable accuracy, potentially saving millions of lives.',
      url: 'https://example.com/cancer-blood-test',
      urlToImage: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      content: 'Researchers have developed a blood test capable of detecting over 50 types of cancer with 95% accuracy, using AI analysis of circulating tumor DNA fragments.'
    },
    {
      source: { id: 'sample', name: 'Nature Medicine' },
      author: 'Dr. Michael Torres',
      title: 'mRNA Vaccines Show Promise Against HIV in Phase 2 Trials',
      description: 'Building on COVID-19 vaccine technology, mRNA-based HIV vaccines show strong immune responses in early clinical trials, raising hopes for an HIV vaccine.',
      url: 'https://example.com/hiv-mrna-vaccine',
      urlToImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      content: 'mRNA-based HIV vaccines have shown strong immune responses in Phase 2 clinical trials, with 78% of participants developing broadly neutralizing antibodies.'
    },
    {
      source: { id: 'sample', name: 'WebMD' },
      author: 'Dr. Anna Rodriguez',
      title: 'Digital Mental Health Platforms Reduce Depression by 40%',
      description: 'A large study finds that AI-powered mental health apps are nearly as effective as in-person therapy for mild to moderate depression and anxiety.',
      url: 'https://example.com/digital-mental-health',
      urlToImage: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      content: 'A study of 10,000 participants found that AI-powered mental health platforms reduced depression symptoms by 40%, comparable to traditional therapy outcomes.'
    },
    {
      source: { id: 'sample', name: 'Mayo Clinic News' },
      author: 'Dr. Robert Kim',
      title: 'Lab-Grown Organs Successfully Transplanted in Human Patients',
      description: 'Researchers achieve a landmark by successfully transplanting lab-grown kidneys into human patients, potentially ending organ transplant waiting lists.',
      url: 'https://example.com/lab-grown-organs',
      urlToImage: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
      content: 'Surgeons have successfully transplanted lab-grown kidneys into three patients, with all organs functioning normally after six months of follow-up.'
    },
    {
      source: { id: 'sample', name: 'CDC Health' },
      author: 'Dr. Patricia Lee',
      title: 'Global Life Expectancy Reaches 76 Years, Highest in History',
      description: 'The WHO reports that global average life expectancy has reached 76 years, driven by advances in healthcare, nutrition, and sanitation worldwide.',
      url: 'https://example.com/life-expectancy',
      urlToImage: 'https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      content: 'Global average life expectancy has reached 76 years, the highest in human history, according to a new WHO report citing improvements in healthcare access worldwide.'
    },
    {
      source: { id: 'sample', name: 'New England Journal' },
      author: 'Dr. Kevin Chang',
      title: 'AI Diagnostic Tool Outperforms Radiologists in Cancer Detection',
      description: 'An AI system achieves 99.2% accuracy in detecting early-stage cancers from medical imaging, surpassing the performance of experienced radiologists.',
      url: 'https://example.com/ai-cancer-detection',
      urlToImage: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
      content: 'An AI diagnostic tool has achieved 99.2% accuracy in detecting early-stage cancers from CT and MRI scans, outperforming a panel of experienced radiologists.'
    },
    {
      source: { id: 'sample', name: 'Healthline' },
      author: 'Dr. Maria Gonzalez',
      title: 'New Weight Loss Drug Achieves 30% Body Weight Reduction Safely',
      description: 'A next-generation GLP-1 drug demonstrates unprecedented weight loss results with minimal side effects in a year-long clinical study.',
      url: 'https://example.com/weight-loss-drug',
      urlToImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
      content: 'A new GLP-1 receptor agonist drug has achieved an average of 30% body weight reduction over 12 months with significantly fewer side effects than existing treatments.'
    },
    {
      source: { id: 'sample', name: 'Science Daily' },
      author: 'Dr. Andrew White',
      title: 'Wearable Health Monitor Predicts Heart Attacks 6 Hours in Advance',
      description: 'A new smartwatch-based health monitoring system can predict cardiac events up to 6 hours before they occur, potentially saving thousands of lives annually.',
      url: 'https://example.com/heart-prediction-watch',
      urlToImage: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 11 * 60 * 60 * 1000).toISOString(),
      content: 'A new wearable health monitoring system can predict cardiac events up to 6 hours before they occur with 94% accuracy, using AI analysis of heart rhythm patterns.'
    },
    {
      source: { id: 'sample', name: 'Medical Today' },
      author: 'Dr. Susan Park',
      title: 'Stem Cell Therapy Restores Vision in Blind Patients',
      description: 'A revolutionary stem cell treatment has restored partial vision in patients with age-related macular degeneration, the leading cause of blindness.',
      url: 'https://example.com/stem-cell-vision',
      urlToImage: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      content: 'A stem cell therapy has successfully restored partial vision in 12 patients with advanced age-related macular degeneration, marking a breakthrough in ophthalmology.'
    }
  ],
  entertainment: [
    {
      source: { id: 'sample', name: 'Variety' },
      author: 'Amanda Foster',
      title: 'Marvel Phase 7 Announced with 12 New Films and Series',
      description: 'Marvel Studios reveals its Phase 7 lineup at Comic-Con, featuring new heroes and the beginning of a cosmic saga spanning multiple interconnected stories.',
      url: 'https://example.com/marvel-phase-7',
      urlToImage: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      content: 'Marvel Studios has revealed its Phase 7 slate at San Diego Comic-Con, announcing 8 theatrical films and 4 Disney+ series set to debut through 2029.'
    },
    {
      source: { id: 'sample', name: 'Hollywood Reporter' },
      author: 'Chris Anderson',
      title: 'Streaming Platforms Spend Record $80 Billion on Original Content',
      description: 'Combined spending on original content by major streaming services reaches $80 billion, with Netflix, Disney+, and Amazon leading the investment race.',
      url: 'https://example.com/streaming-spending',
      urlToImage: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      content: 'Major streaming platforms have collectively spent a record $80 billion on original content in 2026, with Netflix alone accounting for $22 billion.'
    },
    {
      source: { id: 'sample', name: 'Billboard' },
      author: 'Sophia Chen',
      title: 'Virtual Concert Platform Hosts 10 Million Simultaneous Viewers',
      description: 'A major virtual concert event breaks records with 10 million concurrent viewers, showcasing the growing appeal of metaverse entertainment experiences.',
      url: 'https://example.com/virtual-concert-record',
      urlToImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      content: 'A virtual concert event hosted simultaneously across multiple metaverse platforms has drawn 10 million concurrent viewers, setting a new record for virtual entertainment.'
    },
    {
      source: { id: 'sample', name: 'Deadline' },
      author: 'Ryan Mitchell',
      title: 'AI-Generated Film Wins Audience Award at Sundance Festival',
      description: 'A feature-length film created entirely with AI tools wins the Audience Award at Sundance, sparking debate about the future of filmmaking.',
      url: 'https://example.com/ai-film-sundance',
      urlToImage: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      content: 'A feature film created primarily using AI tools for scriptwriting, visual effects, and music composition has won the Audience Award at the Sundance Film Festival.'
    },
    {
      source: { id: 'sample', name: 'Entertainment Weekly' },
      author: 'Laura Kim',
      title: 'Global Box Office Crosses $50 Billion for First Time in History',
      description: 'Worldwide theatrical box office receipts surpass $50 billion, driven by blockbuster franchises and the resurgence of cinema-going in Asian markets.',
      url: 'https://example.com/box-office-record',
      urlToImage: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      content: 'The global theatrical box office has crossed $50 billion in revenue for the first time in history, marking a full recovery and expansion beyond pre-pandemic levels.'
    },
    {
      source: { id: 'sample', name: 'Rolling Stone' },
      author: 'Jake Robinson',
      title: 'Music Industry Revenue Hits $40 Billion with Streaming Dominance',
      description: 'The global music industry achieves record revenue of $40 billion, with streaming accounting for 85% of total income as vinyl and live events also grow.',
      url: 'https://example.com/music-revenue-record',
      urlToImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      content: 'The global recorded music industry has generated $40 billion in revenue, with streaming services contributing 85% of the total, according to IFPI annual report.'
    },
    {
      source: { id: 'sample', name: 'IndieWire' },
      author: 'Michelle Wang',
      title: 'Video Game Industry Surpasses $250 Billion in Annual Revenue',
      description: 'The gaming industry reaches a new milestone, eclipsing the combined revenues of film and music as mobile and cloud gaming continue to drive growth.',
      url: 'https://example.com/gaming-250b',
      urlToImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
      content: 'The global video game industry has surpassed $250 billion in annual revenue, driven by mobile gaming, cloud streaming, and the growing esports ecosystem.'
    },
    {
      source: { id: 'sample', name: 'Vulture' },
      author: 'Daniel Park',
      title: 'Broadway Season Sets Revenue Record of $2.5 Billion',
      description: 'The Broadway theater season achieves record-breaking revenue with innovative new shows and the continued success of long-running productions.',
      url: 'https://example.com/broadway-record',
      urlToImage: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      content: 'Broadway has set a new season revenue record of $2.5 billion, boosted by innovative new shows and strong international tourism to New York City.'
    },
    {
      source: { id: 'sample', name: 'People' },
      author: 'Jessica Lee',
      title: 'K-Pop Group BTS Reunion Concert Sells 1 Million Tickets in Minutes',
      description: 'BTS reunion concert tickets sell out in under 5 minutes as the group announces their first world tour since members completed military service.',
      url: 'https://example.com/bts-reunion',
      urlToImage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
      content: 'BTS reunion world tour tickets sold out in under 5 minutes globally, with over 1 million tickets purchased as the group reunites for their first concerts since 2023.'
    },
    {
      source: { id: 'sample', name: 'Screen Rant' },
      author: 'Andrew Scott',
      title: 'Netflix Launches Interactive Movie Choose-Your-Adventure Series',
      description: 'Netflix debuts a new interactive movie format allowing viewers to make real-time decisions that alter the plot, creating personalized viewing experiences.',
      url: 'https://example.com/netflix-interactive',
      urlToImage: 'https://images.unsplash.com/photo-1574375927938-d5a98e8d7e28?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
      content: 'Netflix has launched a new interactive movie series that allows viewers to make decisions at key plot points, with AI-generated scenes creating unique storylines for each viewer.'
    },
    {
      source: { id: 'sample', name: 'Polygon' },
      author: 'Nathan Brown',
      title: 'GTA 7 Announced by Rockstar Games with Record Pre-Orders',
      description: 'Rockstar Games announces GTA 7 at their annual showcase, with pre-orders immediately breaking records across all gaming platforms.',
      url: 'https://example.com/gta-7-announcement',
      urlToImage: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 11 * 60 * 60 * 1000).toISOString(),
      content: 'Rockstar Games has officially announced GTA 7, with pre-orders surpassing 5 million within the first 24 hours, breaking all previous records for gaming pre-orders.'
    },
    {
      source: { id: 'sample', name: 'The Wrap' },
      author: 'Olivia Thompson',
      title: 'Academy Awards Add New Category for AI-Assisted Filmmaking',
      description: 'The Academy of Motion Picture Arts and Sciences announces a new Oscar category recognizing excellence in AI-assisted filmmaking techniques.',
      url: 'https://example.com/oscars-ai-category',
      urlToImage: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=450&fit=crop',
      publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      content: 'The Academy has announced a new Oscar category for Best AI-Assisted Visual Effects, recognizing the growing role of artificial intelligence in modern filmmaking.'
    }
  ]
};

const getSampleArticles = (category = 'general', page = 1, pageSize = 12) => {
  const articles = sampleArticles[category] || sampleArticles.general;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedArticles = articles.slice(start, end);

  return {
    articles: paginatedArticles,
    totalResults: articles.length,
    page,
    pageSize,
    _isSampleData: true
  };
};

const searchSampleArticles = (query, page = 1, pageSize = 12) => {
  const q = (query || '').toLowerCase();
  const allArticles = Object.values(sampleArticles).flat();
  const matched = allArticles.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      (a.content && a.content.toLowerCase().includes(q))
  );
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return {
    articles: matched.slice(start, end),
    totalResults: matched.length,
    page,
    pageSize,
    _isSampleData: true
  };
};

module.exports = { getSampleArticles, searchSampleArticles };
