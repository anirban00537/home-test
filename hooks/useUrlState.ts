import { useMemo } from "react";
import { usePathname } from "next/navigation";

// Hook for getting the current absolute URL, handling both client and server environments
export const useUrlState = () => {
  const pathname = usePathname();

  // Generate absolute URL with fallback for server-side rendering
  const currentUrl = useMemo(() => {
    if (typeof window === "undefined") return `${pathname}`;
    return `${pathname}`;
  }, [pathname]);

  return { currentUrl };
};
