const StatCard = ({ label, value, color }) => (
  <div className="bg-white rounded-lg p-4 shadow-sm">
    <p className="text-sm text-gray-500">{label}</p>
    <p className={`text-2xl font-semibold ${color}`}>{value}</p>
  </div>
);

const Analytics = () => {
  return (
    <section
      id="dashboard"
      className="mt-16 bg-white rounded-2xl shadow-md p-8"
    >

      <div className="grid grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Opportunities" value="120" color="text-gray-800" />
        <StatCard label="Missed" value="37" color="text-red-500" />
        <StatCard label="Completed" value="68" color="text-blue-600" />
        <StatCard label="Success Rate" value="56%" color="text-green-500" />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gray-50 rounded-xl p-6 flex flex-col items-center">
          <p className="text-sm text-gray-600 mb-4">Reasons for Missed</p>
          <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-red-400 via-yellow-400 via-green-400 to-blue-500" />
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <p className="text-sm text-gray-600 mb-4">Monthly Analysis</p>
          <div className="flex items-end gap-3 h-32">
            {[60, 90, 50, 80, 110,25].map((h, i) => (
              <div
                key={i}
                className="w-8 bg-blue-500 rounded-md"
                style={{ height: `${h}px` }}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm text-gray-500 mb-2">Top Reason</p>
          <p className="font-semibold text-gray-800 mb-3">
            Forget Deadline
          </p>
          <div className="flex items-start gap-2 bg-yellow-50 p-3 rounded-lg text-sm">
            <span>⚠</span>
            <p className="text-gray-600">
              Set reminders to avoid missing opportunities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Analytics;