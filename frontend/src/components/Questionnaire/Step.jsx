export default function Step({ section, answers, onAnswerChange }) {
    return (
        <div className="space-y-12">
            {section.questions.map((q, index) => (
                <div key={q.id} className="animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="mb-4">
                        <label className="block text-xl font-semibold text-slate-800 leading-snug">
                            {q.text} {q.required && <span className="text-red-500 text-sm ml-1">*</span>}
                        </label>
                    </div>

                    <div className="ml-1">
                        <QuestionInput
                            question={q}
                            value={answers[q.id]}
                            onChange={(val) => onAnswerChange(q.id, val)}
                        />
                    </div>
                    {/* Divider for cleaner separation */}
                    {index < section.questions.length - 1 && (
                        <div className="h-px bg-slate-100 mt-12 w-full" />
                    )}
                </div>
            ))}
        </div>
    );
}

function QuestionInput({ question, value, onChange }) {
    const baseInputStyles = "w-full max-w-2xl p-4 bg-slate-50 border-2 border-slate-100 rounded-xl text-slate-800 placeholder-slate-400 outline-none focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10 transition-all duration-200 font-medium";

    switch (question.type) {
        case 'text':
            return (
                <input
                    type="text"
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    className={baseInputStyles}
                    placeholder="Type your answer here..."
                />
            );
        case 'select':
            return (
                <div className="relative max-w-2xl">
                    <select
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                        className={`${baseInputStyles} appearance-none cursor-pointer`}
                    >
                        <option value="">Select an option...</option>
                        {question.options.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
            );
        case 'radio':
            return (
                <div className="space-y-3 max-w-2xl">
                    {question.options.map(opt => (
                        <label key={opt} className={`group flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${value === opt ? 'border-brand-500 bg-brand-50/50' : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'}`}>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${value === opt ? 'border-brand-600' : 'border-slate-300 group-hover:border-slate-400'}`}>
                                {value === opt && <div className="w-2.5 h-2.5 rounded-full bg-brand-600" />}
                            </div>
                            <input
                                type="radio"
                                name={question.id}
                                value={opt}
                                checked={value === opt}
                                onChange={(e) => onChange(e.target.value)}
                                className="sr-only"
                            />
                            <span className={`font-medium ${value === opt ? 'text-brand-900' : 'text-slate-600 group-hover:text-slate-900'}`}>{opt}</span>
                        </label>
                    ))}
                </div>
            );
        case 'yesno':
            return (
                <div className="flex gap-4 max-w-md">
                    {['Yes', 'No'].map(opt => (
                        <label key={opt} className={`flex-1 flex items-center justify-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${value === opt
                            ? (opt === 'Yes' ? 'border-green-500 bg-green-50 text-green-700' : 'border-red-500 bg-red-50 text-red-700')
                            : 'border-slate-100 hover:bg-slate-50 text-slate-600'}`}>
                            <input
                                type="radio"
                                name={question.id}
                                value={opt}
                                checked={value === opt}
                                onChange={(e) => onChange(e.target.value)}
                                className="sr-only"
                            />
                            <span className="font-bold">{opt}</span>
                        </label>
                    ))}
                </div>
            );
        case 'multiselect':
            const selected = Array.isArray(value) ? value : [];
            const toggle = (opt) => {
                if (selected.includes(opt)) {
                    onChange(selected.filter(s => s !== opt));
                } else {
                    onChange([...selected, opt]);
                }
            };
            return (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl">
                    {question.options.map(opt => (
                        <label key={opt} className={`flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${selected.includes(opt) ? 'border-brand-500 bg-brand-50/30' : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'}`}>
                            <div className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${selected.includes(opt) ? 'bg-brand-600 border-brand-600' : 'border-slate-300'}`}>
                                {selected.includes(opt) && <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                            </div>
                            <input
                                type="checkbox"
                                checked={selected.includes(opt)}
                                onChange={() => toggle(opt)}
                                className="sr-only"
                            />
                            <span className={`font-medium ${selected.includes(opt) ? 'text-brand-900' : 'text-slate-600'}`}>{opt}</span>
                        </label>
                    ))}
                </div>
            );
        default:
            return null;
    }
}
