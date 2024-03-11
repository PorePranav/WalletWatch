import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';

export default function ExpenseModal({ expense, onClose, onUpdate }) {
  const formattedDate = new Date(expense.createdAt).toLocaleDateString();
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prevData) => ({ ...prevData, [e.target.id]: e.target.value }));
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const deleteExpenseFunction = axios
      .delete(`http://localhost:3000/api/v1/expenses/${expense._id}`, {
        withCredentials: true,
      })
      .then(() => {
        onClose();
        onUpdate();
      })
      .catch((err) => {
        console.error(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });

    toast.promise(deleteExpenseFunction, {
      loading: 'Deleting the expense',
      success: 'Deleted the expense',
      error: 'There was an error deleting the expense',
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const updateExpenseFunction = axios
      .patch(`http://localhost:3000/api/v1/expenses/${expense._id}`, formData, {
        withCredentials: true,
      })
      .then(() => {
        onClose();
        onUpdate();
      })
      .catch((err) => {
        console.error(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });

    toast.promise(updateExpenseFunction, {
      loading: 'Updating the expense',
      success: 'Updated the expense',
      error: 'There was an error updating the expense',
    });
    // try {
    //   await axios.patch(
    //     `http://localhost:3000/api/v1/expenses/${expense._id}`,
    //     formData,
    //     {
    //       withCredentials: true,
    //     }
    //   );

    //   onClose();
    //   onUpdate();
    //   toast.success('Expense record updated successfully');
    // } catch (err) {
    //   toast.error(err.response?.data?.message || 'An error occurred');
    // }
  };

  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="w-[400px] max-w-full bg-white rounded-xl p-4 flex flex-col relative"
        onClick={(event) => event.stopPropagation()}
      >
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-slate-700 cursor-pointer"
          onClick={onClose}
        />
        <h2 className="mb-5 w-fit px-4 py-1 bg-slate-300 rounded-lg">
          Edit Expense
        </h2>
        <form className="flex flex-col gap-2 mt-2">
          <div className="grid grid-cols-2 justify-between gap-2 items-center">
            <label>Amount</label>
            <input
              type="text"
              onChange={handleChange}
              id="amount"
              placeholder="Amount"
              defaultValue={expense.amount}
              className="border border-slate-400 p-2 rounded-md"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 justify-between items-center">
            <label>Note</label>
            <input
              type="text"
              placeholder="Note"
              onChange={handleChange}
              id="note"
              defaultValue={expense.note}
              className="border border-slate-400 p-2 rounded-md"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 justify-between items-center">
            <label>Date</label>
            <input
              type="date"
              defaultValue={formattedDate}
              onChange={handleChange}
              id="date"
              className="border border-slate-400 p-2 rounded-md"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 justify-between items-center">
            <label>Category</label>
            <select
              defaultValue={expense.category}
              id="category"
              onChange={handleChange}
              className="border border-slate-400 p-2 rounded-md"
            >
              <option value="housing">Housing</option>
              <option value="transportation">Transportation</option>
              <option value="food-groceries">Food Groceries</option>
              <option value="healthcare">Healthcare</option>
              <option value="debt-payments">Debt Payments</option>
              <option value="personal">Personal Lifestyle</option>
              <option value="savings">Savings Investment</option>
              <option value="educational">Educational</option>
              <option value="miscellaneous">Miscellaneous</option>
            </select>
          </div>
          <button
            onClick={(e) => handleClick(e)}
            className="bg-slate-700 rounded-md mt-2 font-semibold text-white px-4 py-2"
          >
            Edit Expense
          </button>
          <button
            onClick={(e) => handleDelete(e)}
            className="bg-red-700 rounded-md font-semibold text-white px-4 py-2"
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : 'Delete Expense'}
          </button>
        </form>
      </div>
    </div>
  );
}
