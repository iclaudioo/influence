import { Link } from "@/i18n/navigation";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type Props = {
  items: BreadcrumbItem[];
  light?: boolean;
};

export function Breadcrumb({ items, light = false }: Props) {
  const baseColor = light ? "text-white/40" : "text-[#a1a1a6]";
  const hoverColor = light
    ? "hover:text-white/60 transition-colors"
    : "hover:text-[#6e6e73] transition-colors";
  const activeColor = light ? "text-white/60" : "text-[#6e6e73]";

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
