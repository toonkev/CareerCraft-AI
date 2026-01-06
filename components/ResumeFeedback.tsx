import React, { useState } from 'react';
import { ResumeData, AnalysisResult } from '../types';
import { analyzeResume } from '../services/geminiService';
import { Sparkles, Check, AlertCircle, Loader2, RefreshCw } from 'lucide-react';

interface ResumeFeedbackProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export const ResumeFeedback: React.FC<ResumeFeedbackProps> = ({ data, onChange }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const analysis = await analyzeResume(data);
      setResult(analysis);
    } catch (error) {
      alert("Failed to analyze resume. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const applyImprovement = (expId: string, newPoints: string[]) => {
    const newExperience = data.experience.map(exp => {
      if (exp.id === expId) {
        return { ...exp, points: newPoints };
      }
      return exp;
    });
    onChange({ ...data, experience: newExperience });
    
    // Remove applied improvement from result to prevent re-applying
    if (result) {
        setResult({
            ...result,
            improvedExperience: result.improvedExperience.filter(e => e.id !== expId)
        });
    }
  };

  if (!result && !isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-4 rounded-full mb-6 shadow-lg shadow-indigo-200">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-serif text-slate-800 mb-2">AI Resume Review</h2>
        <p className="text-slate-500 mb-8 max-w-md leading-relaxed">
          Get detailed feedback on your resume and let our AI rewrite your experience using the industry-standard XYZ formula.
        </p>
        <button
          onClick={handleAnalyze}
          className="px-6 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-lg"
        >
          <Sparkles size={18} />
          Start Analysis
        </button>
      </div>
    );
  }

  if (isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-white rounded-xl border border-slate-200">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
        <h3 className="text-xl font-serif text-slate-800">Analyzing your career history...</h3>
        <p className="text-slate-500 mt-2 text-sm">Checking formatting, impact, and keywords.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Feedback Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-serif text-slate-800 mb-4 flex items-center gap-2">
          <AlertCircle className="text-amber-500" size={20} />
          Critical Feedback
        </h3>
        <ul className="space-y-3">
          {result?.feedback.map((point, i) => (
            <li key={i} className="flex items-start gap-3 text-slate-600 bg-amber-50 p-3 rounded-lg border border-amber-100">
              <span className="font-bold text-amber-600 min-w-[20px]">{i + 1}.</span>
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* Keywords Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-serif text-slate-800 mb-4 flex items-center gap-2">
          <Check className="text-emerald-500" size={20} />
          Suggested Keywords
        </h3>
        <div className="flex flex-wrap gap-2">
          {result?.missingKeywords.map((keyword, i) => (
            <span key={i} className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-xs font-medium">
              + {keyword}
            </span>
          ))}
        </div>
      </div>

      {/* Improvements Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
             <h3 className="text-lg font-serif text-slate-800 flex items-center gap-2">
                <RefreshCw className="text-indigo-600" size={20} />
                Proposed Improvements
            </h3>
            <button onClick={handleAnalyze} className="text-sm text-slate-500 hover:text-indigo-600 flex items-center gap-1">
                <RefreshCw size={14} /> Re-analyze
            </button>
        </div>
       
        {result?.improvedExperience.map((imp) => {
          const original = data.experience.find(e => e.id === imp.id);
          if (!original) return null;

          return (
            <div key={imp.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
                <h4 className="font-semibold text-slate-700">{original.title} @ {original.company}</h4>
                <button
                  onClick={() => applyImprovement(imp.id, imp.points)}
                  className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-medium rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-sm"
                >
                  <Check size={14} />
                  Apply
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                {/* Original */}
                <div className="p-6 bg-white">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block">Original</span>
                  <ul className="space-y-3">
                    {original.points.map((p, i) => (
                      <li key={i} className="text-sm text-slate-500 leading-relaxed flex gap-2">
                        <span className="text-slate-400">•</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Improved */}
                <div className="p-6 bg-indigo-50">
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-3 block flex items-center gap-2">
                    <Sparkles size={12} />
                    Improved (XYZ Formula)
                  </span>
                  <ul className="space-y-3">
                    {imp.points.map((p, i) => (
                      <li key={i} className="text-sm text-slate-800 leading-relaxed flex gap-2">
                        <span className="text-indigo-600">•</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
        
        {result?.improvedExperience.length === 0 && (
            <div className="text-center p-8 bg-white rounded-xl border border-dashed border-slate-300">
                <p className="text-slate-500">No specific text improvements found. Great job!</p>
            </div>
        )}
      </div>
    </div>
  );
};