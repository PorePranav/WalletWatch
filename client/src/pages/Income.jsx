import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import IncomeStats from '../components/income/stats/IncomeStats';
import Button from '../ui/Button';
import Spinner from '../ui/SpinnerLight';
import IncomeCard from '../components/income/IncomeCard';
import AddIncomeModal from '../components/income/AddIncomeModal';

export default function Income() {
  const { currentUser } = useSelector((state) => state.user);
  const [incomes, setIncomes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const onUpdate = () => {
    setIsLoading(true);
    axios
      .get(`http://localhost:3000/api/v1/incomes`, { withCredentials: true })
      .then((data) => {
        setIncomes(data.data.data);
      })
      .catch((err) => {
        toast.error('There was an error fetching data');
        console.error(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    onUpdate();
  }, []);

  const filteredIncomes = incomes.filter((record) =>
    record.note?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-[80%] mx-auto m-4">
      <h2 className="text-3xl font-semibold mt-4">
        Hey <span className="font-sono">{currentUser.name}</span>,
      </h2>
      <p className="text-xl text-slate-700 font-semibold mb-4">
        Here is your income for the month!
      </p>
      <IncomeStats incomes={incomes} />
      <div className="flex gap-2 mt-2">
        <input
          type="text"
          placeholder="Search income using note"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          className="my-2 p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={() => setSearchQuery('')}
          className="my-2 p-2 bg-gray-200 rounded-md"
        >
          Reset
        </button>
      </div>
      <Button setShowModal={setShowModal}>Add New Income</Button>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="rounded-t-lg bg-slate-100 grid grid-cols-4 mt-4 font-semibold uppercase align-center text-center gap-4 w-full p-4">
            <p>Amount</p>
            <p>Note</p>
            <p>Date</p>
            <p>Actions</p>
          </div>
          <div className="flex flex-col gap-2">
            {filteredIncomes && filteredIncomes.length > 0 ? (
              filteredIncomes.map((income) => (
                <IncomeCard
                  key={income._id}
                  income={income}
                  onUpdate={onUpdate}
                />
              ))
            ) : (
              <p>No Incomes To Show</p>
            )}
          </div>
        </>
      )}
      {showModal && (
        <AddIncomeModal
          onClose={() => setShowModal(false)}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
}
