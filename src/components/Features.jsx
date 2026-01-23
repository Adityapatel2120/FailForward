const Features = () => {
  return (
    <section className="mt-16 grid grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-2">Track Deadlines</h3>
        <p className="text-sm text-gray-500">
          Never forget important dates.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-2">Analyze Misses</h3>
        <p className="text-sm text-gray-500">
          Understand why you missed out.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-2">Improve Planning</h3>
        <p className="text-sm text-gray-500">
          Get smart suggestions to plan better.
        </p>
      </div>
    </section>
  );
};

export default Features;