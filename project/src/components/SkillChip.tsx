interface SkillChipProps {
  label: string;
  variant?: 'technical' | 'soft' | 'tool';
}

export function SkillChip({ label, variant = 'technical' }: SkillChipProps) {
  const variants = {
    technical: 'bg-blue-100 text-blue-700 border-blue-200',
    soft: 'bg-green-100 text-green-700 border-green-200',
    tool: 'bg-gray-100 text-gray-700 border-gray-200'
  };

  return (
    <span
      className={`inline-block px-3 py-1.5 rounded-full text-sm font-medium border ${variants[variant]}`}
    >
      {label}
    </span>
  );
}
