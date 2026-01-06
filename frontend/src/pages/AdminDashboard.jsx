import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { Users, FileText, AlertTriangle, Download, Search, Filter } from 'lucide-react';

export default function AdminDashboard() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    // Mock Data combined with Local Storage
    const [clients, setClients] = useState([
        { id: 1, name: 'Acme Corp', email: 'contact@acme.com', status: 'Completed', score: 85, risk: 'Low', date: '2023-10-25' },
        { id: 2, name: 'Globex Inc', email: 'info@globex.com', status: 'In Progress', score: 45, risk: 'High', date: '2023-10-26' },
        { id: 3, name: 'Soylent Corp', email: 'admin@soylent.com', status: 'Pending', score: 0, risk: '-', date: '-' },
        { id: 4, name: 'Initech', email: 'peter@initech.com', status: 'Completed', score: 92, risk: 'Low', date: '2023-10-24' },
        { id: 5, name: 'Umbrella Corp', email: 'albert@umbrella.com', status: 'Review', score: 60, risk: 'Medium', date: '2023-10-27' },
    ]);

    useEffect(() => {
        const localSubmissions = JSON.parse(localStorage.getItem('dpdp_submissions') || '[]');
        if (localSubmissions.length > 0) {
            const formattedSubmissions = localSubmissions.map(sub => ({
                id: sub.id,
                name: `Submission ${sub.id.toString().slice(-4)}`,
                email: 'anonymous@client.com',
                status: sub.status,
                score: sub.score,
                risk: sub.risk,
                date: new Date(sub.submittedAt).toLocaleDateString()
            }));
            setClients(prev => [...prev, ...formattedSubmissions]);
        }
    }, []);

    const downloadCSV = () => {
        const headers = ['ID', 'Organization', 'Email', 'Status', 'Score', 'Risk', 'Date'];
        const csvContent = [
            headers.join(','),
            ...clients.map(client =>
                [client.id, client.name, client.email, client.status, client.score, client.risk, client.date].join(',')
            )
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'dpdp_submissions.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Top Navigation */}
            <nav className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Athenian Tech" className="h-10 w-auto p-1 bg-brand-900 rounded" />
                    <span className="font-bold text-slate-800 text-lg">Athenian Tech Admin</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="h-8 w-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-sm">A</div>
                    <button onClick={logout} className="text-sm text-slate-500 hover:text-slate-700">Logout</button>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto p-8">
                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <StatCard icon={<Users />} title="Total Clients" value="124" color="bg-blue-50 text-blue-600" />
                    <StatCard icon={<FileText />} title="Assessments Completed" value="85" color="bg-green-50 text-green-600" />
                    <StatCard icon={<AlertTriangle />} title="High Risk Orgs" value="12" color="bg-red-50 text-red-600" />
                    <StatCard icon={<Download />} title="Reports Generated" value="342" color="bg-purple-50 text-purple-600" />
                </div>

                {/* Client Table */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                        <h2 className="font-semibold text-slate-800">Client Assessments</h2>

                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="relative flex-1 md:w-64">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search clients..."
                                    className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                                />
                            </div>
                            <button onClick={downloadCSV} className="flex items-center gap-2 px-3 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 text-sm font-medium transition-colors">
                                <Download size={16} /> Export CSV
                            </button>
                            <button className="flex items-center gap-2 px-3 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 text-sm">
                                <Filter size={16} /> Filter
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-600">
                            <thead className="bg-slate-50 text-slate-700 font-medium border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-3">Organization</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">DPDP Score</th>
                                    <th className="px-6 py-3">Risk Level</th>
                                    <th className="px-6 py-3">Last Active</th>
                                    <th className="px-6 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {clients.map((client) => (
                                    <tr key={client.id} className="hover:bg-slate-50/50">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-900">{client.name}</div>
                                            <div className="text-xs text-slate-400">{client.email}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={client.status} />
                                        </td>
                                        <td className="px-6 py-4">
                                            {client.status === 'Completed' || client.status === 'Review' ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                        <div className="h-full bg-brand-500" style={{ width: `${client.score}%` }} />
                                                    </div>
                                                    <span className="font-medium">{client.score}%</span>
                                                </div>
                                            ) : (
                                                <span className="text-slate-400">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`font-medium ${client.risk === 'High' ? 'text-red-600' :
                                                client.risk === 'Medium' ? 'text-orange-600' :
                                                    client.risk === 'Low' ? 'text-green-600' : 'text-slate-400'
                                                }`}>
                                                {client.risk}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">{client.date}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-brand-600 hover:text-brand-700 font-medium">View</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="px-6 py-4 border-t border-slate-200 flex justify-between items-center text-sm text-slate-500">
                        <span>Showing 1-5 of 124 clients</span>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50">Prev</button>
                            <button className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon, title, value, color }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
                    <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
                </div>
                <div className={`p-3 rounded-lg ${color}`}>
                    {icon}
                </div>
            </div>
        </div>
    );
}

function StatusBadge({ status }) {
    const styles = {
        'Completed': 'bg-green-100 text-green-700',
        'In Progress': 'bg-blue-100 text-blue-700',
        'Pending': 'bg-slate-100 text-slate-600',
        'Review': 'bg-orange-100 text-orange-700',
    };
    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || styles['Pending']}`}>
            {status}
        </span>
    );
}
