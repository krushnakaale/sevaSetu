import Hero from "./Hero";
import LiveInterview from "./LiveInterview";
import HowItWorks from "./HowItWorks";
import CallToAction from "../../components/common/CallToAction";

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* <LiveInterview /> */}
      <HowItWorks />
      <CallToAction />
    </>
  );
}
