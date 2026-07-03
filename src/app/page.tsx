import { Hero } from "@/components/Hero";
import { SpecialOffer } from "@/components/SpecialOffer";
import { BestSellers } from "@/components/BestSellers";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Testimonials } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Hero />
      <SpecialOffer />
      <BestSellers />
      <WhyChooseUs />
      <Testimonials />
    </>
  );
}
