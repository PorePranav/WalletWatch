import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import DuesStats from '../ui/DuesStats';
import Spinner from '../ui/Spinner';

export default function Dues() {
  const { currentUser } = useSelector((state) => state.user);
  const [dues, setDues] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const onUpdate = () => {
    setIsLoading(true);
    axios
      .get(`http://localhost:3000/api/v1/dues/`, { withCredentials: true })
      .then((data) => {
        setDues(data.data);
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
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div>Dues Table</div>
        </>
      )}
    </div>
  );
}
