"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface NavigationWrapperProps {
  dossier: ReactNode;
  standard: ReactNode;
}

const homePaths = ["/", "/nl", "/en"];

export function NavigationWrapper({ dossier, standard }: NavigationWrapperProps) {
  const pathname = usePathname();
  const isHomepage = homePaths.includes(pathname);

  return <>{isHomepage ? dossier : standard}</>;
}
