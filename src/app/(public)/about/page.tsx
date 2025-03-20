import AboutHero from "@/components/about/AboutHero";
import OurStory from "@/components/about/OurStory";
import OurMission from "@/components/about/OurMission";
import Stats from "@/components/home/Stats";
import OurTeam from "@/components/about/OurTeam";
import OurValues from "@/components/about/OurValues";
import CTA from "@/components/home/CTA";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <OurStory />
      <OurMission />
      <Stats />
      <OurTeam />
      <OurValues />
      <CTA />
    </div>
  );
}
