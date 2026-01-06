import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, ShieldCheck, AlertTriangle, Cloud, Globe } from 'lucide-react';

export default function ReportPreview() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <button onClick={() => navigate('/')} className="flex items-center gap-2 text-slate-500 hover:text-slate-700">
                        <ArrowLeft size={18} /> Back to Dashboard
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg shadow-sm">
                        <Download size={18} /> Download PDF
                    </button>
                </div>

                {/* Report Content */}
                <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                    {/* Report Header */}
                    <div className="bg-slate-900 text-white p-8">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-bold mb-2">DPDP Compliance Report</h1>
                                <p className="text-slate-400">Generated for Acme Corp on Oct 27, 2023</p>
                            </div>
                            <div className="text-right">
                                <div className="text-4xl font-bold text-green-400">85%</div>
                                <div className="text-sm text-slate-400">Readiness Score</div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 space-y-8">
                        {/* Executive Summary */}
                        <section>
                            <h2 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">1. Executive Summary</h2>
                            <p className="text-slate-600 leading-relaxed">
                                Acme Corp demonstrates a strong commitment to data privacy with a compliant Privacy Policy and robust appointment of a Data Protection Officer (DPO). However, gaps were identified in Cross-Border Data Transfer mechanisms and Data Retention policies which require immediate attention to ensure full compliance with the Digital Personal Data Protection Act, 2023.
                            </p>
                        </section>

                        {/* Risk Analysis Grid */}
                        <section>
                            <h2 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">2. Risk Analysis</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <RiskCard title="Consent Architecture" level="Low" description="Robust mechanisms in place." />
                                <RiskCard title="Cross-Border Transfer" level="High" description="Missing adequacy checks for EU transfers." />
                                <RiskCard title="Data Security" level="Medium" description="Encryption at rest needs validation." />
                            </div>
                        </section>

                        {/* Data Flow */}
                        <section>
                            <h2 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">3. Data Flow Overview</h2>
                            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                                <div className="flex justify-around items-center text-center">
                                    <div>
                                        <div className="p-3 bg-white rounded-full shadow-sm mx-auto mb-2 w-12 h-12 flex items-center justify-center text-blue-600"><Globe size={24} /></div>
                                        <div className="font-medium">User Input</div>
                                    </div>
                                    <div className="flex-1 border-t-2 border-dashed border-slate-300 mx-4 relative top-[-10px]"></div>
                                    <div>
                                        <div className="p-3 bg-white rounded-full shadow-sm mx-auto mb-2 w-12 h-12 flex items-center justify-center text-purple-600"><Cloud size={24} /></div>
                                        <div className="font-medium">AWS Mumbai</div>
                                    </div>
                                    <div className="flex-1 border-t-2 border-dashed border-slate-300 mx-4 relative top-[-10px]"></div>
                                    <div>
                                        <div className="p-3 bg-white rounded-full shadow-sm mx-auto mb-2 w-12 h-12 flex items-center justify-center text-red-600"><AlertTriangle size={24} /></div>
                                        <div className="font-medium">3rd Party Vendors</div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Recommendations */}
                        <section>
                            <h2 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">4. Key Recommendations</h2>
                            <ul className="space-y-3">
                                <RecommendationItem text="Implement automated data deletion schedules for inactive accounts (>3 years)." />
                                <RecommendationItem text="Update Privacy Policy to explicitly mention cross-border transfer countries." />
                                <RecommendationItem text="Conduct a Data Protection Impact Assessment (DPIA) for high-risk processing." />
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

function RiskCard({ title, level, description }) {
    const colors = {
        'Low': 'bg-green-50 text-green-700 border-green-200',
        'Medium': 'bg-orange-50 text-orange-700 border-orange-200',
        'High': 'bg-red-50 text-red-700 border-red-200',
    };
    return (
        <div className={`p-4 rounded-lg border ${colors[level]}`}>
            <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{title}</span>
                <span className="text-xs font-bold uppercase tracking-wider">{level} Risk</span>
            </div>
            <p className="text-sm opacity-90">{description}</p>
        </div>
    );
}

function RecommendationItem({ text }) {
    return (
        <li className="flex items-start gap-3 text-slate-700">
            <ShieldCheck className="text-green-500 mt-0.5 shrink-0" size={18} />
            <span>{text}</span>
        </li>
    );
}
