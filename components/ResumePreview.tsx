import React from 'react';
import { ResumeData } from '../types';
import { Copy, Download, ExternalLink, Github, Linkedin, Mail, FileText, MapPin, Globe } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data }) => {
  const { personalInfo, education, experience, skills } = data;

  const handleExportWord = () => {
    // Generate a simple HTML structure compatible with Word
    const htmlContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
            <title>${personalInfo.fullName} Resume</title>
            <style>
                body { font-family: 'Times New Roman', serif; font-size: 11pt; color: #000; line-height: 1.15; }
                h1 { font-size: 20pt; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 1px; }
                h2 { font-size: 12pt; border-bottom: 1px solid #000; margin-top: 15px; margin-bottom: 8px; text-transform: uppercase; font-weight: bold; }
                h3 { font-size: 11pt; font-weight: bold; margin-bottom: 0; }
                p { margin-top: 0; margin-bottom: 3px; }
                a { color: #000; text-decoration: none; }
                ul { margin-top: 3px; padding-left: 20px; margin-bottom: 8px; }
                li { margin-bottom: 2px; }
                .contact-info { margin-bottom: 15px; font-size: 10pt; text-align: center; }
                .section-header { display: flex; justify-content: space-between; align-items: baseline; }
                .header-row { display: flex; justify-content: space-between; margin-bottom: 2px; }
            </style>
        </head>
        <body>
            <div style="text-align: center;">
                <h1>${personalInfo.fullName}</h1>
                <div class="contact-info">
                    ${[
                        personalInfo.email,
                        personalInfo.phone,
                        personalInfo.linkedin,
                        personalInfo.portfolio
                    ].filter(Boolean).join(' | ')}
                </div>
            </div>

            <h2>Education</h2>
            ${education.map(edu => `
                <div style="margin-bottom: 10px;">
                    <div style="display: flex; justify-content: space-between;">
                        <strong>${edu.institution}</strong>
                        <span>${edu.graduationDate}</span>
                    </div>
                    <div>${edu.degree} ${edu.gpa ? `| GPA: ${edu.gpa}` : ''}</div>
                </div>
            `).join('')}

            <h2>Experience</h2>
            ${experience.map(exp => `
                <div style="margin-bottom: 10px;">
                    <div style="display: flex; justify-content: space-between;">
                        <strong>${exp.title}</strong>
                        <span>${exp.startDate} - ${exp.isCurrent ? 'Present' : exp.endDate}</span>
                    </div>
                    <div style="font-style: italic; margin-bottom: 3px;">${exp.company}, ${exp.location}</div>
                    <ul>
                        ${exp.points.map(point => `<li>${point}</li>`).join('')}
                    </ul>
                </div>
            `).join('')}

            <h2>Skills</h2>
            ${skills.map(skill => `
                <div style="margin-bottom: 3px;">
                    <strong>${skill.category}:</strong> ${skill.items}
                </div>
            `).join('')}
        </body>
        </html>
    `;

    const blob = new Blob(['\ufeff', htmlContent], {
        type: 'application/msword'
    });
    
    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${personalInfo.fullName.replace(/\s+/g, '_')}_Resume.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col bg-slate-900 rounded-lg overflow-hidden border border-slate-700 shadow-[0_20px_50px_rgb(0,0,0,0.15)] transform transition-transform duration-300">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
            <span className="ml-2 text-xs text-slate-400 font-mono hidden sm:inline">resume.preview</span>
        </div>
        <div className="flex gap-2">
            <button 
              onClick={handleExportWord}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 rounded-md text-xs font-medium transition-all"
              title="Export as Word Document"
            >
              <FileText size={14} />
              Word
            </button>
        </div>
      </div>
      
      {/* Preview Area - Clean White Professional Design */}
      <div className="bg-white text-slate-900 relative min-h-[850px] overflow-hidden" id="resume-preview-content">
        
        <div className="max-w-[210mm] mx-auto px-10 py-12 md:px-12 md:py-16 h-full relative z-10">
            
            {/* Header / Hero */}
            <header className="border-b-2 border-slate-900 pb-6 mb-8">
                <h1 className="text-4xl font-serif font-bold text-slate-900 tracking-tight uppercase text-center mb-4">
                    {personalInfo.fullName}
                </h1>
                
                {/* Contact Links */}
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-600 font-medium">
                   {personalInfo.email && (
                        <div className="flex items-center gap-1.5">
                            <Mail size={14} className="text-slate-400" />
                            <span>{personalInfo.email}</span>
                        </div>
                   )}
                   {personalInfo.phone && (
                        <div className="flex items-center gap-1.5">
                            <span className="text-slate-400 font-bold">Ph:</span>
                            <span>{personalInfo.phone}</span>
                        </div>
                   )}
                   {personalInfo.linkedin && (
                        <div className="flex items-center gap-1.5">
                            <Linkedin size={14} className="text-slate-400" />
                            <span>{personalInfo.linkedin}</span>
                        </div>
                   )}
                   {personalInfo.portfolio && (
                        <div className="flex items-center gap-1.5">
                             <Globe size={14} className="text-slate-400" />
                             <span>{personalInfo.portfolio}</span>
                        </div>
                   )}
                </div>
            </header>

            {/* Education */}
            <section className="mb-8">
                 <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-4 flex items-center gap-2">
                    Education
                </h2>
                <div className="space-y-4">
                    {education.map(edu => (
                        <div key={edu.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline">
                            <div>
                                <h3 className="text-base font-bold text-slate-900">{edu.institution}</h3>
                                <div className="text-sm text-slate-700 italic">{edu.degree}</div>
                            </div>
                            <div className="text-right mt-1 sm:mt-0">
                                <div className="text-sm font-medium text-slate-900">{edu.graduationDate}</div>
                                {edu.gpa && <div className="text-xs text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded-full inline-block mt-1">GPA: {edu.gpa}</div>}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Experience Section */}
            <section className="mb-8">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-4 flex items-center gap-2">
                    Experience
                </h2>

                <div className="space-y-6">
                    {experience.map((exp) => (
                        <div key={exp.id}>
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                                <h3 className="text-base font-bold text-slate-900">
                                    {exp.title}
                                </h3>
                                <span className="text-sm font-medium text-slate-900">
                                    {exp.startDate} — {exp.isCurrent ? 'Present' : exp.endDate}
                                </span>
                            </div>
                            
                            <div className="text-sm font-medium text-slate-600 mb-2 italic flex items-center gap-1">
                                {exp.company} <span className="text-slate-300">|</span> {exp.location}
                            </div>
                            
                            <ul className="list-disc list-outside ml-4 space-y-1">
                                {exp.points.map((point, idx) => (
                                    point && (
                                        <li key={idx} className="text-sm text-slate-700 leading-relaxed pl-1 marker:text-slate-400">
                                            {point}
                                        </li>
                                    )
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

             {/* Skills Section */}
             <section>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-4 flex items-center gap-2">
                    Skills
                </h2>
                
                <div className="space-y-3">
                    {skills.map((skill) => (
                        <div key={skill.id} className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                            <h3 className="text-sm font-bold text-slate-700 min-w-[120px]">{skill.category}:</h3>
                            <div className="text-sm text-slate-600 leading-relaxed flex-1">
                                {skill.items}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
      </div>
    </div>
  );
};