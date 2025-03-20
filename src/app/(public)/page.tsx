import Features from "@/components/home/Features";
import HomeHero from "@/components/home/HomeHero";
import HowItWorks from "@/components/home/HowItWorks";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";
import React from "react";

const Home = () => {
  return (
    <>
      <HomeHero />
      <Stats />
      <Features />
      <HowItWorks />
      <Testimonials />
    </>
  );
};

export default Home;
