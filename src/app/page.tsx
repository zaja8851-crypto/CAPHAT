import { Hero } from "@/components/Hero";
import { BestSellers } from "@/components/BestSellers";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Testimonials } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Hero />
      <BestSellers />
      <WhyChooseUs />
      <Testimonials />
    </>
  );
}
