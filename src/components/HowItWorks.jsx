const steps = [
  { id: 1, label: "Add Opportunity", color: "bg-blue-500" },
  { id: 2, label: "Miss Deadline", color: "bg-red-500" },
  { id: 3, label: "Select Reason", color: "bg-blue-500" },
  { id: 4, label: "Analyze Patterns", color: "bg-blue-500" },
  { id: 5, label: "Improve Planning", color: "bg-green-500" },
];

const Arrow = () => (
  <svg
    className="mx-4 mt-3"
    width="24"
    height="12"
    viewBox="0 0 24 12"
    fill="none"
  >
    <path
      d="M0 6h20M20 6l-4-4M20 6l-4 4"
      stroke="#CBD5E1"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const HowItWorks = () => {
  return (
    <section className="mt-16 bg-white rounded-2xl shadow-md px-10 py-8">
      <h2 className="text-center text-xl font-semibold text-gray-700 mb-6">
        How It Works
      </h2>

      <div className="relative">
        <div className="absolute top-5 left-0 right-0 h-[6px] bg-gray-200 rounded-full" />
      </div>

      <div className="relative z-10 flex items-start justify-between mt-6">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center min-w-[120px]">
              <div
                className={`w-10 h-10 rounded-full ${step.color} text-white flex items-center justify-center font-semibold`}
              >
                {step.id}
              </div>
              <p className="mt-3 text-sm text-gray-600 text-center">
                {step.label}
              </p>
            </div>

            {index !== steps.length - 1 && <Arrow />}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;