import { useEffect } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { formatCurrency } from './../../../utils/helpers';

import SpinnerLight from './../../../ui/SpinnerLight';

export default function IncomeSummary({ incomes }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('http://localhost:3000/api/v1/incomes/balanceStats', {
        withCredentials: true,
      })
      .then((data) => {
        setData(data.data.data);
      })
      .catch((err) => {
        console.error(err.message);
        toast.error('There was a problem fetching data');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [incomes]);

  return (
    <div className="w-full bg-slate-600 h-80 rounded-lg p-4 text-white">
      {isLoading ? (
        <SpinnerLight />
      ) : (
        <div className="grid grid-cols-1 h-full">
          <p className="text-bold text-4xl">All Time Statistics</p>
          <p className="text-bold text-4xl">
            Balance{' '}
            <span className="font-sono">{formatCurrency(data.balance)}</span>
          </p>
          <p className="text-bold text-4xl">
            Expenditure{' '}
            <span className="font-sono">{formatCurrency(data.expenses)}</span>
          </p>
          <p className="text-bold text-4xl">
            Income{' '}
            <span className="font-sono">{formatCurrency(data.income)}</span>
          </p>
        </div>
      )}
    </div>
  );
}
