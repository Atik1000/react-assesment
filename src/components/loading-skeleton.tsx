export function LoadingSkeleton() {
  return (
    <div className="space-y-4 rounded-xl bg-white p-6 shadow-sm">
      <div className="h-11 w-full animate-pulse rounded-lg bg-[#e6efe9]" />
      <div className="space-y-3">
        <div className="h-5 w-full animate-pulse rounded bg-[#edf4f0]" />
        <div className="h-5 w-full animate-pulse rounded bg-[#edf4f0]" />
        <div className="h-5 w-[92%] animate-pulse rounded bg-[#edf4f0]" />
        <div className="h-5 w-[88%] animate-pulse rounded bg-[#edf4f0]" />
        <div className="h-5 w-[95%] animate-pulse rounded bg-[#edf4f0]" />
        <div className="h-5 w-[84%] animate-pulse rounded bg-[#edf4f0]" />
      </div>
    </div>
  );
}
