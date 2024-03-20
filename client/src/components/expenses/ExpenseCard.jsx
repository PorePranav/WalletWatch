import { useState } from 'react';
import { formatCurrency } from '../../utils/helpers';
import { HiDotsVertical } from 'react-icons/hi';
import ExpenseModal from './ExpenseModal';
import { format } from 'date-fns';

export default function ExpenseCard({ expense, onUpdate }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="gap-4 p-4 text-center border-b border-slate-300 w-full grid grid-cols-5">
        <p className="font-semibold font-sono">
          {formatCurrency(expense.amount)}
        </p>
        <p>{expense.note}</p>
        <p>{format(new Date(expense.createdAt), 'dd MMM yyyy')}</p>
        <span className="uppercase rounded-full text-sm px-0.75 py-0.5 font-semibold text-slate-700 bg-slate-300">
          {expense.category}
        </span>
        <button
          className="hover:cursor-pointer justify-self-center"
          onClick={() => setShowModal(true)}
        >
          <HiDotsVertical />
        </button>
      </div>
      {showModal && (
        <ExpenseModal
          expense={expense}
          onClose={() => setShowModal(false)}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
}
