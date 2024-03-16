import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';

export default function AddDueModal({ onClose, onUpdate }) {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prevData) => ({ ...prevData, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const addDueFunction = axios
      .post(`http://localhost:3000/api/v1/dues/`, formData, {
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

    toast.promise(addDueFunction, {
      loading: 'Adding new due',
      success: 'Added new due',
      error: 'There was an error adding due',
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
          Add Due
        </h2>
        <form className="flex flex-col gap-2 mt-2">
          <div className="grid grid-cols-2 justify-between gap-2 items-center">
            <label>Amount</label>
            <input
              id="amount"
              onChange={handleChange}
              type="text"
              placeholder="Amount"
              className="border border-slate-400 p-2 rounded-md"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 justify-between items-center">
            <label>Due To</label>
            <input
              id="dueTo"
              type="text"
              onChange={handleChange}
              placeholder="Due To"
              className="border border-slate-400 p-2 rounded-md"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 justify-between items-center">
            <label>Due On</label>
            <input
              id="dueOn"
              type="date"
              className="border border-slate-400 p-2 rounded-md"
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-2 justify-between items-center">
            <label>Note</label>
            <input
              id="note"
              type="text"
              onChange={handleChange}
              placeholder="Note"
              className="border border-slate-400 p-2 rounded-md"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 justify-between items-center">
            <label>Direction</label>
            <select
              onChange={handleChange}
              className="border border-slate-400 p-2 rounded-md"
              id="direction"
            >
              <option value="select">Select...</option>
              <option value="incoming">Incoming</option>
              <option value="outgoing">Outgoing</option>
            </select>
          </div>

          <button
            onClick={(e) => handleClick(e)}
            className="bg-slate-700 rounded-md mt-2 font-semibold text-white px-4 py-2"
          >
            {isLoading ? 'Adding...' : 'Add Due'}
          </button>
        </form>
      </div>
    </div>
  );
}
