import { ReactNode } from "react";
import "@/asset/styles/globals.css";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "PropertyPulse | Find The Perfect Rental",
  description: "Find your dream rental property",
  keywords: "rental, find rentals, find properties",
};

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <main>
            <Navbar />
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
}
