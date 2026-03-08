interface MaterialSwatchProps {
  color: string;
  colorHex: string;
  active?: boolean;
  onClick?: () => void;
}

const MaterialSwatch = ({ color, colorHex, active = false, onClick }: MaterialSwatchProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 border transition-colors duration-200 ${
        active ? "border-foreground" : "border-border hover:border-muted-foreground"
      }`}
      title={color}
    >
      <span
        className="w-5 h-5 rounded-full border border-border flex-shrink-0"
        style={{ backgroundColor: colorHex }}
      />
      <span className="font-body text-sm text-foreground">{color}</span>
    </button>
  );
};

export default MaterialSwatch;
