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
  const [dues, setDues] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
            {dues &&
              dues.length > 0 &&
              dues.map((due) => (
                <DueCard key={due._id} due={due} onUpdate={onUpdate} />
              ))}
          </div>
        </>
      )}
      {showModal && (
        <AddDueModal onClose={() => setShowModal(false)} onUpdate={onUpdate} />
      )}
    </div>
  );
}
