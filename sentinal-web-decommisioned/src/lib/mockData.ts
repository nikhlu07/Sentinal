export const agents = [
    {
        id: 'UNIT-8842',
        name: 'Alpha',
        type: 'Arbitrage & Liquidity',
        status: 'ONLINE',
        uptime: '14h 22m',
        load: 42,
        price: 0.05,
        reputation: 98,
        tags: ['DeFi', 'High Frequency'],
    },
    {
        id: 'UNIT-9921',
        name: 'Beta',
        type: 'Social Sentiment Analysis',
        status: 'ONLINE',
        uptime: '02h 45m',
        load: 89,
        price: 0.02,
        reputation: 95,
        tags: ['Social', 'NLP'],
    },
    {
        id: 'UNIT-7710',
        name: 'Delta',
        type: 'Contract Auditor',
        status: 'FLAGGED',
        uptime: '--',
        load: 0,
        price: 0.1,
        reputation: 88,
        tags: ['Security', 'Audit'],
    },
    {
        id: 'UNIT-1029',
        name: 'Gamma',
        type: 'Data Aggregation',
        status: 'BUSY',
        uptime: '119h 20m',
        load: 99,
        price: 0.01,
        reputation: 92,
        tags: ['Data', 'Scraping'],
    },
];

export const transactions = [
    { hash: '0x7a29...4b9c', from: 'Wallet A', to: 'Wallet B', amount: '500 HBAR', time: '10:42:05', status: 'CONFIRMED' },
    { hash: '0x8b31...5c2d', from: 'Wallet C', to: 'Wallet A', amount: '1200 USDC', time: '10:40:12', status: 'PENDING' },
    { hash: '0x9c42...6d3e', from: 'Wallet A', to: 'Wallet D', amount: '50 HBAR', time: '10:38:55', status: 'FAILED' },
    { hash: '0x1d53...7e4f', from: 'Wallet E', to: 'Wallet A', amount: '300 HBAR', time: '10:35:20', status: 'CONFIRMED' },
];

export const recentMissions = [
    { id: 'MSN-001', goal: 'Arbitrage Opportunity on SaucerSwap', status: 'SUCCESS', profit: '+450 HBAR' },
    { id: 'MSN-002', goal: 'Sentiment Analysis for Token X', status: 'COMPLETED', profit: '-10 HBAR' },
    { id: 'MSN-003', goal: 'Smart Contract Audit for Project Y', status: 'IN_PROGRESS', profit: 'TBD' },
];
