import { useState } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import ExpenseModal from './ExpenseModal';

export default function ExpenseCard({ expense }) {
  const date = new Date(expense.createdAt).toLocaleDateString();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="grid grid-cols-5 gap-4 w-full rounded-lg p-4 text-center">
        <p>{expense.amount}</p>
        <p>{expense.note}</p>
        <p>{date}</p>
        <p>{expense.category}</p>
        <button
          className="flex items-center justify-center"
          onClick={() => setShowModal(true)}
        >
          <HiDotsVertical />
        </button>
      </div>
      <hr />
      {showModal && (
        <ExpenseModal expense={expense} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
