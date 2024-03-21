import OwedFromStat from './OwedFromStat';
import OwedToStat from './OwedToStat';

export default function DuesStats({ dues }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <OwedFromStat dues={dues} />
      <OwedToStat dues={dues} />
    </div>
  );
}
