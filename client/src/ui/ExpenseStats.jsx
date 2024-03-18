import CategoryChart from './CategoryChart';
import ExpenseSummary from './ExpenseSummary';

export default function ExpenseStats({ expenses }) {
  return (
    <div className="grid grid-cols-2 gap-2 ">
      <ExpenseSummary expenses={expenses} />
      <CategoryChart expenses={expenses} />
    </div>
  );
}
