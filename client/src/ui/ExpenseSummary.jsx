import { capitalizeFirstLetter, formatCurrency } from '../utils/helpers';
import { useState, useEffect } from 'react';
import SpinnerLight from './SpinnerLight';
import axios from 'axios';

export default function ExpenseSummary({ expenses }) {
  const [expenseSummaryData, setExpenseSummaryData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('http://localhost:3000/api/v1/expenses/expenseStats', {
        withCredentials: true,
      })
      .then((response) => {
        setExpenseSummaryData(response.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err.message);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [expenses]);

  return (
    <div className="w-full bg-slate-600 h-64 rounded-lg p-4 font-bold leading-12 text-white">
      {isLoading && expenseSummaryData ? (
        <SpinnerLight />
      ) : (
        <div className="grid gap-2">
          <div>
            <span className="text-3xl text-white">You spent </span>
            <br />
            <span className="text-3xl font-sono">
              {formatCurrency(
                expenseSummaryData?.stats?.[0]?.totalExpenses || 0
              )}
            </span>
            <br /> <span className="text-3xl">this month</span>
          </div>
          <div className="text-right">
            <span className="text-3xl text-white">
              Max amount was expended on{' '}
            </span>
            <br />
            <span className="text-3xl font-sono">
              {capitalizeFirstLetter(
                expenseSummaryData?.statsByCategory?.[0]
                  ?.mostExpendedCategory || ' '
              ).replace('-', ' ')}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
