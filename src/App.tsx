import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Terminal, 
  Cpu, 
  Network, 
  Code2, 
  Layers, 
  ExternalLink, 
  Download,
  CheckCircle2,
  Trophy,
  BookOpen,
  Cloud,
  Settings,
  Server,
  Globe,
  Sparkles,
  X,
  Send,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { resumeData } from './data';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---

interface AnalysisResult {
  score: number;
  matches: string[];
  gaps: string[];
  pitch: string;
}

// --- Components ---

const SectionTitle = ({ title, icon: Icon, subtitle }: { title: string; icon: any; subtitle?: string }) => (
  <div className="mb-12">
    <div className="flex items-center gap-3 mb-2">
      <div className="p-2 bg-brand/10 border border-brand/20 rounded-lg">
        <Icon className="w-5 h-5 text-brand" />
      </div>
      <h2 className="text-2xl font-display font-bold text-zinc-100">{title}</h2>
    </div>
    {subtitle && <p className="text-zinc-500 font-mono text-sm">{subtitle}</p>}
  </div>
);

const SkillCard = ({ 
  category, 
  items, 
  activeSkill, 
  onHover 
}: { 
  category: string; 
  items: string[]; 
  activeSkill: string | null; 
  onHover: (s: string | null) => void 
}) => (
  <div className="glass-card group hover:border-brand/30 transition-all duration-300">
    <h3 className="text-zinc-100 font-medium mb-4 flex items-center gap-2 group-hover:text-brand transition-colors">
      <span className="w-1.5 h-1.5 rounded-full bg-brand" />
      {category}
    </h3>
    <div className="flex flex-wrap gap-2">
      {items.map((skill) => (
        <span 
          key={skill} 
          onMouseEnter={() => onHover(skill)}
          onMouseLeave={() => onHover(null)}
          className={cn(
            "skill-tag select-none",
            activeSkill === skill && "border-brand/60 text-brand bg-brand/5 shadow-[0_0_10px_rgba(14,165,233,0.1)]"
          )}
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
);

const ProjectCard = ({ 
  project, 
  activeSkill 
}: { 
  project: typeof resumeData.projects[0]; 
  activeSkill: string | null 
}) => {
  const isMatch = activeSkill && project.tags.some(tag => 
    tag.toLowerCase().includes(activeSkill.toLowerCase()) || 
    activeSkill.toLowerCase().includes(tag.toLowerCase())
  );

  return (
    <div className={cn(
      "glass-card group relative overflow-hidden transition-all duration-500",
      isMatch ? "border-brand/60 shadow-[0_0_30px_rgba(14,165,233,0.15)] bg-zinc-900/80" : ""
    )}>
      <div className={cn(
        "absolute top-0 left-0 w-1 h-full bg-brand transition-opacity duration-300",
        isMatch ? "opacity-100" : "opacity-0 group-hover:opacity-100"
      )} />
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col">
          <span className="text-xs font-mono text-brand mb-1 uppercase tracking-widest">{project.period}</span>
          <h3 className={cn(
            "text-xl font-bold text-zinc-100 italic transition-colors",
            isMatch ? "text-brand" : "group-hover:text-brand"
          )}>{project.title}</h3>
          {project.subtitle && <p className="text-sm text-zinc-400 mt-1">{project.subtitle}</p>}
        </div>
        <ExternalLink className={cn(
          "w-5 h-5 transition-colors",
          isMatch ? "text-brand" : "text-zinc-600 group-hover:text-brand"
        )} />
      </div>
      <p className="text-zinc-500 text-sm mb-6 leading-relaxed">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => {
          const isTagMatch = activeSkill && (
            tag.toLowerCase().includes(activeSkill.toLowerCase()) || 
            activeSkill.toLowerCase().includes(tag.toLowerCase())
          );
          return (
            <span 
              key={tag} 
              className={cn(
                "px-2 py-0.5 border rounded text-[10px] font-mono transition-all duration-300",
                isTagMatch 
                  ? "bg-brand/20 border-brand/50 text-brand" 
                  : "bg-zinc-950 border-zinc-800 text-zinc-400 group-hover:border-zinc-700"
              )}
            >
              {tag}
            </span>
          );
        })}
      </div>
    </div>
  );
};

const TerminalHero = () => {
  const [lines, setLines] = useState<string[]>([]);
  const terminalSequence = [
    "$ init portfolio-deploy",
    "Fetching credentials for Mukul Ranjan...",
    "Cloud: AWS/Azure connected [OK]",
    "CI/CD: Pipelines active [OK]",
    "Infrastructure: Ready [OK]",
    "Deployment in progress █ █ █ █ █ █ █ 100%",
    "SYSTEM STATUS: ONLINE",
  ];

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      if (current < terminalSequence.length) {
        setLines(prev => [...prev, terminalSequence[current]]);
        current++;
      } else {
        clearInterval(interval);
      }
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="terminal-window shadow-2xl">
      <div className="bg-zinc-900 px-4 py-2 flex items-center gap-2 border-bottom border-zinc-800">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-amber-500/50" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
        </div>
        <div className="text-[10px] text-zinc-500 font-mono ml-4 uppercase tracking-tighter">bash — 80x24</div>
      </div>
      <div className="p-6 font-mono text-xs sm:text-sm min-h-[220px]">
        {lines.map((line, i) => (
          <div key={i} className={cn(
            "mb-2",
            line?.includes("ERROR") ? "text-red-400" : 
            line?.includes("OK") || line?.includes("ONLINE") ? "text-emerald-400" : 
            line?.includes("$") ? "text-brand" : "text-zinc-400"
          )}>
            {line}
          </div>
        ))}
        {lines.length < terminalSequence.length && (
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-2 h-4 bg-zinc-500 inline-block"
          />
        )}
      </div>
    </div>
  );
};

