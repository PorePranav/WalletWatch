import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Wallet</span>
            <span className="text-slate-700">Watch</span>
          </h1>
        </Link>
        <ul className="flex gap-4 items-center">
          {currentUser && (
            <>
              <Link to="/expenses">
                <li className="hidden sm:inline text-slate-700 hover:underline">
                  Expenses
                </li>
              </Link>
              <Link to="/dues">
                <li className="hidden sm:inline text-slate-700 hover:underline">
                  Dues
                </li>
              </Link>
              <Link to="/income">
                <li className="hidden sm:inline text-slate-700 hover:underline">
                  Income
                </li>
              </Link>
            </>
          )}
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt="Profile Picture"
                className="rounded-full h-8 w-8 object-cover"
              />
            ) : (
              <li className="hover:underline bg-slate-700 rounded-lg px-4 py-1 text-white">
                Sign In
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
