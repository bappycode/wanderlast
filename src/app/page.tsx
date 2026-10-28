import { Banner } from "@/components/banner";
import { WhyChoose } from "@/components/why-choose";
import { Testimonials } from "@/components/testimonials";
import { CtaSection } from "@/components/cta";

export default function Home() {
  return (
    <>
      <Banner />
      <WhyChoose />
      <Testimonials />
      <CtaSection />
    </>
  );
}
