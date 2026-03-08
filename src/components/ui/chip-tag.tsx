interface ChipTagProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

const ChipTag = ({ label, active = false, onClick, className = "" }: ChipTagProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center text-xs font-body font-medium tracking-wide px-4 py-2 border transition-colors duration-200 ${
        active
          ? "bg-foreground text-background border-foreground"
          : "bg-transparent text-foreground border-border hover:border-foreground"
      } ${className}`}
    >
      {label}
    </button>
  );
};

export default ChipTag;
