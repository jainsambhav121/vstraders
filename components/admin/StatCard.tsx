
import React from 'react';

interface StatCardProps {
    title: string;
    value: string;
    icon: React.ComponentType<{ className?: string }>;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon }) => {
    return (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 flex items-center gap-4">
            <div className="bg-white/10 p-3 rounded-full">
                <Icon className="w-8 h-8" />
            </div>
            <div>
                <p className="text-gray-400 text-sm">{title}</p>
                <p className="text-2xl font-bold">{value}</p>
            </div>
        </div>
    );
};
export default StatCard;
