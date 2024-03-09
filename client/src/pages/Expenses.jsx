import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Spinner from '../ui/Spinner';
import ExpenseCard from '../ui/ExpenseCard';

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
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
  }, []);

  console.log(expenses);
  return (
    <div className="m-4 w-[80%] mx-auto">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div>Charts and All</div>
          <button className="px-4 py-2 mt-4 font-semibold bg-slate-700 text-white rounded-md">
            Add New Expense
          </button>
          <div className="bg-slate-300 p-4 rounded-lg mt-4">
            <div className="grid grid-cols-5 align-center text-center gap-4 w-full p-4">
              <p>Amount</p>
              <p>Note</p>
              <p>Date</p>
              <p>Category</p>
            </div>
            <hr />
            <div className="flex flex-col gap-2">
              {expenses.map((expense) => (
                <ExpenseCard key={expense._id} expense={expense} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
