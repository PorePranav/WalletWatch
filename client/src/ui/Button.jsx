import React from 'react';

export default function Button({ setShowModal, children }) {
  return (
    <button
      onClick={() => setShowModal(true)}
      className="px-4 py-2 mt-4 font-semibold bg-slate-700 text-white rounded-md"
    >
      {children}
    </button>
  );
}
