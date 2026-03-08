interface MetricBlockProps {
  value: string;
  label: string;
  className?: string;
}

const MetricBlock = ({ value, label, className = "" }: MetricBlockProps) => {
  return (
    <div className={`text-center ${className}`}>
      <p className="font-display text-4xl md:text-5xl font-light text-foreground leading-none">
        {value}
      </p>
      <p className="font-body text-sm text-muted-foreground mt-2">{label}</p>
    </div>
  );
};

export default MetricBlock;
