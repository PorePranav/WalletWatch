import IncomeSummary from './IncomeSummary';
import IncomeChart from './IncomeChart';

export default function IncomeStats() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <IncomeSummary />
      <IncomeChart />
    </div>
  );
}
