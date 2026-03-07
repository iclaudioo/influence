interface GridLineProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export function GridLine({
  orientation = "horizontal",
  className = "",
}: GridLineProps) {
  return (
    <div
      className={`${
        orientation === "horizontal"
          ? "h-px w-full bg-white/[0.04]"
          : "w-px h-full bg-white/[0.04]"
      } ${className}`}
    />
  );
}
