import { HeroContent } from "./components/hero/HeroContent";
import { AboutSection } from "./components/sections/AboutSection";
import { ContactSection } from "./components/sections/ContactSection";
import { FeatureSection } from "./components/sections/FeatureSection";

export default function Home() {
  return (
    <main
      id="home"
      className="mx-auto flex max-w-7xl flex-col px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      <HeroContent />
      <FeatureSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
