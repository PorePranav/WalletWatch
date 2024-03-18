import OwedFromStat from './OwedFromStat';
import OwedToStat from './OwedToStat';

export default function DuesStats() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <OwedFromStat />
      <OwedToStat />
    </div>
  );
}
