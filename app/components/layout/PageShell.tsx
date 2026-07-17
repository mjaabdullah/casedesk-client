import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8F9FB] text-slate-900">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
