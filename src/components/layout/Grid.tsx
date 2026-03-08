interface GridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
  className?: string;
}

const colMap = {
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

const gapMap = {
  sm: "gap-4",
  md: "gap-8",
  lg: "gap-12",
};

/**
 * Responsive grid layout for cards, products, etc.
 */
const Grid = ({ children, columns = 3, gap = "md", className = "" }: GridProps) => {
  return <div className={`grid ${colMap[columns]} ${gapMap[gap]} ${className}`}>{children}</div>;
};

export default Grid;
