import Logo from "./Logo";
const Navbar = () => {
  return (
    <nav className="bg-white rounded-2xl shadow-md px-8 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Logo />
        <span className="font-semibold text-slate-800 text-lge">
          Opportunity Miss Analyzer
        </span>
      </div>
      <div className="flex items-center gap-6 text-sm text-gray-600">
        <span className="cursor-pointer">Home</span>
        <span className="cursor-pointer">Features</span>
        <span className="cursor-pointer">Dashboard</span>
        <span className="cursor-pointer">Login</span>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;