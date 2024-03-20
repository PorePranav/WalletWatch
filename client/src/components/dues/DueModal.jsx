import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';

export default function DueModal({ due, onClose, onUpdate }) {
  const formattedDate = new Date(due.dueOn).toLocaleDateString();
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prevData) => ({ ...prevData, [e.target.id]: e.target.value }));
  };

  const handlePayment = (e) => {
    const paymentFunction = axios
      .patch(
        `http://localhost:3000/api/v1/dues/${due._id}`,
        { currentStatus: 'paid' },
        { withCredentials: true }
      )
      .then(() => {
        onClose();
        onUpdate();
      })
      .catch((err) => {
        console.error(err.message);
      });

    toast.promise(paymentFunction, {
      loading: 'Updating due details',
      success: 'Updated due details',
      error: 'There was an error updating the due',
    });
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const deleteDueFunction = axios
      .delete(`http://localhost:3000/api/v1/dues/${due._id}`, {
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

    toast.promise(deleteDueFunction, {
      loading: 'Deleting the due',
      success: 'Deleted the due',
      error: 'There was an error deleting the due',
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) return;

    const updateDueFunction = axios
      .patch(`http://localhost:3000/api/v1/dues/${due._id}`, formData, {
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

    toast.promise(updateDueFunction, {
      loading: 'Updating the due',
      success: 'Updated the due',
      error: 'There was an error updating the due',
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
          Edit Due
        </h2>
        <form className="flex flex-col gap-2 mt-2">
          <div className="grid grid-cols-2 justify-between gap-2 items-center">
            <label>Amount</label>
            <input
              type="text"
              onChange={handleChange}
              id="amount"
              placeholder="Amount"
              defaultValue={due.amount}
              className="border border-slate-400 p-2 rounded-md"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 justify-between items-center">
            <label>Due To</label>
            <input
              type="text"
              placeholder="Due To"
              onChange={handleChange}
              id="dueTo"
              defaultValue={due.dueTo}
              className="border border-slate-400 p-2 rounded-md"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 justify-between items-center">
            <label>Due On</label>
            <input
              type="date"
              defaultValue={formattedDate}
              onChange={handleChange}
              id="dueOn"
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
              defaultValue={due.note}
              className="border border-slate-400 p-2 rounded-md"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 justify-between items-center">
            <label>Direction</label>
            <select
              onChange={handleChange}
              className="border border-slate-400 p-2 rounded-md"
              defaultValue={due.direction}
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
            Edit Due
          </button>
          {due.currentStatus === 'unpaid' && (
            <button
              onClick={(e) => handlePayment(e)}
              className="bg-green-700 rounded-md font-semibold text-white px-4 py-2"
            >
              Mark Paid
            </button>
          )}

          <button
            onClick={(e) => handleDelete(e)}
            className="bg-red-700 rounded-md font-semibold text-white px-4 py-2"
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : 'Delete Due'}
          </button>
        </form>
      </div>
    </div>
  );
}
