import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Spinner from '../ui/Spinner';
import ExpenseCard from '../ui/ExpenseCard';
import AddExpenseModal from '../ui/AddExpenseModal';

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
      <div>Charts and All</div>
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 mt-4 font-semibold bg-slate-700 text-white rounded-md"
      >
        Add New Expense
      </button>
      {isLoading ? (
        <Spinner className="mt-2" />
      ) : (
        <>
          {expenses.length == 0 && (
            <p className="mt-4">You have no expenses listed!</p>
          )}
          {expenses && expenses.length > 0 && (
            <div className="mt-4">
              <div className="rounded-t-lg bg-slate-100 grid grid-cols-5 font-semibold uppercase align-center text-center gap-4 w-full p-4">
                <p>Amount</p>
                <p>Note</p>
                <p>Date</p>
                <p>Category</p>
                <p>Actions</p>
              </div>

              <div className="flex flex-col gap-2">
                {expenses.map((expense) => (
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
