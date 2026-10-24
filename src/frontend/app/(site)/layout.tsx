import type { ReactNode } from "react";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="collage-shell">
      <div className="collage-content">
        <SiteHeader />
        {children}
        <SiteFooter />
      </div>
    </div>
  );
}
