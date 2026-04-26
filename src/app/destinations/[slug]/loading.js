"use client";

export default function DestinationLoading() {
  return (
    <div className="w-full bg-[#dfdfdf]">
      <main className="min-h-screen">
        <section className="w-full mt-0 mb-4">
          <div className="h-[400px] md:h-[550px] bg-white/70 animate-pulse" />
        </section>

        <section className="pb-20 w-full md:w-[90%] mx-auto px-4 md:px-0 flex flex-col md:flex-row gap-2">
          <aside className="flex flex-col gap-2 w-full md:w-1/2">
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 space-y-3">
              <div className="h-4 w-28 rounded bg-gray-200 animate-pulse" />
              <div className="h-8 w-3/4 rounded bg-gray-200 animate-pulse" />
              <div className="h-3 w-full rounded bg-gray-200 animate-pulse" />
              <div className="h-3 w-[90%] rounded bg-gray-200 animate-pulse" />
              <div className="h-3 w-[70%] rounded bg-gray-200 animate-pulse" />
              <div className="flex justify-end gap-3 pt-2">
                <div className="h-9 w-36 rounded-full bg-gray-200 animate-pulse" />
                <div className="h-9 w-24 rounded-full bg-gray-200 animate-pulse" />
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-3">
              <div className="h-6 w-48 rounded bg-gray-200 animate-pulse" />
              <div className="h-3 w-full rounded bg-gray-200 animate-pulse" />
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="h-10 rounded-full bg-gray-200 animate-pulse" />
                <div className="h-10 rounded-full bg-gray-200 animate-pulse" />
              </div>
            </div>
          </aside>

          <div className="flex flex-col gap-2 w-full md:w-1/2">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md border border-secondary/10 p-4 md:p-5 space-y-3">
                <div className="h-6 w-40 rounded bg-gray-200 animate-pulse" />
                <div className="h-3 w-full rounded bg-gray-200 animate-pulse" />
                <div className="h-3 w-[85%] rounded bg-gray-200 animate-pulse" />
                <div className="h-3 w-[70%] rounded bg-gray-200 animate-pulse" />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
