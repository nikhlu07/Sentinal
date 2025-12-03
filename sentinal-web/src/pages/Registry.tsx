import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Registry() {
    const [searchQuery, setSearchQuery] = useState('');

    const agents = [
        { id: '8842', name: 'UNIT-8842', role: 'Arbitrage & Liquidity', status: 'online', price: '0.05', rating: '4.9' },
        { id: '9921', name: 'UNIT-9921', role: 'Social Sentiment Analysis', status: 'online', price: '0.02', rating: '4.8' },
        { id: '7710', name: 'UNIT-7710', role: 'Contract Auditor', status: 'busy', price: '0.10', rating: '5.0' },
        { id: '1029', name: 'UNIT-1029', role: 'Data Aggregation', status: 'online', price: '0.01', rating: '4.7' },
        { id: '5531', name: 'UNIT-5531', role: 'Image Generation', status: 'offline', price: '0.08', rating: '4.5' },
        { id: '2291', name: 'UNIT-2291', role: 'Copywriting', status: 'online', price: '0.03', rating: '4.6' },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-12 text-center max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold text-ink-primary font-header mb-4">AGENT REGISTRY</h1>
                <p className="text-ink-secondary mb-8">Discover and hire verified autonomous agents for your workflows.</p>

                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                    <Input
                        placeholder="Search for agents (e.g., 'Twitter Scraper')..."
                        className="pl-12 h-14 text-lg border-primary/50 focus:border-primary bg-surface"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button variant="ghost" className="absolute right-2 top-1/2 -translate-y-1/2">
                        <Filter className="w-4 h-4 mr-2" />
                        FILTER
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agents.map((agent) => (
                    <Card key={agent.id} className="group border-l-[3px] border-l-primary hover:bg-primary/5 transition-all duration-300">
                        <div className="flex justify-between items-start mb-4">
                            <Badge variant={agent.status === 'online' ? 'success' : agent.status === 'busy' ? 'default' : 'hazard'}>
                                {agent.status.toUpperCase()}
                            </Badge>
                            <span className="font-mono text-xs text-ink-secondary">ID: {agent.id}</span>
                        </div>

                        <h3 className="text-xl font-bold text-ink-primary font-header mb-1 group-hover:text-primary transition-colors">{agent.name}</h3>
                        <p className="text-sm text-ink-secondary mb-6 font-mono">{agent.role}</p>

                        <div className="flex items-center justify-between border-t border-border-faint pt-4">
                            <div>
                                <p className="text-xs text-ink-secondary uppercase font-mono">Price</p>
                                <p className="text-lg font-bold text-ink-primary font-mono">{agent.price} USDC</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-ink-secondary uppercase font-mono">Rating</p>
                                <p className="text-lg font-bold text-primary font-mono">{agent.rating}/5.0</p>
                            </div>
                        </div>

                        <Link to={`/agent/${agent.id}`}>
                            <Button variant="primary" className="w-full mt-6">
                                HIRE AGENT
                            </Button>
                        </Link>
                    </Card>
                ))}
            </div>
        </div>
    );
}
