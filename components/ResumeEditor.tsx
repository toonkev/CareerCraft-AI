import React, { useState } from 'react';
import { ResumeData, ExperienceItem, EducationItem, SkillItem } from '../types';
import { Plus, Trash2, Sparkles, User, Briefcase, GraduationCap, Code } from 'lucide-react';
import { enhanceBulletPoint } from '../services/geminiService';

interface ResumeEditorProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export const ResumeEditor: React.FC<ResumeEditorProps> = ({ data, onChange }) => {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const updatePersonalInfo = (field: string, value: string) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value }
    });
  };

  const handleEnhancePoint = async (expId: string, pointIndex: number, text: string) => {
    if (!text) return;
    setLoadingId(`${expId}-${pointIndex}`);
    try {
      const newText = await enhanceBulletPoint(text);
      const newExperience = data.experience.map(exp => {
        if (exp.id === expId) {
          const newPoints = [...exp.points];
          newPoints[pointIndex] = newText;
          return { ...exp, points: newPoints };
        }
        return exp;
      });
      onChange({ ...data, experience: newExperience });
    } catch (e) {
      alert("Failed to enhance text. Please try again.");
    } finally {
      setLoadingId(null);
    }
  };

  const addExperience = () => {
    const newExp: ExperienceItem = {
      id: Date.now().toString(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      points: ['']
    };
    onChange({ ...data, experience: [newExp, ...data.experience] });
  };

  const removeExperience = (id: string) => {
    onChange({ ...data, experience: data.experience.filter(e => e.id !== id) });
  };

  const updateExperience = (id: string, field: keyof ExperienceItem, value: any) => {
    onChange({
      ...data,
      experience: data.experience.map(e => e.id === id ? { ...e, [field]: value } : e)
    });
  };

  const updatePoint = (expId: string, index: number, value: string) => {
    onChange({
      ...data,
      experience: data.experience.map(e => {
        if (e.id === expId) {
          const newPoints = [...e.points];
          newPoints[index] = value;
          return { ...e, points: newPoints };
        }
        return e;
      })
    });
  };

  const addPoint = (expId: string) => {
    onChange({
      ...data,
      experience: data.experience.map(e => {
        if (e.id === expId) {
          return { ...e, points: [...e.points, ''] };
        }
        return e;
      })
    });
  };

  const removePoint = (expId: string, index: number) => {
    onChange({
      ...data,
      experience: data.experience.map(e => {
        if (e.id === expId) {
          return { ...e, points: e.points.filter((_, i) => i !== index) };
        }
        return e;
      })
    });
  };

  // Education Handlers
  const addEducation = () => {
    const newEdu: EducationItem = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      graduationDate: '',
      gpa: ''
    };
    onChange({ ...data, education: [newEdu, ...data.education] });
  };

  const updateEducation = (id: string, field: keyof EducationItem, value: string) => {
    onChange({
      ...data,
      education: data.education.map(e => e.id === id ? { ...e, [field]: value } : e)
    });
  };

  const removeEducation = (id: string) => {
    onChange({ ...data, education: data.education.filter(e => e.id !== id) });
  };

  // Skill Handlers
  const updateSkill = (id: string, field: keyof SkillItem, value: string) => {
    onChange({
      ...data,
      skills: data.skills.map(s => s.id === id ? { ...s, [field]: value } : s)
    });
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Personal Info */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-lg font-serif text-slate-800 mb-5 flex items-center">
          <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mr-3 border border-indigo-100">
            <User size={16} />
          </span>
          Profile Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="input-field"
            value={data.personalInfo.fullName}
            onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
          />
          <input
            type="email"
            placeholder="Email Address"
            className="input-field"
            value={data.personalInfo.email}
            onChange={(e) => updatePersonalInfo('email', e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="input-field"
            value={data.personalInfo.phone}
            onChange={(e) => updatePersonalInfo('phone', e.target.value)}
          />
          <input
            type="text"
            placeholder="LinkedIn URL"
            className="input-field"
            value={data.personalInfo.linkedin}
            onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
          />
           <input
            type="text"
            placeholder="Portfolio URL"
            className="input-field md:col-span-2"
            value={data.personalInfo.portfolio}
            onChange={(e) => updatePersonalInfo('portfolio', e.target.value)}
          />
        </div>
      </section>

      {/* Experience */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-serif text-slate-800 flex items-center">
             <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mr-3 border border-emerald-100">
                <Briefcase size={16} />
            </span>
            Experience
          </h2>
          <button onClick={addExperience} className="btn-secondary text-xs flex items-center">
            <Plus size={14} className="mr-1" /> Add Role
          </button>
        </div>

        <div className="space-y-6">
          {data.experience.map((exp) => (
            <div key={exp.id} className="p-4 border border-slate-200 rounded-lg bg-slate-50/50">
              <div className="flex justify-between mb-3">
                 <h3 className="font-semibold text-slate-700 text-sm">{exp.title || 'New Role'}</h3>
                 <button onClick={() => removeExperience(exp.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                   <Trash2 size={16} />
                 </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="Job Title"
                  className="input-field"
                  value={exp.title}
                  onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Company Name"
                  className="input-field"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Start Date"
                  className="input-field"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                />
                <div className="flex gap-2 items-center">
                    <input
                    type="text"
                    placeholder="End Date"
                    className="input-field"
                    value={exp.endDate}
                    disabled={exp.isCurrent}
                    onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                    />
                    <label className="flex items-center text-xs whitespace-nowrap text-slate-500 cursor-pointer hover:text-slate-700">
                        <input 
                            type="checkbox" 
                            checked={exp.isCurrent}
                            onChange={(e) => updateExperience(exp.id, 'isCurrent', e.target.checked)}
                            className="mr-2 accent-emerald-500"
                        /> Current
                    </label>
                </div>
              </div>
              
              <div className="space-y-2 mt-4">
                <div className="flex justify-between items-center">
                     <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        Responsibilities (XYZ Formula)
                    </p>
                    <button onClick={() => addPoint(exp.id)} className="text-[10px] text-emerald-600 hover:text-emerald-700 font-medium flex items-center">
                        <Plus size={10} className="mr-1" /> Add
                    </button>
                </div>
               
                {exp.points.map((point, idx) => (
                  <div key={idx} className="flex gap-2 items-start group">
                    <div className="flex-1 relative">
                        <textarea
                            className="input-field min-h-[60px] text-sm resize-y leading-relaxed py-3"
                            placeholder="Accomplished [X] as measured by [Y], by doing [Z]..."
                            value={point}
                            onChange={(e) => updatePoint(exp.id, idx, e.target.value)}
                        />
                         <button
                            onClick={() => handleEnhancePoint(exp.id, idx, point)}
                            disabled={!point || loadingId === `${exp.id}-${idx}`}
                            className="absolute bottom-2 right-2 p-1.5 rounded-md bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border border-indigo-200 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Enhance with AI"
                        >
                            {loadingId === `${exp.id}-${idx}` ? (
                                <span className="animate-spin block w-3 h-3 border-2 border-indigo-600 border-t-transparent rounded-full"></span>
                            ) : (
                                <Sparkles size={12} />
                            )}
                        </button>
                    </div>
                    <button 
                        onClick={() => removePoint(exp.id, idx)} 
                        className="mt-3 text-slate-300 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-all"
                    >
                        <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
         <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-serif text-slate-800 flex items-center">
            <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mr-3 border border-amber-100">
                <GraduationCap size={16} />
            </span>
            Education
          </h2>
          <button onClick={addEducation} className="btn-secondary text-xs flex items-center">
            <Plus size={14} className="mr-1" /> Add
          </button>
        </div>
        <div className="space-y-4">
            {data.education.map((edu) => (
                <div key={edu.id} className="p-4 border border-slate-200 rounded-lg bg-slate-50/50 relative group">
                     <button onClick={() => removeEducation(edu.id)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                        <Trash2 size={14} />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                            type="text"
                            placeholder="Institution"
                            className="input-field"
                            value={edu.institution}
                            onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Degree"
                            className="input-field"
                            value={edu.degree}
                            onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Year"
                            className="input-field"
                            value={edu.graduationDate}
                            onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="GPA"
                            className="input-field"
                            value={edu.gpa}
                            onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                        />
                    </div>
                </div>
            ))}
        </div>
      </section>

       {/* Skills */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-serif text-slate-800 flex items-center mb-5">
            <span className="w-8 h-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center mr-3 border border-pink-100">
                <Code size={16} />
            </span>
            Skills
          </h2>
          <div className="space-y-4">
            {data.skills.map((skill) => (
                <div key={skill.id}>
                    <label className="block text-xs font-medium text-slate-500 mb-1 ml-1">{skill.category}</label>
                    <input
                        type="text"
                        placeholder="Comma separated list (e.g. React, TypeScript, Java)"
                        className="input-field"
                        value={skill.items}
                        onChange={(e) => updateSkill(skill.id, 'items', e.target.value)}
                    />
                </div>
            ))}
          </div>
      </section>
      
      <style>{`
        .input-field {
            width: 100%;
            padding: 0.6rem 0.8rem;
            background-color: #fff;
            border: 1px solid #e2e8f0;
            border-radius: 0.5rem;
            color: #0f172a;
            font-size: 0.875rem;
            outline: none;
            transition: all 0.2s;
        }
        .input-field::placeholder {
            color: #94a3b8;
        }
        .input-field:focus {
            border-color: #3b82f6;
            background-color: #fff;
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
        }
        .btn-secondary {
            padding: 0.4rem 0.8rem;
            background-color: white;
            border: 1px solid #e2e8f0;
            border-radius: 0.375rem;
            color: #64748b;
            transition: all 0.2s;
        }
        .btn-secondary:hover {
            background-color: #f8fafc;
            color: #334155;
            border-color: #cbd5e1;
        }
      `}</style>
    </div>
  );
};