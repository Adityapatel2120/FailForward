const Suggestions = () => {
  return (
    <section className="mt-16 bg-white rounded-2xl shadow-md p-8">
      <h2 className="text-center text-xl font-semibold mb-8">
        Smart Suggestions
      </h2>

      <div className="flex justify-center gap-6">
        <div className="bg-gray-50 rounded-xl p-6 w-96 flex gap-3">
          <span className="text-yellow-500 text-xl">⚠</span>
          <div>
            <p className="font-semibold text-gray-700">
              Frequently missing deadlines?
            </p>
            <p className="text-sm text-gray-500">
              Set early reminders to stay on track.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 w-96 flex gap-3">
          <span className="text-blue-500 text-xl">💡</span>
          <div>
            <p className="font-semibold text-gray-700">
              Not prepared enough?
            </p>
            <p className="text-sm text-gray-500">
              Plan study sessions in advance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Suggestions;