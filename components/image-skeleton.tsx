export function ImageSkeleton({ aspectRatio = "1:1" }: { aspectRatio?: string }) {
  let paddingBottom = "100%" // Default for 1:1

  if (aspectRatio === "16:9") {
    paddingBottom = "56.25%"
  } else if (aspectRatio === "9:16") {
    paddingBottom = "177.78%"
  } else if (aspectRatio === "4:3") {
    paddingBottom = "75%"
  }

  return (
    <div className="relative w-full" style={{ paddingBottom }}>
      <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800 animate-pulse">
        <div className="h-full w-full flex items-center justify-center">
          <svg className="w-10 h-10 text-slate-300 dark:text-slate-700" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 2v14h14V5H5zm11.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-8-4h5v4h-5V10z"
            />
          </svg>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="w-full max-w-[80%] space-y-3">
            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded"></div>
            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded w-[80%]"></div>
            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded w-[60%]"></div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-slate-900/30 to-transparent"></div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 relative">
          <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-700 opacity-25"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-indigo-500 animate-spin"></div>
        </div>
      </div>
    </div>
  )
}

