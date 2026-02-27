import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Notices } from "@/components/Notices";
import { Feedback } from "@/components/Feedback";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen relative selection:bg-stamp/20 selection:text-ink">
      <Header />
      <Hero />
      <About />
      <Projects />
      <Notices />
      <Feedback />
      <Footer />
    </main>
  );
}
