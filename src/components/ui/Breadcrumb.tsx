import { Link } from "@/i18n/navigation";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type Props = {
  items: BreadcrumbItem[];
  light?: boolean;
};

export function Breadcrumb({ items, light = true }: Props) {
  const baseColor = light ? "text-white/40" : "text-[#02182B]/40";
  const hoverColor = light
    ? "hover:text-white/60 transition-colors"
    : "hover:text-[#02182B]/60 transition-colors";
  const activeColor = light ? "text-white/60" : "text-[#02182B]/60";

  return (
    <nav className={`mb-8 flex items-center gap-2 text-sm ${baseColor}`}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;

        return (
          <span key={i} className="flex items-center gap-2">
            {i > 0 && <span>/</span>}
            {isLast || !item.href ? (
              <span className={`${activeColor} ${isLast ? "truncate max-w-[200px]" : ""}`}>
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className={hoverColor}>
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
