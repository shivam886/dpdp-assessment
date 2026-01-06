import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck } from 'lucide-react';

export default function AuthLayout() {
    const { user } = useAuth();

    if (user) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="min-h-screen flex bg-slate-50">
            {/* Left Side - Brand / Marketing */}
            <div className="hidden lg:flex lg:w-5/12 bg-slate-900 relative overflow-hidden">
                {/* Abstract Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-slate-900 to-slate-900 z-0" />
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-brand-500 rounded-full blur-3xl opacity-20" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-500 rounded-full blur-3xl opacity-20" />

                <div className="relative z-10 p-12 flex flex-col justify-between h-full text-white">
                    <div className="flex items-center justify-center w-full">
                        <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Athenian Tech" className="h-24 w-auto drop-shadow-lg" />
                    </div>

                    <div className="space-y-6 text-center">
                        <h1 className="text-4xl font-bold leading-tight">
                            Enterprise DPDP Compliance <br />
                            <span className="text-brand-400">Made Simple.</span>
                        </h1>
                        <p className="text-lg text-slate-300 max-w-sm mx-auto leading-relaxed">
                            Streamline your data protection journey with our automated assessment engine, gap analysis, and regulatory reporting suite.
                        </p>
                    </div>

                    <div className="flex items-center justify-center gap-4 text-sm text-slate-400">
                        <span>© 2026 Athenian Tech Pvt Ltd.</span>
                        <span className="w-1 h-1 bg-slate-600 rounded-full" />
                        <span>Privacy First</span>
                    </div>
                </div>
            </div>

            {/* Right Side - Auth Form */}
            <div className="w-full lg:w-7/12 flex items-center justify-center p-8 bg-white lg:bg-slate-50 relative">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

                <div className="w-full max-w-md bg-white lg:p-10 lg:rounded-2xl lg:shadow-[0_8px_30px_rgb(0,0,0,0.04)] lg:border lg:border-slate-100 relative z-20">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
