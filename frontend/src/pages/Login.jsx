import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate network delay for "heavy" feel
        await new Promise(r => setTimeout(r, 800));

        const res = await login(email, password);
        if (res.success) {
            navigate('/');
        } else {
            setError(res.error);
            setIsLoading(false);
        }
    };

    return (
        <div className="animate-fade-in">
            <div className="mb-10">
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back</h2>
                <p className="text-slate-500 mt-2 text-base">Enter your credentials to access the workspace.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="p-4 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </div>
                )}

                <div className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-600 transition-colors">
                                <Mail size={18} />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 focus:bg-white transition-all shadow-sm"
                                placeholder="name@company.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-600 transition-colors">
                                <Lock size={18} />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 focus:bg-white transition-all shadow-sm"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center cursor-pointer">
                        <input
                            id="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded cursor-pointer"
                        />
                        <span className="ml-2 block text-sm text-slate-600 font-medium">Remember me</span>
                    </label>
                    <a href="#" className="text-sm font-semibold text-brand-600 hover:text-brand-700 hover:underline">
                        Forgot password?
                    </a>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="group w-full flex items-center justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all transform active:scale-[0.98]"
                >
                    {isLoading ? (
                        <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    ) : (
                        <>
                            Sign in
                            <ArrowRight size={16} className="ml-2 opacity-70 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-sm text-slate-500">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-semibold text-brand-600 hover:text-brand-700 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
