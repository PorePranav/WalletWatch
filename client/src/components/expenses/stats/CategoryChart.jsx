import { useEffect, useState } from 'react';
import {
  PieChart,
  ResponsiveContainer,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from 'recharts';
import axios from 'axios';
import SpinnerLight from '../../../ui/SpinnerLight';

export default function CategoryChart({ expenses }) {
  const [categoryData, setCategoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('http://localhost:3000/api/v1/expenses/categoryStats', {
        withCredentials: true,
      })
      .then((data) => {
        setCategoryData(data.data.data);
      })
      .catch((err) => {
        console.error(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [expenses]);

  const startData = [
    {
      category: 'housing',
      value: 0,
      color: '#ef4444',
    },
    {
      category: 'transportation',
      value: 0,
      color: '#f97316',
    },
    {
      category: 'food-groceries',
      value: 0,
      color: '#eab308',
    },
    {
      category: 'healthcare',
      value: 0,
      color: '#84cc16',
    },
    {
      category: 'debt-payments',
      value: 0,
      color: '#22c55e',
    },
    {
      category: 'personal',
      value: 0,
      color: '#14b8a6',
    },
    {
      category: 'savings',
      value: 0,
      color: '#3b82f6',
    },
    {
      category: 'educational',
      value: 0,
      color: '#a855f7',
    },
    {
      category: 'miscellaneous',
      value: 0,
      color: '#6366f1',
    },
  ];

  const transformData = (categoryData, startData) => {
    const transformedData = startData.map((category) => {
      const foundItem = categoryData.find(
        (item) => item._id === category.category
      );
      return {
        ...category,
        value: foundItem ? foundItem.count : 0,
      };
    });

    return transformedData.filter((entry) => entry.value !== 0);
  };

  const transformedData = transformData(categoryData, startData);

  return (
    <div className="w-full bg-slate-600 h-64 rounded-lg">
      {isLoading ? (
        <SpinnerLight />
      ) : (
        <div>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={transformedData}
                nameKey="category"
                dataKey="value"
                innerRadius={85}
                outerRadius={110}
                cx="40%"
                cy="50%"
                paddingAngle={3}
              >
                {transformedData.map((entry) => (
                  <Cell
                    fill={entry.color}
                    stroke={entry.stroke}
                    key={entry.category}
                  />
                ))}
              </Pie>
              <Legend
                verticalAlign="middle"
                align="right"
                width="30%"
                layout="vertical"
                iconSize={15}
                iconType="circle"
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
