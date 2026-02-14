import EmberParticles from "@/components/EmberParticles";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import SampleRoast from "@/components/SampleRoast";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import SubmitForm from "@/components/SubmitForm";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <EmberParticles />
      <Header />
      <main className="relative z-10">
        <Hero />
        <HowItWorks />
        <SampleRoast />
        <Testimonials />
        <Pricing />
        <SubmitForm />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
