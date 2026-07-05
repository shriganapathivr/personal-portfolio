import type { Metadata, Viewport } from "next";
import { syne, inter } from "@/lib/fonts";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Loader from "@/components/Loader";

export const metadata: Metadata = {
  title: "Shri Ganapathi V.R — Full Stack Developer",
  description:
    "Full Stack Developer building cinematic, high-performance web experiences with React, Node & MongoDB. Based in Madurai, India.",
  authors: [{ name: "Shri Ganapathi V.R" }],
  openGraph: {
    title: "Shri Ganapathi V.R — Full Stack Developer",
    description:
      "Premium full stack developer & Upwork freelancer. React · Node · MongoDB.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <body className="font-body bg-base text-ink antialiased">
        <Loader />
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
