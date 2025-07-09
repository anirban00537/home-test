import { useMemo } from "react";
import { usePathname } from "next/navigation";

export const useUrlState = () => {
  const pathname = usePathname();

  const currentUrl = useMemo(() => {
    if (typeof window === "undefined")
      return `http://localhost:3000${pathname}`;
    return `${window.location.origin}${pathname}`;
  }, [pathname]);

  return { currentUrl };
};
