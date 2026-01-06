import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { ResumeData } from '../types';

interface SkillsChartProps {
  data: ResumeData;
}

export const SkillsChart: React.FC<SkillsChartProps> = ({ data }) => {
  
  const chartData = data.skills.map(skill => ({
    name: skill.category,
    count: skill.items.split(',').filter(i => i.trim() !== '').length
  }));

  const totalExperiencePoints = data.experience.reduce((acc, exp) => {
    return acc + exp.points.filter(p => p.trim() !== '').length;
  }, 0);

  return (
    <div className="space-y-8 p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
        <div>
            <h3 className="text-lg font-serif text-slate-800 mb-2">Resume Balance Analysis</h3>
            <p className="text-slate-500 mb-6 text-sm leading-relaxed">
                Visualizing the density of your resume sections. A balanced resume typically has a strong distribution of technical skills and a robust experience section.
            </p>
        </div>

      <div className="h-64 w-full">
        <h4 className="text-xs font-medium text-slate-400 mb-4 text-center uppercase tracking-widest">Skill Density by Category</h4>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <Tooltip 
                cursor={{ fill: '#f1f5f9' }}
                contentStyle={{ 
                    borderRadius: '8px', 
                    border: '1px solid #e2e8f0', 
                    backgroundColor: '#fff',
                    color: '#0f172a',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
            />
            <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
            <p className="text-indigo-600 text-[10px] font-bold uppercase tracking-wider">Total Bullet Points</p>
            <p className="text-3xl font-serif text-indigo-900 mt-1">{totalExperiencePoints}</p>
        </div>
        <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
            <p className="text-emerald-600 text-[10px] font-bold uppercase tracking-wider">Total Skills Listed</p>
            <p className="text-3xl font-serif text-emerald-900 mt-1">
                {chartData.reduce((a, b) => a + b.count, 0)}
            </p>
        </div>
      </div>
    </div>
  );
};