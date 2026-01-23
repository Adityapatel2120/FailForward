const Hero = () => {
  return (
    <section className="mt-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100 rounded-3xl px-12 py-16 relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        <div>
          <h1 className="text-5xl font-bold text-slate-800 leading-tight">
            Stop Missing <br />
            Important <br />
            Opportunities
          </h1>

          <p className="mt-6 text-slate-600 max-w-md text-base">
            Track, analyze, and learn from missed job applications,
            exams, and events so you don’t repeat the same mistakes.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-lg shadow-md">
              Get Started Free
            </button>

            <button className="bg-white text-slate-700 px-6 py-3 rounded-lg border shadow-sm hover:bg-slate-50 transition">
              View Demo
            </button>
          </div>
        </div>

        <div className="relative flex justify-center">
          {/* OUTER DARK FRAME */}
          <div className="bg-slate-700 rounded-2xl p-4 shadow-2xl w-[520px]">
            <div className="bg-white rounded-xl p-4">

              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                  <p className="text-sm font-semibold text-slate-700">
                    Opportunity Miss Analyzer
                  </p>
                </div>

                <div className="flex gap-2">
                  <span className="w-2.5 h-2.5 bg-slate-300 rounded-full"></span>
                  <span className="w-2.5 h-2.5 bg-slate-300 rounded-full"></span>
                  <span className="w-2.5 h-2.5 bg-red-400 rounded-full"></span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-xs text-slate-500">Total Opportunities</p>
                  <p className="text-xl font-bold text-slate-800">120</p>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-xs text-slate-500">Reasons for Missed</p>
                  <p className="text-xl font-bold text-slate-800">37</p>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg flex items-center justify-center">
                  <button className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">
                    SLA Now
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-lg h-40 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full border-8 border-blue-400 border-t-red-400 border-r-green-400 border-b-yellow-400"></div>
                </div>

                <div className="bg-slate-50 rounded-lg h-40 flex items-end justify-center gap-3 px-4 pb-4">
                  <div className="w-6 bg-blue-500 h-24 rounded"></div>
                  <div className="w-6 bg-blue-400 h-16 rounded"></div>
                  <div className="w-6 bg-blue-300 h-10 rounded"></div>
                  <div className="w-6 bg-indigo-400 h-20 rounded"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -left-10 top-20 bg-white rounded-xl shadow-lg p-4 w-36">
            <div className="space-y-3">
              <div className="h-2 bg-slate-200 rounded"></div>
              <div className="h-2 bg-slate-200 rounded"></div>
              <div className="h-2 bg-blue-500 rounded"></div>
              <div className="h-2 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;