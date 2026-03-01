type Props = {
  from?: string;
  to?: string;
  accentColor?: string;
};

export function SectionDivider({
  from = "var(--color-navy)",
  to = "var(--color-off-white)",
  accentColor,
}: Props) {
  return (
    <div className="relative h-24 -mt-1 -mb-1" style={{ background: from }}>
      <div
        className="absolute inset-0"
        style={{
          background: to,
          clipPath: "polygon(0 40%, 100% 0, 100% 100%, 0 100%)",
        }}
      />
      {accentColor && (
        <div
          className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-32 h-1 rounded-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
          }}
        />
      )}
    </div>
  );
}
