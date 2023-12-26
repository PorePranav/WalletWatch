import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export default function Header() {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Wallet</span>
            <span className="text-slate-700">Watch</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600" />
        </form>
        <ul className="flex gap-4 items-center">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Expenses
            </li>
          </Link>
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Dues
            </li>
          </Link>
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Income
            </li>
          </Link>
          <Link to="/sign-in">
            <li className="hover:underline bg-slate-500 rounded-lg px-4 py-1 text-white">
              Sign In
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