const AIAssistant = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [jd, setJd] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!jd.trim()) return;
    setIsAnalyzing(true);
    setError(null);
    try {
      const resp = await fetch('/api/resume/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription: jd })
      });
      const data = await resp.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-xl bg-zinc-950 border-l border-zinc-800 shadow-2xl z-[70] flex flex-col"
          >
            <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand/20 rounded-lg">
                  <Sparkles className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">AI Shortlist Assistant</h2>
                  <p className="text-xs text-zinc-500 font-mono">MATCH_ENGINE_v1.0</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-500 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {!result && (
                <div className="space-y-4">
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Paste a job description below to see how well Mukul matches the role and get a custom elevator pitch.
                  </p>
                  <div className="relative">
                    <textarea
                      value={jd}
                      onChange={(e) => setJd(e.target.value)}
                      placeholder="Paste Job Description here..."
                      className="w-full h-64 bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-sm text-zinc-300 focus:outline-none focus:border-brand/50 transition-all font-mono placeholder:text-zinc-600"
                    />
                    <div className="absolute bottom-4 right-4 flex items-center gap-2 text-[10px] text-zinc-600 font-mono">
                      <Terminal size={10} />
                      READY_FOR_INPUT
                    </div>
                  </div>
                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !jd.trim()}
                    className="w-full bg-brand hover:bg-brand-dark disabled:opacity-50 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-brand/10 group"
                  >
                    {isAnalyzing ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        Run Match Analysis
                      </>
                    )}
                  </button>
                </div>
              )}

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex gap-3 text-red-400 text-sm italic">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  {error}
                </div>
              )}

              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="flex items-center justify-between p-6 bg-zinc-900 rounded-2xl border border-zinc-800">
                    <div>
                      <h3 className="text-zinc-400 text-xs font-mono uppercase tracking-widest mb-1">Match Score</h3>
                      <div className="text-4xl font-display font-bold text-white">{result.score}%</div>
                    </div>
                    <div className="relative w-20 h-20">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="40" cy="40" r="36" fill="transparent" stroke="#18181b" strokeWidth="8" />
                        <circle 
                          cx="40" cy="40" r="36" fill="transparent" stroke="#0ea5e9" strokeWidth="8" 
                          strokeDasharray={2 * Math.PI * 36}
                          strokeDashoffset={2 * Math.PI * 36 * (1 - result.score / 100)}
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass-card !bg-emerald-500/5 !border-emerald-500/20">
                      <h4 className="text-emerald-400 text-xs font-bold mb-3 flex items-center gap-2">
                        <CheckCircle2 size={12} /> Key Matches
                      </h4>
                      <ul className="space-y-2">
                        {result.matches.slice(0, 4).map((m, i) => (
                          <li key={i} className="text-[11px] text-zinc-400 flex gap-2">
                            <span className="text-emerald-500 tracking-tighter">•</span>{m}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="glass-card !bg-amber-500/5 !border-amber-500/20">
                      <h4 className="text-amber-400 text-xs font-bold mb-3 flex items-center gap-2">
                        <AlertCircle size={12} /> Optimization Gaps
                      </h4>
                      <ul className="space-y-2">
                        {result.gaps.slice(0, 4).map((g, i) => (
                          <li key={i} className="text-[11px] text-zinc-400 flex gap-2">
                            <span className="text-amber-500 tracking-tighter">•</span>{g}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-6 bg-brand/5 border border-brand/20 rounded-2xl relative overflow-hidden">
                    <h4 className="text-brand text-xs font-bold mb-3 flex items-center gap-2">
                      <Sparkles size={12} /> Recommended Elevator Pitch
                    </h4>
                    <p className="text-sm text-zinc-300 leading-relaxed italic italic-font">
                      "{result.pitch}"
                    </p>
                  </div>

                  <button
                    onClick={() => setResult(null)}
                    className="w-full py-3 text-sm font-medium text-zinc-500 hover:text-white transition-colors flex items-center justify-center gap-2"
                  >
                    <Terminal size={14} /> Reset Analysis Pipeline
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const ResumeModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 sm:p-8"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        >
          {/* Header Actions */}
          <div className="bg-zinc-100 px-6 py-4 border-b border-zinc-200 flex justify-between items-center no-print">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="ml-2 text-xs font-mono text-zinc-500 uppercase">mukul_ranjan_resume.pdf</span>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => window.print()}
                className="p-2 hover:bg-zinc-200 rounded-lg text-zinc-600 transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <Download size={16} />
                Print/Download
              </button>
              <button 
                onClick={onClose} 
                className="p-2 hover:bg-zinc-200 rounded-lg text-zinc-600 transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Resume Content */}
          <div className="flex-1 overflow-y-auto p-12 bg-white text-zinc-900 custom-scrollbar" id="printable-resume">
            <div className="max-w-3xl mx-auto space-y-10 text-left">
              {/* Header */}
              <div className="text-center border-b-2 border-zinc-900 pb-8">
                <h1 className="text-4xl font-bold uppercase tracking-tight mb-2">{resumeData.personal.name}</h1>
                <p className="text-xl text-zinc-600 font-medium mb-4">{resumeData.personal.role}</p>
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-zinc-500 font-mono">
                  <span className="flex items-center gap-1.5"><Mail size={12} className="text-zinc-400" /> {resumeData.personal.email}</span>
                  <span className="flex items-center gap-1.5"><MapPin size={12} className="text-zinc-400" /> {resumeData.personal.location}</span>
                  <span className="flex items-center gap-1.5"><Linkedin size={12} className="text-zinc-400" /> {resumeData.personal.linkedin}</span>
                  <span className="flex items-center gap-1.5"><Github size={12} className="text-zinc-400" /> {resumeData.personal.github}</span>
                </div>
              </div>

              {/* Summary */}
              <section>
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-4 border-l-4 border-zinc-900 pl-3">Professional Summary</h2>
                <p className="text-zinc-700 leading-relaxed text-sm">
                  {resumeData.summary}
                </p>
              </section>

              {/* Skills */}
              <section>
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-4 border-l-4 border-zinc-900 pl-3">Technical Skills</h2>
                <div className="grid grid-cols-2 gap-y-4 gap-x-12">
                  {resumeData.skills.map((skill) => (
                    <div key={skill.category}>
                      <h3 className="text-xs font-bold uppercase mb-2 text-zinc-900">{skill.category}</h3>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        {skill.items.join(', ')}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Project Highlights */}
              <section>
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-4 border-l-4 border-zinc-900 pl-3">Key Projects</h2>
                <div className="space-y-6">
                  {resumeData.projects.map((project) => (
                    <div key={project.title}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="text-sm font-bold text-zinc-900">{project.title} {project.subtitle && <span className="text-zinc-400 font-normal">| {project.subtitle}</span>}</h3>
                        <span className="text-[10px] font-mono text-zinc-400 uppercase">{project.period}</span>
                      </div>
                      <p className="text-[13px] text-zinc-600 leading-relaxed mb-2">{project.description}</p>
                      <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Tech: {project.tags.join(', ')}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Education */}
              <section>
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-4 border-l-4 border-zinc-900 pl-3">Education</h2>
                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-sm font-bold text-zinc-900">{resumeData.education.institution}</h3>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase">{resumeData.education.expected}</span>
                  </div>
                  <p className="text-[13px] text-zinc-600 mb-2">{resumeData.education.degree} in {resumeData.education.major}</p>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase">Coursework: {resumeData.education.coursework.join(', ')}</p>
                </div>
              </section>

              {/* Two Column Section */}
              <div className="grid grid-cols-2 gap-12">
                <section>
                  <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-4 border-l-4 border-zinc-900 pl-3">Certifications</h2>
                  <ul className="space-y-1 text-xs text-zinc-600">
                    {resumeData.certifications.map((cert) => <li key={cert} className="flex gap-2"><span>•</span> {cert}</li>)}
                  </ul>
                </section>
                <section>
                  <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-4 border-l-4 border-zinc-900 pl-3">Accomplishments</h2>
                  <ul className="space-y-1 text-xs text-zinc-600">
                    {resumeData.accomplishments.map((acc, i) => <li key={i} className="flex gap-2"><span>•</span> {acc}</li>)}
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// --- Main App ---

export default function App() {
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  return (
    <div className="min-h-screen selection:bg-brand/30 selection:text-white">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden text-[10px] items-center justify-center font-mono opacity-5 flex text-zinc-500 uppercase select-none">
        <div className="rotate-90 whitespace-nowrap">deploy-pipeline-mukul — system-ready — status-stable — </div>
        <div className="rotate-90 whitespace-nowrap">deploy-pipeline-mukul — system-ready — status-stable — </div>
      </div>
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand/3 blur-[100px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
      </div>

      {/* AI Trigger FAB */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsAIOpen(true)}
        className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-brand text-white px-6 py-4 rounded-2xl font-bold shadow-2xl shadow-brand/40 group"
      >
        <Sparkles className="w-5 h-5 animate-pulse" />
        <span className="hidden sm:inline">Shortlist Matcher</span>
      </motion.button>

      <AIAssistant isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 rounded-2xl px-6 py-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand rounded flex items-center justify-center font-bold text-white text-sm">MR</div>
            <span className="font-display font-bold text-zinc-100 hidden sm:block">Mukul Ranjan</span>
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => {
                navigator.clipboard.writeText(resumeData.personal.email);
                alert('Email copied to clipboard!');
              }}
              className="text-zinc-400 hover:text-brand transition-colors p-2"
              title="Copy Email"
            >
              <Mail size={18} />
            </button>
            <a href={`https://${resumeData.personal.github}`} target="_blank" className="text-zinc-400 hover:text-brand transition-colors p-2"><Github size={18} /></a>
            <a href={`https://${resumeData.personal.linkedin}`} target="_blank" className="text-zinc-400 hover:text-brand transition-colors p-2"><Linkedin size={18} /></a>
            <div className="h-4 w-[1px] bg-zinc-800 mx-2 hidden sm:block" />
            <button 
              onClick={() => setIsResumeOpen(true)}
              className="bg-brand hover:bg-brand-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 group"
            >
              <Download size={16} className="group-hover:-translate-y-0.5 transition-transform" />
              Resume
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/10 border border-brand/20 rounded-full text-brand text-xs font-mono mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
              </span>
              AVAILABLE FOR NEW ROLES
            </div>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl mb-6 leading-[1.1] tracking-tight">
              Scaling <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand via-sky-400 to-indigo-500">Infrastructures</span> with Precision.
            </h1>
            <p className="text-zinc-400 text-lg max-w-xl mb-8 leading-relaxed">
              {resumeData.summary}
            </p>
            <div className="flex flex-wrap gap-4 text-zinc-500 font-mono text-xs">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg"><MapPin size={12} className="text-brand" /> {resumeData.personal.location}</div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg"><Phone size={12} className="text-brand" /> {resumeData.personal.phone}</div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg"><Terminal size={12} className="text-brand" /> 2027_BTECH_CSE</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <TerminalHero />
          </motion.div>
        </div>

        {/* Categories Section (Bento) */}
        <section className="mb-32">
          <SectionTitle title="Technical DNA" icon={Cpu} subtitle="CORE_COMPETENCIES_v2.0" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resumeData.skills.map((skill, i) => (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <SkillCard 
                  {...skill} 
                  activeSkill={activeSkill} 
                  onHover={setActiveSkill} 
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-32">
          <SectionTitle title="Featured Deployments" icon={Layers} subtitle="SELECTED_WORKS_MANIFEST" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resumeData.projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <ProjectCard 
                  project={project} 
                  activeSkill={activeSkill} 
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Extra Intel */}
        <div className="grid lg:grid-cols-3 gap-12 items-start mb-32">
          {/* Education */}
          <div className="lg:col-span-2">
            <SectionTitle title="Academic Foundation" icon={BookOpen} subtitle="ACADEMIC_RECORD" />
            <div className="glass-card flex flex-col sm:flex-row gap-8 items-center sm:items-start text-center sm:text-left hover:border-brand/20 transition-all duration-300">
              <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center shrink-0 border border-zinc-700">
                <Globe className="w-8 h-8 text-brand" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-zinc-100 mb-1">{resumeData.education.degree} — {resumeData.education.major}</h3>
                <p className="text-brand font-medium mb-2">{resumeData.education.institution}</p>
                <p className="text-zinc-500 text-sm mb-4">{resumeData.education.expected}</p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  {resumeData.education.coursework.map(course => (
                    <span key={course} className="px-2 py-1 bg-zinc-950/50 border border-zinc-800 rounded text-[10px] font-mono text-zinc-500">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Accomplishments */}
          <div>
            <SectionTitle title="Validation" icon={Trophy} subtitle="STATS_&_IMPACT" />
            <div className="space-y-4">
              {resumeData.accomplishments.map((acc, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex gap-4 p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/50 hover:bg-zinc-900/50 transition-colors"
                >
                  <CheckCircle2 className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                  <p className="text-[13px] text-zinc-400 leading-snug">{acc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications (Slider horizontal if many, grid for now) */}
        <section className="mb-32">
          <SectionTitle title="Certification Layer" icon={Settings} subtitle="VERIFIED_AUTHORIZATION" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {resumeData.certifications.map((certs, i) => {
              const isMatch = activeSkill && certs.toLowerCase().includes(activeSkill.toLowerCase());
              return (
                <div 
                  key={i} 
                  className={cn(
                    "p-4 bg-zinc-900/50 border rounded-xl flex items-center gap-3 group transition-all duration-300",
                    isMatch ? "border-brand/60 bg-brand/10 shadow-[0_0_15px_rgba(14,165,233,0.1)]" : "border-zinc-800 hover:border-brand/30"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                    isMatch ? "bg-brand/20" : "bg-zinc-800 group-hover:bg-brand/20"
                  )}>
                    <Server className={cn(
                      "w-4 h-4 transition-colors",
                      isMatch ? "text-brand" : "text-zinc-500 group-hover:text-brand"
                    )} />
                  </div>
                  <span className={cn(
                    "text-xs font-medium transition-colors leading-tight",
                    isMatch ? "text-zinc-100" : "text-zinc-500 group-hover:text-zinc-100"
                  )}>{certs}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Final Recruitment CTA */}
        <footer className="relative mt-24">
          <div className="absolute inset-0 bg-brand/5 blur-3xl rounded-full" />
          <div className="relative glass-card border-brand/20 bg-brand/5 py-20 text-center max-w-4xl mx-auto shadow-brand/10">
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-6">Shortlist Mukul Today</h2>
            <p className="text-zinc-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Active DevOps candidate with a passion for building reliable, self-healing systems. 
              Currently open to internships and full-time roles for 2027.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href={`mailto:${resumeData.personal.email}`}
                className="inline-flex items-center gap-3 bg-brand hover:bg-brand-dark text-white px-10 py-5 rounded-2xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-brand/40"
              >
                <Mail size={20} />
                Connect via Email
              </a>
              <div className="w-full sm:w-auto h-[1px] sm:h-auto sm:w-[1px] bg-zinc-800 my-4 sm:my-0 sm:mx-6" />
              <div className="flex items-center justify-center gap-4">
                <a href={`https://${resumeData.personal.github}`} target="_blank" className="p-5 bg-zinc-900 border border-zinc-800 rounded-2xl text-zinc-500 hover:text-white transition-all shadow-xl hover:border-brand/30"><Github size={24} /></a>
                <a href={`https://${resumeData.personal.linkedin}`} target="_blank" className="p-5 bg-zinc-900 border border-zinc-800 rounded-2xl text-zinc-500 hover:text-white transition-all shadow-xl hover:border-brand/30"><Linkedin size={24} /></a>
              </div>
            </div>
          </div>
          
          <div className="mt-24 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-600 text-[10px] font-mono tracking-[0.2em] uppercase">
            <span>© 2024 MUKUL RANJAN — DEV_OPS_INFRA — VER_3.1</span>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2 tracking-widest"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> SYSTEM_ONLINE</span>
              <span className="flex items-center gap-2 hover:text-brand cursor-help transition-colors">REGION: INDIA_UK_2481</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
