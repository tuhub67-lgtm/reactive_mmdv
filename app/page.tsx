import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Reframe } from "@/components/sections/Reframe";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhyItWorks } from "@/components/sections/WhyItWorks";
import { Calculator } from "@/components/sections/Calculator";
import { Objections } from "@/components/sections/Objections";
import { Pricing } from "@/components/sections/Pricing";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Reframe />
      <HowItWorks />
      <WhyItWorks />
      <Calculator />
      <Objections />
      <Pricing />
      <FinalCta />
    </>
  );
}
