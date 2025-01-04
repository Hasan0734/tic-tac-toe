import HomeSection from "@/components/HomeSection";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main className={cn("flex items-center justify-center h-dvh", inter.variable)}>
      <HomeSection />
    </main>
  );
}
