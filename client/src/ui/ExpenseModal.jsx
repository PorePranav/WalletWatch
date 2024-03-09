import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ImmunizationModal({ expense, onClose, onUpdate }) {
  const formattedDate = new Date(expense.createdAt).toLocaleDateString();

  const handleClick = () => {
    axios
      .patch(
        `http://localhost:3000/api/v1/immunizations/${immunization._id}`,
        data,
        { withCredentials: true }
      )
      .then((data) => {
        onClose();
        onUpdate();
        toast.success('Immunization record updated successfully');
      })
      .catch((err) => {
        toast.error(err.response.data.message);
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
          Edit Expense
        </h2>
        <form className="flex flex-col gap-2 mt-2">
          <div className="grid grid-cols-2 justify-between gap-2 items-center">
            <label>Amount</label>
            <input
              type="text"
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
              defaultValue={expense.note}
              className="border border-slate-400 p-2 rounded-md"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 justify-between items-center">
            <label>Date</label>
            <input
              type="date"
              defaultValue={formattedDate}
              className="border border-slate-400 p-2 rounded-md"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 justify-between items-center">
            <label>Category</label>
            <select
              defaultValue={expense.category}
              className="border border-slate-400 p-2 rounded-md"
            >
              <option value="housing">Housing</option>
              <option value="transportation">Transportation</option>
              <option value="food-groceries">Food Groceries</option>
              <option value="healthcare">Healthcare</option>
              <option value="debt-payments">Debt Payments</option>
              <option value="personal-lifestyle">Personal Lifestyle</option>
              <option value="savings-investment">Savings Investment</option>
              <option value="educational">Educational</option>
              <option value="miscellaneous">Miscellaneous</option>
            </select>
          </div>
          <button className="bg-slate-700 rounded-md mt-2 font-semibold text-white px-4 py-2">
            Edit Expense
          </button>
        </form>
      </div>
    </div>
  );
}
