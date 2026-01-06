export default function ProgressBar({ progress }) {
    return (
        <div className="w-full">
            <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">Progress</span>
                <span className="text-sm font-bold text-slate-700">{Math.round(progress)}%</span>
            </div>
            <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-100">
                <div
                    className="h-full bg-gradient-to-r from-brand-500 to-brand-400 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(14,165,233,0.3)]"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
}
