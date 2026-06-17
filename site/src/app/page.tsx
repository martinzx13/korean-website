import Header from "@/components/layout/header";
import Hero from "@/components/layout/hero";
import About from "@/components/layout/about";
import WorkshopsSection from "@/components/layout/workshops-section";
import InstructorsSection from "@/components/layout/instructors-section";
import Schedule from "@/components/layout/schedule";
import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <About />
      <WorkshopsSection />
      <InstructorsSection />
      <Schedule />
      <Footer />
    </div>
  );
}
