import CategoryChart from './CategoryChart';
import ExpenseSummary from './ExpenseSummary';

export default function ExpenseStats({ expenses }) {
  return (
    <>
      <div className="grid grid-cols-2 gap-2 ">
        <ExpenseSummary expenses={expenses} />
        {/* <div className="w-full bg-slate-600 h-64 rounded-lg">Line Chart</div> */}
        <CategoryChart expenses={expenses} />
      </div>
    </>
  );
}
