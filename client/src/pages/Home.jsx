import { useSelector } from 'react-redux';
import LandingPage from './LandingPage';

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      {!currentUser && <LandingPage />}
      {currentUser && (
        <div className="m-4 w-[80%] mx-auto mt-6">
          <h2 className="font-bold text-3xl">
            Welcome Back, {currentUser.name}
          </h2>
          <p className="text-gray-700">
            Here is your financial snapshot for today
          </p>
          <div className="grid grid-cols-3 gap-2 mt-4 h-12 items-start">
            <div className="bg-slate-200 px-8 py-4 rounded-lg shadow-sm">
              <p>Income</p>
              <p>$6,500</p>
            </div>
            <div className="bg-slate-200 px-8 py-4 rounded-lg shadow-sm">
              <p>Expenses</p>
              <p>$6,500</p>
            </div>
            <div className="bg-slate-200 px-8 py-4 rounded-lg shadow-sm">
              <p>Dues</p>
              <p>$6,500</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
