import { Metadata } from "next";
import LandingHeader from "@/components/layout/LandingHeader";
import Footer from "@/components/layout/Footer";
import ROICalculator from "./components/ROICalculator";

export const metadata: Metadata = {
  title: "Calculadora de ROI | ML Equipamentos",
  description: "Simule o retorno sobre investimento (ROI) e o potencial de faturamento do seu novo equipamento de estética.",
};

export default function CalculadoraRoiPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      <main className="flex-grow pt-20">
        <ROICalculator />
      </main>
      <Footer />
    </div>
  );
}
