"use client";

import { motion } from "framer-motion";
import { Calculator, Download } from "lucide-react";
import { useROICalculator } from "../hooks/useROICalculator";
import { usePDFExport } from "../hooks/usePDFExport";

import CalculatorInputs from "./CalculatorInputs";
import ROIResultsCards from "./ROIResultsCards";
import ConversionFunnelCards from "./ConversionFunnelCards";
import ActionPlanAccordion from "./ActionPlanAccordion";
import PDFReportTemplate from "./PDFReportTemplate";

export default function ROICalculator() {
  const state = useROICalculator();
  const { isGenerating, reportRef, generatePDF } = usePDFExport();

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-highlight/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[30vw] h-[30vw] bg-highlight/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-shadow text-highlight text-sm font-medium mb-6"
          >
            <Calculator className="w-4 h-4" />
            Simulador Financeiro
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-serif font-bold text-title mb-6"
          >
            Calculadora de <span className="text-highlight">ROI</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Descubra o potencial de lucro do seu novo equipamento de estética. 
            Ajuste os valores abaixo para simular o seu cenário.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <CalculatorInputs state={state} />

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-7 flex flex-col"
          >
            <div className="flex flex-col gap-6 bg-background rounded-3xl p-2 sm:p-6">
              {/* Header on Screen */}
              <div className="flex justify-between items-center border-b border-shadow pb-4 mb-2">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logo-pimenta.jpg" alt="Pimenta Estética" className="w-12 h-12 rounded-full object-cover border border-highlight/30" />
                  <div>
                    <h3 className="text-xl font-serif font-bold text-highlight">Pimenta Estética</h3>
                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Estudo de Viabilidade Financeira</p>
                  </div>
                </div>
                <div className="text-right text-xs text-gray-400 space-y-1">
                  {state.consultantName && <p>Consultor: <span className="text-gray-300 font-medium">{state.consultantName}</span></p>}
                  {state.clientName && <p>Cliente: <span className="text-gray-300 font-medium">{state.clientName}</span></p>}
                  <p>Data: {new Date().toLocaleDateString('pt-BR')}</p>
                </div>
              </div>

              {state.equipmentName && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card border border-highlight/30 rounded-2xl p-4 text-center shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                >
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Simulação de Retorno para</p>
                  <h3 className="text-2xl font-serif font-bold text-highlight">{state.equipmentName}</h3>
                </motion.div>
              )}

              <ROIResultsCards state={state} />
              <ConversionFunnelCards state={state} />
              <ActionPlanAccordion 
                selectedChannels={state.selectedChannels} 
                expandedChannel={state.expandedChannel}
                setExpandedChannel={state.setExpandedChannel}
              />
            </div>

            <PDFReportTemplate state={state} reportRef={reportRef} />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex justify-center mt-8"
            >
              <button
                onClick={() => generatePDF(state.clientName, state.equipmentName)}
                disabled={isGenerating}
                className="flex items-center gap-3 bg-[#D4AF37] hover:bg-[#B5952F] text-[#121212] font-bold py-4 px-8 rounded-full transition-all disabled:opacity-70 disabled:cursor-not-allowed hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(212,175,55,0.3)] w-full md:w-auto justify-center"
              >
                {isGenerating ? (
                  <>Gerando PDF...</>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Baixar Proposta em PDF
                  </>
                )}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
