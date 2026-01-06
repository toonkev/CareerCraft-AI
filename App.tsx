import React, { useState } from 'react';
import { ResumeData, TabView } from './types';
import { ResumeEditor } from './components/ResumeEditor';
import { ResumePreview } from './components/ResumePreview';
import { SkillsChart } from './components/SkillsChart';
import { ResumeFeedback } from './components/ResumeFeedback';
import { Home } from './components/Home';
import { Layout, Briefcase, Sparkles, ArrowLeft } from 'lucide-react';

const INITIAL_DATA: ResumeData = {
  personalInfo: {
    fullName: 'Alex Rivera',
    email: 'alex.rivera@edu.university.com',
    phone: '(555) 123-4567',
    linkedin: 'linkedin.com/in/alexrivera-cs',
    portfolio: 'github.com/alexrivera'
  },
  education: [
    {
      id: '1',
      institution: 'University of Washington',
      degree: 'B.S. Computer Science',
      graduationDate: 'Expected May 2025',
      gpa: '3.8/4.0'
    }
  ],
  experience: [
    {
      id: '1',
      title: 'Software Engineering Intern',
      company: 'TechCorp Inc.',
      location: 'Seattle, WA',
      startDate: 'June 2023',
      endDate: 'Sept 2023',
      isCurrent: false,
      points: [
        'Optimized database queries for the main dashboard, reducing load times by 30% as measured by server logs.',
        'Collaborated with a team of 5 engineers to implement a new user authentication flow using React and OAuth.'
      ]
    },
    {
        id: '2',
        title: 'Lead Developer (Capstone Project)',
        company: 'University AI Lab',
        location: 'Seattle, WA',
        startDate: 'Jan 2023',
        endDate: 'Present',
        isCurrent: true,
        points: [
          'Developed a machine learning model to predict campus traffic patterns, achieving 85% accuracy.',
          'Built a RESTful API using Python/Flask to serve predictions to a mobile app used by 500+ students.'
        ]
    }
  ],
  skills: [
    { id: '1', category: 'Languages', items: 'Python, Java, JavaScript, TypeScript, SQL' },
    { id: '2', category: 'Tools & Frameworks', items: 'React, Node.js, Git, Docker, AWS (Basic)' },
    { id: '3', category: 'Soft Skills', items: 'Technical Writing, Agile Methodology, Team Leadership' }
  ]
};

function App() {
  const [view, setView] = useState<'HOME' | 'BUILDER'>('HOME');
  const [resumeData, setResumeData] = useState<ResumeData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<TabView>(TabView.EDITOR);

  const renderLeftColumn = () => {
    switch (activeTab) {
      case TabView.ANALYSIS:
        return <SkillsChart data={resumeData} />;
      case TabView.REVIEW:
        return <ResumeFeedback data={resumeData} onChange={setResumeData} />;
      case TabView.EDITOR:
      default:
        return <ResumeEditor data={resumeData} onChange={setResumeData} />;
    }
  };

  if (view === 'HOME') {
    return <Home onStart={() => setView('BUILDER')} />;
  }

  return (
    <div className="h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-hidden">
      {/* Header - Fixed Top */}
      <header className="bg-white border-b border-slate-200 shrink-0 z-50 shadow-sm print:hidden">
        <div className="w-full px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setView('HOME')} className="p-1 hover:bg-slate-100 rounded-lg transition-colors mr-1">
                <ArrowLeft size={20} className="text-slate-500" />
            </button>
            <div className="bg-indigo-600 p-1.5 rounded-lg shadow-md shadow-indigo-200">
                <Layout className="text-white" size={24} />
            </div>
            <div>
                <h1 className="text-lg font-bold text-slate-900 tracking-tight">CareerCraft AI</h1>
                <p className="text-xs text-slate-500 hidden sm:block">Document Architect</p>
            </div>
          </div>
          
          <nav className="flex space-x-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
             <button
              onClick={() => setActiveTab(TabView.EDITOR)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                activeTab === TabView.EDITOR 
                  ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Editor
            </button>
            <button
              onClick={() => setActiveTab(TabView.ANALYSIS)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all hidden sm:block ${
                activeTab === TabView.ANALYSIS 
                  ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Analysis
            </button>
            <button
              onClick={() => setActiveTab(TabView.REVIEW)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-1 ${
                activeTab === TabView.REVIEW 
                  ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Sparkles size={14} className={activeTab === TabView.REVIEW ? "text-indigo-600" : "text-slate-400"} />
              Review
            </button>
            <button
              onClick={() => setActiveTab(TabView.PREVIEW)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all md:hidden ${
                activeTab === TabView.PREVIEW 
                  ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Preview
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content - Split Pane */}
      <main className="flex-1 flex overflow-hidden w-full print:hidden">
        
        {/* Left Side (Input) */}
        <div className={`
            flex-1 h-full overflow-y-auto bg-white border-r border-slate-200 
            ${activeTab === TabView.PREVIEW ? 'hidden lg:block' : 'block'}
            lg:w-[45%] xl:w-[40%] 2xl:w-[35%] lg:flex-none
        `}>
            <div className="max-w-2xl mx-auto p-6 lg:p-8 pb-24 space-y-6">
                 {renderLeftColumn()}
            </div>
        </div>

        {/* Right Side (Output) */}
        <div className={`
            flex-1 h-full bg-slate-100 overflow-hidden flex flex-col relative
            ${activeTab === TabView.PREVIEW ? 'block' : 'hidden lg:flex'}
        `}>
            {/* Canvas Area */}
             <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 scroll-smooth">
                 <div className="max-w-[850px] mx-auto min-h-full flex flex-col justify-center">
                    <ResumePreview data={resumeData} />
                    
                    {/* Tip Box (Below Preview) */}
                    <div className="mt-8 p-4 bg-white border border-slate-200 rounded-lg shadow-sm flex items-start gap-3 opacity-90 hover:opacity-100 transition-opacity">
                        <div className="p-2 bg-emerald-50 rounded-md border border-emerald-100 shrink-0">
                            <Briefcase size={16} className="text-emerald-600" />
                        </div>
                        <div>
                            <h4 className="text-emerald-900 font-medium text-sm mb-1">
                                Pro Tip: The XYZ Formula
                            </h4>
                            <p className="text-slate-500 text-xs leading-relaxed">
                                "Accomplished [X] as measured by [Y], by doing [Z]". 
                                Use the magic wand icon in the editor to automatically rewrite your bullet points.
                            </p>
                        </div>
                    </div>
                 </div>
             </div>
        </div>

      </main>
    </div>
  );
}

export default App;