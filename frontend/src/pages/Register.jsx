import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, User } from 'lucide-react';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await register(name, email, password);
        if (res.success) {
            navigate('/');
        }
    };

    return (
        <div>
            <div className="mb-8 text-center lg:text-left">
                <h2 className="text-3xl font-bold text-slate-900">Create Account</h2>
                <p className="text-slate-500 mt-2">Start your DPDP compliance journey today.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Organization Name</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <User size={18} />
                        </div>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 focus:outline-none transition"
                            placeholder="Acme Corp"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Work Email</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <Mail size={18} />
                        </div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 focus:outline-none transition"
                            placeholder="you@company.com"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <Lock size={18} />
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 focus:outline-none transition"
                            placeholder="Min. 8 characters"
                            required
                        />
                    </div>
                </div>

                <div className="flex items-center">
                    <input
                        id="terms"
                        type="checkbox"
                        required
                        className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-slate-600">
                        I agree to the <a href="#" className="text-brand-600 hover:text-brand-500">Terms of Service</a> and <a href="#" className="text-brand-600 hover:text-brand-500">Privacy Policy</a>
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors"
                >
                    Create Account
                </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-brand-600 hover:text-brand-500">
                    Sign in
                </Link>
            </p>
        </div>
    );
}
