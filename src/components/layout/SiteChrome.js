"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactSocialBanner from "@/components/layout/ContactSocialBanner";

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const isStudioRoute = pathname?.startsWith("/studio");
  const isReelsRoute = pathname?.startsWith("/reels");

  if (isStudioRoute) {
    return <>{children}</>;
  }

  return (
    <>
      {!isReelsRoute && <Header />}
      {children}
      {!isReelsRoute && <ContactSocialBanner />}
      {!isReelsRoute && <Footer />}
    </>
  );
}
