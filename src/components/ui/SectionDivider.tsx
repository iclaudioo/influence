type Props = {
  color?: string;
  variant?: "line" | "dots";
};

export function SectionDivider({ color = "#d55d25", variant = "line" }: Props) {
  if (variant === "dots") {
    return (
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <p className="text-center font-mono text-sm tracking-[0.5em] text-[#a1a1a6] select-none">
          · · ·
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div
        className="h-px w-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}20 30%, ${color}40 50%, ${color}20 70%, transparent)`,
        }}
      />
    </div>
  );
}
