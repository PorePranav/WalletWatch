import { useEffect, useState } from 'react';
import axios from 'axios';
import SpinnerLight from '../../../ui/SpinnerLight';
import { formatCurrency } from '../../../utils/helpers';

export default function OwedFromStat({ dues }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('http://localhost:3000/api/v1/dues/owedFromStats', {
        withCredentials: true,
      })
      .then((data) => {
        setData(data.data.data[0]);
      })
      .catch((err) => {
        console.error(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dues]);

  return (
    <div className="w-full bg-slate-600 h-64 rounded-lg p-4 font-bold leading-12 text-white ">
      {isLoading ? (
        <SpinnerLight />
      ) : (
        <div className="w-full flex justify-center items-center h-full">
          <p className="text-6xl text-center">
            <span className="font-sono">{`${formatCurrency(
              data?.totalDues || 0
            )}`}</span>{' '}
            is owed to you by others
          </p>
        </div>
      )}
    </div>
  );
}
