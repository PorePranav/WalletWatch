import { useState } from 'react';
import { formatCurrency } from '../../utils/helpers';
import { HiDotsVertical } from 'react-icons/hi';
import { format } from 'date-fns';

export default function IncomeCard({ income, onUpdate }) {
  const date = format(new Date(income.createdAt), 'dd MMM yyyy');
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="gap-4 p-4 text-center border-b border-slate-300 w-full grid grid-cols-4">
        <p className="font-semibold font-sono">
          {formatCurrency(income.amount)}
        </p>
        <p>{income.note || '-'}</p>
        <p>{date}</p>
        <button
          className="hover:cursor-pointer justify-self-center"
          onClick={() => setShowModal(true)}
        >
          <HiDotsVertical />
        </button>
      </div>
    </>
  );
}
