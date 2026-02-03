import Hero from "./Hero";
import Services from "./Services";
import WhyChooseUs from "./WhyChooseUs";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";
import CallToAction from "../../components/common/CallToAction";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
    </>
  );
}
