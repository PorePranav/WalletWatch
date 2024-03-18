import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import DuesStats from '../ui/DuesStats';
import Spinner from '../ui/Spinner';
import DueCard from '../ui/DueCard';
import Button from '../ui/Button';
import AddDueModal from '../ui/AddDueModal';

export default function Dues() {
  const { currentUser } = useSelector((state) => state.user);
  const [dues, setDues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDirectionQuery, setFilterDirectionQuery] = useState('all');
  const [filterStatusQuery, setFilterStatusQuery] = useState('all');

  const handleReset = () => {
    setSearchQuery('');
    setFilterDirectionQuery('all');
    setFilterStatusQuery('all');
  };

  const filteredDues = dues
    .filter((record) =>
      record.note?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((record) =>
      filterDirectionQuery === 'all'
        ? true
        : record.direction === filterDirectionQuery
    )
    .filter((record) =>
      filterStatusQuery === 'all'
        ? true
        : record.currentStatus === filterStatusQuery
    );

  const onUpdate = () => {
    setIsLoading(true);
    axios
      .get(`http://localhost:3000/api/v1/dues/`, { withCredentials: true })
      .then((data) => {
        setDues(data.data.data);
      })
      .catch((err) => {
        console.error(err.message);
        toast.error('There was an error fetching the data');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    onUpdate();
  }, []);

  return (
    <div className="w-[80%] mx-auto m-4">
      <h2 className="text-3xl font-semibold mt-4">
        Hey <span className="font-sono">{currentUser.name}</span>,
      </h2>
      <p className="text-xl text-slate-700 font-semibold mb-4">
        Here are your dues for the month!
      </p>
      <DuesStats />
      <div className="flex gap-2 mt-2">
        <input
          type="text"
          placeholder="Search expense using note"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          className="my-2 p-2 border border-gray-300 rounded-md"
        />
        <select
          onChange={(e) => setFilterDirectionQuery(e.target.value)}
          className="my-2 p-2 border border-slate-300 rounded-md"
          value={filterDirectionQuery}
        >
          <option value="all">All</option>
          <option value="incoming">Incoming</option>
          <option value="outgoing">Outgoing</option>
        </select>
        <select
          onChange={(e) => setFilterStatusQuery(e.target.value)}
          className="my-2 p-2 border border-slate-300 rounded-md"
          value={filterStatusQuery}
        >
          <option value="all">All</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>
        <button
          onClick={handleReset}
          className="my-2 p-2 bg-gray-200 rounded-md"
        >
          Reset
        </button>
      </div>
      <Button setShowModal={setShowModal}>Add New Due</Button>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="rounded-t-lg bg-slate-100 grid grid-cols-7 mt-4 font-semibold uppercase align-center text-center gap-4 w-full p-4">
            <p>Amount</p>
            <p>Due To</p>
            <p>Due On</p>
            <p>Note</p>
            <p>Direction</p>
            <p>Status</p>
            <p>Actions</p>
          </div>
          <div className="flex flex-col gap-2">
            {filteredDues && filteredDues.length > 0 ? (
              filteredDues.map((due) => (
                <DueCard key={due._id} due={due} onUpdate={onUpdate} />
              ))
            ) : (
              <p className="text-2xl mt-4">No Dues To Show</p>
            )}
          </div>
        </>
      )}
      {showModal && (
        <AddDueModal onClose={() => setShowModal(false)} onUpdate={onUpdate} />
      )}
    </div>
  );
}
