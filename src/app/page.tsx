import BrandNav from "@/components/BrandNav";
import Film from "@/components/Film";
import FlavourDeck from "@/components/FlavourDeck";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import ScrollEngine from "@/components/ScrollEngine";
import TryContact from "@/components/TryContact";
import Why from "@/components/Why";

export default function Home() {
  return (
    <>
      <Loader />
      <BrandNav />
      <main>
        <Film />
        <FlavourDeck />
        <Why />
        <TryContact />
      </main>
      <Footer />
      <ScrollEngine />
    </>
  );
}
