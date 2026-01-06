import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Plus, Clock, FileText, User, LogOut, Lock } from 'lucide-react';

export default function ClientDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [submissionCount, setSubmissionCount] = useState(0);
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    useEffect(() => {
        const submissions = JSON.parse(localStorage.getItem('dpdp_submissions') || '[]');
        setSubmissionCount(submissions.length);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
                        <p className="text-slate-500">Welcome back, {user?.email}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowPasswordModal(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 text-sm font-medium"
                        >
                            <Lock size={16} /> Change Password
                        </button>
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-red-600 hover:bg-red-50 hover:border-red-200 text-sm font-medium"
                        >
                            <LogOut size={16} /> Logout
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="text-slate-500 font-medium mb-2 flex items-center gap-2">
                            <FileText size={18} /> Assessments
                        </h3>
                        <div className="text-4xl font-bold text-slate-900">{submissionCount}</div>
                        <div className="text-xs text-slate-400 mt-1">Total Submitted</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Plus size={48} />
                        </div>
                        <h3 className="text-slate-500 font-medium mb-4">Action</h3>
                        <Link
                            to="/assessment"
                            className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-bold transition-all w-full shadow-lg shadow-brand-500/20"
                        >
                            <Plus size={18} /> Start New Assessment
                        </Link>
                    </div>
                </div>

                {/* Password Modal (Mock) */}
                {showPasswordModal && (
                    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-fade-in-up">
                            <h3 className="text-xl font-bold text-slate-900 mb-4">Change Password</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
                                    <input type="password" className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                                    <input type="password" className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    onClick={() => setShowPasswordModal(false)}
                                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        alert('Password changed successfully (mock)');
                                        setShowPasswordModal(false);
                                    }}
                                    className="px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 rounded-lg font-medium"
                                >
                                    Update Password
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
