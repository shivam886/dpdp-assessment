import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Wizard from '../components/Questionnaire/Wizard';
import { X } from 'lucide-react';

export default function AssessmentRunner() {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleComplete = (answers) => {
        console.log('Assessment Completed:', answers);

        // Save to local storage for Admin demo
        const existingSubmissions = JSON.parse(localStorage.getItem('dpdp_submissions') || '[]');
        const newSubmission = {
            id: Date.now(),
            answers,
            submittedAt: new Date().toISOString(),
            status: 'Completed',
            score: Math.floor(Math.random() * 30) + 70, // Mock score
            risk: 'Low' // Mock risk
        };
        localStorage.setItem('dpdp_submissions', JSON.stringify([...existingSubmissions, newSubmission]));

        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-8 text-center animate-fade-in-up">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-3">Thank You!</h2>
                    <p className="text-slate-500 text-lg mb-8">
                        Your assessment has been successfully submitted. You can now return to the dashboard.
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full py-3 px-6 bg-slate-900 hover:bg-brand-600 text-white rounded-xl font-bold shadow-lg transition-transform transform hover:-translate-y-0.5"
                    >
                        Return to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Enterprise Header */}
            <div className="bg-white border-b border-slate-200 px-8 py-4 sticky top-0 z-20 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Athenian Tech" className="h-10 w-auto invert" />
                    <span className="hidden md:inline-block text-slate-500 text-sm font-medium">DPDP Assessment Suite</span>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto">
                <Wizard onComplete={handleComplete} />
            </div>
        </div>
    );
}
