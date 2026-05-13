import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Services from "@/components/Services";
import Industries from "@/components/Industries";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";

export default function Home() {
  return (
    <main style={{ flex: 1 }}>
      <Navbar />
      <Hero />
      <Products />
      <Services />
      <Industries />
      <About />
      <Testimonials />
      <CTA />
      <Contact />
      <Footer />
      <FloatingActions />
    </main>
  );
}
