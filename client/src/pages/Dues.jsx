import { useSelector } from 'react-redux';

export default function Dues() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="w-[80%] mx-auto m-4">
      <h2 className="text-3xl font-semibold mt-4">
        Hey <span className="font-sono">{currentUser.name}</span>,
      </h2>
      <p className="text-xl text-slate-700 font-semibold mb-4">
        Here are your dues for the month!
      </p>
    </div>
  );
}
