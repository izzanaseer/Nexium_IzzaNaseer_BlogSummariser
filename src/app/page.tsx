import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import HeroSection from "@/components/HeroSection";


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <HeroSection />
      </main>

      <Footer />
    </div>
  );
}
