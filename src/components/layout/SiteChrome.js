"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactSocialBanner from "@/components/layout/ContactSocialBanner";

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const isStudioRoute = pathname?.startsWith("/studio");

  if (isStudioRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {children}
      <ContactSocialBanner />
      <Footer />
    </>
  );
}
