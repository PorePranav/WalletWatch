import axios from 'axios';
import { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';

import SpinnerLight from '../../../ui/SpinnerLight';

const colors = {
  income: { stroke: '#4f46e5', fill: '#4f46e5' },
  text: '#e5e7eb',
  background: '#18212f',
};

export default function IncomeChart({ incomes }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('http://localhost:3000/api/v1/incomes/monthlyIncome', {
        withCredentials: true,
      })
      .then((data) => {
        setData(data.data.data);
      })
      .catch((err) => {
        console.error(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [incomes]);

  const transformIncomeData = (data) => {
    const months = Array.from({ length: 12 }, (_, i) =>
      new Date(0, i).toLocaleString('en-US', { month: 'short' }).toUpperCase()
    );

    const result = months.map((month) => {
      const matchingItem = data.find(
        (item) => item.month === months.indexOf(month) + 1
      );
      return {
        label: month,
        income: matchingItem ? matchingItem.totalIncome : 0,
      };
    });
    return result;
  };

  const transformedData = transformIncomeData(data);

  return (
    <div className="w-full bg-slate-600 h-80 rounded-lg p-4 text-white">
      {isLoading ? (
        <SpinnerLight />
      ) : (
        <>
          <ResponsiveContainer height={300} width="100%">
            <AreaChart data={transformedData}>
              <XAxis
                dataKey="label"
                tick={{ fill: colors.text }}
                tickLine={{ stroke: colors.text }}
              />
              <YAxis
                unit="₹"
                tick={{ fill: colors.text }}
                tickLine={{ stroke: colors.text }}
              />
              <Tooltip contentStyle={{ backgroundColor: colors.background }} />
              <CartesianGrid strokeDasharray="4" />
              <Area
                dataKey="income"
                type="monotone"
                stroke={colors.income.stroke}
                fill={colors.income.fill}
                strokeWidth={2}
                name="Monthly-Income"
                unit="₹"
              />
            </AreaChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
}
