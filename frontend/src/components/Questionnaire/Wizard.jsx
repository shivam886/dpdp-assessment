import { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle, Save, Loader2, Edit3 } from 'lucide-react';
import { SECTIONS } from '../../data/questions';
import ProgressBar from './ProgressBar';
import Step from './Step';

export default function Wizard({ onComplete }) {
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isAutoSaving, setIsAutoSaving] = useState(false);
    const [animating, setAnimating] = useState(false);
    const [isReviewing, setIsReviewing] = useState(false);

    const currentSection = SECTIONS[currentSectionIndex];
    const totalSections = SECTIONS.length;

    useEffect(() => {
        // Simulate auto-save
        const timer = setTimeout(() => {
            if (Object.keys(answers).length > 0) {
                setIsAutoSaving(true);
                setTimeout(() => setIsAutoSaving(false), 800);
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [answers]);

    const handleAnswerChange = (questionId, value) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    const nextStep = () => {
        setAnimating(true);
        setTimeout(() => {
            if (currentSectionIndex < totalSections - 1) {
                setCurrentSectionIndex(prev => prev + 1);
                window.scrollTo(0, 0);
            } else if (!isReviewing) {
                setIsReviewing(true);
                window.scrollTo(0, 0);
            } else {
                onComplete(answers);
            }
            setAnimating(false);
        }, 300);
    };

    const prevStep = () => {
        setAnimating(true);
        setTimeout(() => {
            if (isReviewing) {
                setIsReviewing(false);
            } else if (currentSectionIndex > 0) {
                setCurrentSectionIndex(prev => prev - 1);
            }
            window.scrollTo(0, 0);
            setAnimating(false);
        }, 300);
    };

    const progress = isReviewing ? 100 : ((currentSectionIndex + 1) / totalSections) * 100;

    return (
        <div className="max-w-5xl mx-auto py-12 px-6">
            {/* Context Header */}
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 animate-fade-in">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                        {isReviewing ? 'Review Your Answers' : currentSection.title}
                    </h2>
                    <p className="text-slate-500 mt-2 text-lg">
                        {isReviewing ? 'Please review your responses before final submission.' : currentSection.description}
                    </p>
                </div>
                <div className="text-right min-w-[200px]">
                    <div className="flex items-center justify-end gap-2 mb-2 text-sm font-semibold text-slate-600">
                        {isReviewing ? (
                            <span>Review</span>
                        ) : (
                            <>
                                <span>Step {currentSectionIndex + 1}</span>
                                <span className="text-slate-300">/</span>
                                <span>{totalSections}</span>
                            </>
                        )}
                    </div>
                    <ProgressBar progress={progress} />
                    <div className="h-6 mt-1 flex justify-end">
                        {isAutoSaving && (
                            <span className="text-xs text-brand-600 font-medium flex items-center gap-1.5 animate-pulse">
                                <Loader2 size={12} className="animate-spin" /> Saving progress...
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Question Card */}
            <div className={`relative transition-all duration-300 ease-in-out transform ${animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-white/50 p-8 md:p-12 min-h-[500px]">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/0 rounded-2xl pointer-events-none" />
                    <div className="relative z-10">
                        {isReviewing ? (
                            <div className="space-y-8">
                                {SECTIONS.map((section, sIdx) => (
                                    <div key={section.id} className="border-b border-slate-100 pb-6 last:border-0">
                                        <h3 className="text-lg font-bold text-slate-800 mb-4">{section.title}</h3>
                                        <div className="space-y-4">
                                            {section.questions.map(q => (
                                                <div key={q.id} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <div className="text-sm font-medium text-slate-500 md:col-span-1">{q.text}</div>
                                                    <div className="text-sm text-slate-900 md:col-span-2 font-medium">
                                                        {Array.isArray(answers[q.id])
                                                            ? answers[q.id].join(', ')
                                                            : (answers[q.id] || <span className="text-slate-400 italic">Not answered</span>)
                                                        }
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <Step
                                section={currentSection}
                                answers={answers}
                                onAnswerChange={handleAnswerChange}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 p-6 z-30">
                <div className="max-w-5xl mx-auto flex justify-between items-center">
                    <button
                        onClick={prevStep}
                        disabled={!isReviewing && currentSectionIndex === 0}
                        className={`group flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${(!isReviewing && currentSectionIndex === 0)
                            ? 'text-slate-300 cursor-not-allowed'
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                            }`}
                    >
                        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back
                    </button>

                    <button
                        onClick={nextStep}
                        className="group flex items-center gap-3 px-8 py-3 bg-slate-900 hover:bg-brand-600 text-white rounded-xl font-bold shadow-lg shadow-slate-900/10 hover:shadow-brand-600/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                        {isReviewing ? 'Submit Assessment' : (currentSectionIndex === totalSections - 1 ? 'Review Answers' : 'Next Section')}
                        {isReviewing ? <CheckCircle size={20} /> : <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                    </button>
                </div>
            </div>
        </div>
    );
}
