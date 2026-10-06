import type { Metadata } from "next";
import { LandingNav } from "@/components/landing-nav";
import { LandingFooter } from "@/components/landing-footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollProgress } from "@/components/scroll-progress";
import { BackToTop } from "@/components/back-to-top";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Orange ERP · Labour and project management for construction teams",
    template: "%s · Orange ERP",
  },
  description:
    "Orange ERP helps construction teams track attendance, projects, payments and material stock from one calm dashboard.",
  icons: {
    icon: "/logo/orange-favicon.svg",
    apple: "/logo/orange-apple-favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>
          <ScrollProgress />
          <LandingNav />
          <main id="main">{children}</main>
          <LandingFooter />
          <BackToTop />
        </SmoothScroll>
      </body>
    </html>
  );
}
