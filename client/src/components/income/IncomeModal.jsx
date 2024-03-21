import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';

export default function IncomeModal({ income, onClose, onUpdate }) {
  const formattedDate = new Date(income.createdAt).toLocaleDateString();
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prevData) => ({ ...prevData, [e.target.id]: e.target.value }));
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const deleteExpenseFunction = axios
      .delete(`http://localhost:3000/api/v1/incomes/${income._id}`, {
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
      loading: 'Deleting the income',
      success: 'Deleted the income',
      error: 'There was an error deleting the income',
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const updateExpenseFunction = axios
      .patch(`http://localhost:3000/api/v1/incomes/${income._id}`, formData, {
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
      loading: 'Updating the income',
      success: 'Updated the income',
      error: 'There was an error updating the income',
    });
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
          Edit Income
        </h2>
        <form className="flex flex-col gap-2 mt-2">
          <div className="grid grid-cols-2 justify-between gap-2 items-center">
            <label>Amount</label>
            <input
              type="text"
              onChange={handleChange}
              id="amount"
              placeholder="Amount"
              defaultValue={income.amount}
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
              defaultValue={income.note}
              className="border border-slate-400 p-2 rounded-md"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 justify-between items-center">
            <label>Date</label>
            <input
              type="date"
              defaultValue={formattedDate}
              onChange={handleChange}
              id="createdAt"
              className="border border-slate-400 p-2 rounded-md"
            />
          </div>
          <button
            onClick={(e) => handleClick(e)}
            className="bg-slate-700 rounded-md mt-2 font-semibold text-white px-4 py-2"
          >
            Edit Income
          </button>
          <button
            onClick={(e) => handleDelete(e)}
            className="bg-red-700 rounded-md font-semibold text-white px-4 py-2"
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : 'Delete Income'}
          </button>
        </form>
      </div>
    </div>
  );
}
