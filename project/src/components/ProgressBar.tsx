interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
}

export function ProgressBar({ value, max = 10, className = '', showLabel = true }: ProgressBarProps) {
  const percentage = (value / max) * 100;

  const getColor = (percent: number) => {
    if (percent >= 75) return 'bg-green-500';
    if (percent >= 50) return 'bg-blue-500';
    if (percent >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className={className}>
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className={`h-full ${getColor(percentage)} transition-all duration-500 ease-out flex items-center justify-end pr-2`}
          style={{ width: `${percentage}%` }}
        >
          {showLabel && percentage > 15 && (
            <span className="text-white text-xs font-bold">{value}/{max}</span>
          )}
        </div>
      </div>
    </div>
  );
}
