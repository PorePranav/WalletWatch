import { useState } from 'react';
import { formatCurrency } from '../../utils/helpers';
import { HiDotsVertical } from 'react-icons/hi';
import { format } from 'date-fns';

import DueModal from './DueModal';

export default function DueCard({ due, onUpdate }) {
  const dueDate = format(new Date(due.dueOn), 'dd MMM yyyy');
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="gap-4 p-4 text-center border-b border-slate-300 w-full grid grid-cols-7">
        <p className="font-semibold font-sono">{formatCurrency(due.amount)}</p>
        <p className="font-semibold font-sono">{due.dueTo}</p>
        <p>{dueDate}</p>
        <p>{due.note || '-'}</p>
        <p className="uppercase rounded-full text-sm px-0.75 py-0.5 font-semibold text-slate-700 bg-slate-300">
          {due.direction}
        </p>
        <p className="uppercase rounded-full text-sm px-0.75 py-0.5 font-semibold text-slate-700 bg-slate-300">
          {due.currentStatus}
        </p>
        <button
          className="hover:cursor-pointer justify-self-center"
          onClick={() => setShowModal(true)}
        >
          <HiDotsVertical />
        </button>
      </div>
      {showModal && (
        <DueModal
          due={due}
          onClose={() => setShowModal(false)}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
}
