import { Metadata } from "next";
import { hubContent } from "@/data/content";

import LandingHeader from "@/components/layout/LandingHeader";
import Footer from "@/components/layout/Footer";
import HubHero from "@/components/sections/hub/HubHero";
import HubServices from "@/components/sections/hub/HubServices";
import Testimonials from "@/components/sections/landing/Testimonials";
import Faq from "@/components/sections/landing/Faq";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "ML Equipamentos | Equipamentos High Ticket",
  description: "Distribuição dos melhores equipamentos para clínicas de estética avançada e médica. Tecnologia de ponta, treinamento e suporte técnico.",
  openGraph: {
      title: "ML Equipamentos",
      description: "Equipando as Melhores Clínicas do Brasil com Tecnologia High Ticket.",
      images: ["/logo-pimenta.jpg"],
  }
};

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <LandingHeader />
            <main className="flex-grow pt-20">
                <HubHero {...hubContent.hero} />
                <HubServices services={hubContent.services} />
                <Testimonials {...hubContent.testimonials} />
                <Faq {...hubContent.faq} />
            </main>
            <Footer />
        </div>
    )
}
