interface SpecTableProps {
  specs: { label: string; value: string }[];
  className?: string;
}

const SpecTable = ({ specs, className = "" }: SpecTableProps) => {
  return (
    <div className={className}>
      {specs.map((spec, i) => (
        <div
          key={spec.label}
          className={`flex justify-between items-baseline py-3 ${
            i < specs.length - 1 ? "border-b border-border" : ""
          }`}
        >
          <span className="font-body text-sm text-muted-foreground">{spec.label}</span>
          <span className="font-body text-sm font-medium text-foreground text-right">
            {spec.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SpecTable;
