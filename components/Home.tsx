import React from 'react';
import { Layout, ArrowRight, Sparkles, CheckCircle, Zap } from 'lucide-react';

interface HomeProps {
  onStart: () => void;
}

export const Home: React.FC<HomeProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-200">
                <Layout className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">CareerCraft AI</span>
          </div>
          
          <button 
            onClick={onStart}
            className="px-6 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-slate-800 transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-[#4F46E5] text-white pt-24 pb-32 lg:pt-36 lg:pb-48 overflow-hidden">
         {/* Abstract Background Shapes */}
         <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 mix-blend-screen"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 mix-blend-screen"></div>
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-30"></div>
         </div>
         
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/40 border border-indigo-400/30 text-indigo-100 text-sm font-medium mb-10 backdrop-blur-sm animate-fade-in-up">
                <Sparkles size={14} className="text-amber-300" />
                <span>Nonprofit tool for students</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tight mb-8 leading-[0.9] text-white">
                Build Your <br/> <span className="text-indigo-200">Professional Brand</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-indigo-100/90 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
                More than just a resume. Create a story that translates your background into terms recruiters value.
            </p>
            
            <button 
                onClick={onStart}
                className="group relative px-10 py-5 bg-white text-indigo-600 text-xl font-bold rounded-full hover:bg-indigo-50 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:-translate-y-1 flex items-center gap-3 mx-auto overflow-hidden"
            >
                <span className="relative z-10">Start Building Free</span>
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform relative z-10" />
            </button>
            
            {/* Floating UI Card Elements - Decorative */}
            <div className="absolute top-1/2 left-4 md:left-20 -translate-y-1/2 hidden lg:block opacity-60">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl transform -rotate-6 w-48">
                    <div className="h-2 w-12 bg-white/40 rounded mb-2"></div>
                    <div className="h-2 w-full bg-white/20 rounded mb-1"></div>
                    <div className="h-2 w-full bg-white/20 rounded mb-1"></div>
                    <div className="h-2 w-2/3 bg-white/20 rounded"></div>
                </div>
            </div>
             <div className="absolute top-1/2 right-4 md:right-20 -translate-y-1/2 hidden lg:block opacity-60">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl transform rotate-6 w-48">
                    <div className="flex gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-white/30"></div>
                        <div>
                             <div className="h-2 w-16 bg-white/40 rounded mb-1"></div>
                             <div className="h-2 w-10 bg-white/20 rounded"></div>
                        </div>
                    </div>
                    <div className="h-16 bg-white/10 rounded w-full"></div>
                </div>
            </div>
         </div>
      </div>

      {/* Feature Grid */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">Blocks for every career path</h2>
                <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                    Explore our block library that lets you add diverse content types to uniquely represent who you are - because you're more than a job title.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative">
                    {/* Visual representation of editor */}
                     <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 shadow-xl relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                            <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center gap-4">
                                <div className="p-2 bg-indigo-100 rounded-md text-indigo-600"><Sparkles size={18} /></div>
                                <div className="flex-1">
                                    <div className="h-2 w-24 bg-slate-200 rounded mb-1"></div>
                                    <div className="h-2 w-full bg-slate-100 rounded"></div>
                                </div>
                                <div className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full">AI Edit</div>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center gap-4 opacity-70">
                                <div className="p-2 bg-emerald-100 rounded-md text-emerald-600"><CheckCircle size={18} /></div>
                                <div className="flex-1">
                                    <div className="h-2 w-20 bg-slate-200 rounded mb-1"></div>
                                    <div className="h-2 w-3/4 bg-slate-100 rounded"></div>
                                </div>
                            </div>
                             <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center gap-4 opacity-50">
                                <div className="p-2 bg-amber-100 rounded-md text-amber-600"><Zap size={18} /></div>
                                <div className="flex-1">
                                    <div className="h-2 w-28 bg-slate-200 rounded mb-1"></div>
                                    <div className="h-2 w-5/6 bg-slate-100 rounded"></div>
                                </div>
                            </div>
                        </div>
                     </div>
                     {/* Decorative gradient blob behind */}
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-indigo-200 to-purple-200 blur-3xl rounded-full opacity-50 -z-10"></div>
                </div>

                <div className="space-y-8 md:pl-10">
                    <div className="flex gap-4 items-start">
                        <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl shrink-0">
                            <Sparkles size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Tap into AI to generate content</h3>
                            <p className="text-slate-500 leading-relaxed">
                                Never worry about manually collecting and writing your resume content again. Use AI to generate personalized bullet points and summaries.
                            </p>
                        </div>
                    </div>
                     <div className="flex gap-4 items-start">
                        <div className="p-3 bg-fuchsia-100 text-fuchsia-600 rounded-xl shrink-0">
                            <Zap size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Update your resume on the go</h3>
                            <p className="text-slate-500 leading-relaxed">
                                Edit and update your content anywhere. Our editor is fast, responsive, and designed to help you iterate quickly.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-start">
                        <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl shrink-0">
                            <Layout size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Add your own unique style</h3>
                            <p className="text-slate-500 leading-relaxed">
                                Use our professional templates to pick your favorite layouts and typography with a simple click.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-4 text-center">
                Industry leaders love CareerCraft
            </h2>
             <p className="text-center text-slate-500 mb-16 max-w-2xl mx-auto">
                Join professionals and students who use CareerCraft to develop their personal brand and stand out in the market.
             </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                {/* Large Featured Review */}
                <div className="md:col-span-2 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] p-8 md:p-12 rounded-3xl text-white shadow-xl flex flex-col justify-between">
                     <div>
                        <div className="flex gap-1 mb-6 text-yellow-300">
                            {[1,2,3,4,5].map(i => <span key={i}>★</span>)}
                        </div>
                        <p className="text-xl md:text-3xl font-serif font-medium leading-relaxed mb-8">
                            "It is rare to find a nonprofit tool this powerful. It is a genuine game-changer for first-generation students who feel left behind by the system."
                        </p>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">D</div>
                        <div>
                            <div className="font-bold text-lg">Daniel S.</div>
                            <div className="text-indigo-200 text-sm">First-Generation Student</div>
                        </div>
                     </div>
                </div>

                {/* Standard Reviews */}
                <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                    <div>
                        <p className="text-slate-600 leading-relaxed mb-6 font-medium">
                            "CareerCraft AI helped me bridge the gap as an international student. I finally have a resume that translates my background into terms recruiters actually value."
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">L</div>
                         <div>
                            <div className="font-bold text-slate-900">Li W.</div>
                            <div className="text-slate-400 text-xs">International Student</div>
                        </div>
                    </div>
                </div>

                 <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                    <div>
                        <p className="text-slate-600 leading-relaxed mb-6 font-medium">
                            "I didn't have a professional network to turn to for advice. This tool gave me the confidence and the high-quality resume I needed to land my first internship."
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center font-bold text-rose-600">A</div>
                         <div>
                            <div className="font-bold text-slate-900">Amara K.</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                    <div>
                        <p className="text-slate-600 leading-relaxed mb-6 font-medium">
                             "The AI-driven drafting is incredibly intuitive. It turned my raw work history into professional, high-impact bullet points in seconds."
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center font-bold text-blue-600">M</div>
                         <div>
                            <div className="font-bold text-slate-900">Marcus J.</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                    <div>
                        <p className="text-slate-600 leading-relaxed mb-6 font-medium">
                            "The smoothest experience I've had with a resume builder. You can tell it was designed specifically to solve the hurdles students actually face."
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center font-bold text-emerald-600">S</div>
                         <div>
                            <div className="font-bold text-slate-900">Sarah T.</div>
                        </div>
                    </div>
                </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                 <div className="flex items-center gap-2 mb-6 md:mb-0">
                    <Layout size={24} className="text-white" />
                    <span className="text-2xl font-bold text-white">CareerCraft AI</span>
                </div>
                <div className="flex gap-8">
                    <a href="#" className="hover:text-white transition-colors">Compare</a>
                    <a href="#" className="hover:text-white transition-colors">Use Cases</a>
                    <a href="#" className="hover:text-white transition-colors">Company</a>
                </div>
            </div>
            <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
                <p>&copy; {new Date().getFullYear()} CareerCraft AI. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                     <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                     <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
            </div>
         </div>
      </footer>
    </div>
  );
};