import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import FeaturesShowcase from '../components/FeaturesShowcase';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import CTA from '../components/CTA';
import Contact from '../components/Contact';

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <Features />
      <FeaturesShowcase />
      <Testimonials />
      <Pricing />
      <CTA />
      <Contact />
    </main>
  );
}