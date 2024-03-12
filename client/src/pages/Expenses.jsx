import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Spinner from '../ui/Spinner';
import ExpenseCard from '../ui/ExpenseCard';
import AddExpenseModal from '../ui/AddExpenseModal';
import ExpenseStats from '../ui/ExpenseStats';

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterQuery, setFilterQuery] = useState('all');

  const { currentUser } = useSelector((state) => state.user);

  const handleReset = () => {
    setSearchQuery('');
    setFilterQuery('all');
  };

  const filteredExpenses = expenses
    .filter((record) =>
      record.note?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((record) =>
      filterQuery === 'all' ? true : record.category === filterQuery
    );

  const onUpdate = () => {
    setIsLoading(true);
    axios
      .get('http://localhost:3000/api/v1/expenses', {
        withCredentials: true,
      })
      .then((data) => {
        setExpenses(data.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error('There was a problem fetching expenses');
        setIsLoading(false);
      });
  };

  useEffect(() => {
    onUpdate();
  }, []);

  return (
    <div className="m-4 w-[80%] mx-auto">
      <h2 className="text-3xl font-semibold my-4">
        Hey {currentUser.name}, here is your financial snapshot for the month!
      </h2>

      <ExpenseStats expenses={expenses} />
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 mt-4 font-semibold bg-slate-700 text-white rounded-md"
      >
        Add New Expense
      </button>
      {isLoading ? (
        <div className="mt-2 w-full flex justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Search expense using note"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              className="my-2 p-2 border border-gray-300 rounded-md"
            />
            <select
              onChange={(e) => setFilterQuery(e.target.value)}
              className="my-2 p-2 border border-slate-300 rounded-md"
              value={filterQuery}
            >
              <option value="all">All</option>
              <option value="housing">Housing</option>
              <option value="transportation">Transportation</option>
              <option value="food-groceries">Food Groceries</option>
              <option value="healthcare">Healthcare</option>
              <option value="debt-payments">Debt Payments</option>
              <option value="personal">Personal</option>
              <option value="Savings">Savings</option>
              <option value="educational">Educational</option>
              <option value="miscellaneous">Miscellaneous</option>
            </select>
            <button
              onClick={handleReset}
              className="my-2 p-2 bg-gray-200 rounded-md"
            >
              Reset
            </button>
          </div>
          {filteredExpenses.length == 0 && (
            <p className="mt-4">You have no expenses listed!</p>
          )}
          {filteredExpenses && filteredExpenses.length > 0 && (
            <div className="mt-4">
              <div className="rounded-t-lg bg-slate-100 grid grid-cols-5 mt-4 font-semibold uppercase align-center text-center gap-4 w-full p-4">
                <p>Amount</p>
                <p>Note</p>
                <p>Date</p>
                <p>Category</p>
                <p>Actions</p>
              </div>

              <div className="flex flex-col gap-2">
                {filteredExpenses.map((expense) => (
                  <ExpenseCard
                    key={expense._id}
                    expense={expense}
                    onUpdate={onUpdate}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
      {showModal && (
        <AddExpenseModal
          onClose={() => setShowModal(false)}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
}
