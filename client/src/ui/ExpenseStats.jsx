// import { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function ExpenseStats() {
//   const [data, setData] = useState({});
//   const [isLoading, setIsLoding] = useState(false);

//   useEffect(() => {
//     setIsLoding(true);
//     axios
//       .get('http://localhost:3000/api/v1/expenses/expenseStats', {
//         withCredentials: true,
//       })
//       .then((data) => {
//         setData(data.data.data);
//       })
//       .catch((err) => {
//         console.error(err.message);
//       })
//       .finally(() => {
//         setIsLoding(false);
//       });
//   }, []);

//   console.log(data);

//   return (
//     <div className="grid grid-cols-3 gap-2 ">
//       {!isLoading ? (
//         <>
//           <div className="w-full bg-slate-600 h-64 rounded-lg p-4 font-bold leading-12 text-white">
//             <div className="grid gap-2">
//               <div>
//                 <span className="text-3xl text-white">You spent </span>
//                 <br />
//                 <span className="text-3xl">{data?.stats?.totalExpenses}</span>
//                 <br /> <span className="text-3xl">this month</span>
//               </div>
//               <div className="text-right">
//                 <span className="text-3xl text-white">
//                   Max amount was expended on
//                 </span>
//                 <br />
//                 <span className="text-3xl">{`$4000`}</span>
//               </div>
//             </div>
//           </div>
//           <div className="w-full bg-slate-600 h-64 rounded-lg">Line Chart</div>
//           <div className="w-full bg-slate-600 h-64 rounded-lg">
//             Category Chart
//           </div>
//         </>
//       ) : (
//         <></>
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from 'react';
import axios from 'axios';
import { capitalizeFirstLetter, formatCurrency } from '../utils/helpers';

export default function ExpenseStats() {
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/v1/expenses/expenseStats', {
        withCredentials: true,
      })
      .then((response) => {
        setData(response.data.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  console.log(data);

  return (
    <div className="grid grid-cols-3 gap-2 ">
      {data.stats ? ( // Check if data.stats exists
        <>
          <div className="w-full bg-slate-600 h-64 rounded-lg p-4 font-bold leading-12 text-white">
            <div className="grid gap-2">
              <div>
                <span className="text-3xl text-white">You spent </span>
                <br />
                <span className="text-3xl font-sono">
                  {formatCurrency(data.stats[0].totalExpenses)}
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
                    data.statsByCategory[0].mostExpendedCategory
                  ).replace('-', ' ')}
                </span>
              </div>
            </div>
          </div>
          <div className="w-full bg-slate-600 h-64 rounded-lg">Line Chart</div>
          <div className="w-full bg-slate-600 h-64 rounded-lg">
            Category Chart
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
