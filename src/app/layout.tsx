import type { Metadata } from "next";
import { Inter, Outfit, Merriweather } from "next/font/google";
import { Toaster } from "sonner";
import { AuthProvider } from "@/components/providers/AuthProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CV Builder — Free Modern Resume & CV Maker | ATS-Optimized",
  description:
    "Design and export clean, professional, ATS-friendly resumes and CVs in real-time with instant live preview and 1-click PDF download.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/logo-icon.svg",
    apple: "/logo-icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${merriweather.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-slate-900">
        <AuthProvider>{children}</AuthProvider>
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
