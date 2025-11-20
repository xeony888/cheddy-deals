export default function OverviewTab({ campaign, range }: any) {
    const platformTotals = {
        IG: 229500,
        SNAP: 31300,
        TIKTOK: 0,
        YT: 0,
        X: 0,
    };

    return (
        <div className="px-6 py-10">
            <div className="text-xs font-mono text-gray-600 mb-4">
                PLATFORM BREAKDOWN
            </div>

            <div className="grid grid-cols-5 gap-6 bg-[#F6F8FA] p-6 rounded border">
                {Object.entries(platformTotals).map(([label, value]) => (
                    <div key={label} className="text-center">
                        <div className="text-xs font-mono mb-1">{label}</div>
                        <div className="text-2xl font-bold">
                            {value.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">views</div>
                    </div>
                ))}
            </div>

            {/* Chart placeholder */}
            <div className="mt-10">
                <div className="text-xs font-mono mb-2">VIEWS BY PLATFORM</div>
                <div className="h-64 bg-[#F6F8FA] border rounded grid place-items-center">
                    <span className="text-gray-400 text-sm font-mono">
                        (Chart Placeholder)
                    </span>
                </div>
            </div>
        </div>
    );
}