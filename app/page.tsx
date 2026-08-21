import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { StackSection } from "@/components/stack-section";
import { TimelineSection } from "@/components/timeline-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      {/* Everything below the hero shares one clipped, theme-tinted canvas. */}
      <div className="rb-body">
        <AboutSection />
        <StackSection />
        <ProjectsSection />
        <TimelineSection />
        <ContactSection />
      </div>
    </>
  );
}
