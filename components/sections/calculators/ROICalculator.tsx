"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Calculator, DollarSign, TrendingUp, Calendar, Clock, Percent, Download } from "lucide-react";
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";

export default function ROICalculator() {
  const [equipmentName, setEquipmentName] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");
  const [consultantName, setConsultantName] = useState<string>("");
  const [installmentValue, setInstallmentValue] = useState<number>(2500);
  const [sessionPrice, setSessionPrice] = useState<number>(300);
  const [sessionsPerDay, setSessionsPerDay] = useState<number>(4);
  const [daysWorked, setDaysWorked] = useState<number>(20);

  // PDF Export State
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const reportRef = useRef<HTMLDivElement>(null);

  // Computed Values
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(0);
  const [monthlyProfit, setMonthlyProfit] = useState<number>(0);
  const [roiPercentage, setRoiPercentage] = useState<number>(0);

  useEffect(() => {
    const revenue = sessionPrice * sessionsPerDay * daysWorked;
    const profit = revenue - installmentValue;
    const roi = installmentValue > 0 ? (profit / installmentValue) * 100 : 0;

    setMonthlyRevenue(revenue);
    setMonthlyProfit(profit);
    setRoiPercentage(roi);
  }, [installmentValue, sessionPrice, sessionsPerDay, daysWorked]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const generatePDF = async () => {
    if (!reportRef.current) return;
    setIsGenerating(true);
    try {
      // Small delay to ensure any layout shifts are settled
      await new Promise(resolve => setTimeout(resolve, 300));

      const imgData = await htmlToImage.toPng(reportRef.current, {
        quality: 1.0,
        pixelRatio: 2, // High resolution
        backgroundColor: '#121212',
      });
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [794, 1123] // A4 exactly
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, 794, 1123);
      const fileName = `Proposta-${clientName || 'Cliente'}-${equipmentName || 'Equipamento'}.pdf`;
      pdf.save(fileName.replace(/\s+/g, '-'));
    } catch (error) {
      console.error("Erro ao gerar PDF", error);
    } finally {
      setIsGenerating(false);
    }
  };

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
          {/* Inputs Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-5 bg-card/50 backdrop-blur-sm border border-shadow rounded-2xl p-6 md:p-8 space-y-8"
          >
            <h3 className="text-xl font-semibold text-title mb-6 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-highlight" /> Parâmetros
            </h3>

            {/* Consultant & Client */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Consultor(a)</label>
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={consultantName}
                  onChange={(e) => setConsultantName(e.target.value)}
                  className="w-full bg-background border border-shadow rounded-lg px-4 py-2 text-title focus:outline-none focus:border-highlight transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Cliente / Clínica</label>
                <input
                  type="text"
                  placeholder="Nome do Cliente"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-background border border-shadow rounded-lg px-4 py-2 text-title focus:outline-none focus:border-highlight transition-colors"
                />
              </div>
            </div>

            {/* Equipment Name */}
            <div className="space-y-4">
              <label className="text-sm font-medium text-gray-300">Nome do Equipamento (Opcional)</label>
              <input
                type="text"
                placeholder="Ex: Ultraformer MPT, Lavieen..."
                value={equipmentName}
                onChange={(e) => setEquipmentName(e.target.value)}
                className="w-full bg-background border border-shadow rounded-lg px-4 py-3 text-title focus:outline-none focus:border-highlight transition-colors"
              />
            </div>

            {/* Installment Value */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-300">Valor da Parcela (Mensal)</label>
                <div className="flex items-center gap-1">
                  <span className="text-gray-400 text-sm">R$</span>
                  <input
                    type="number"
                    value={installmentValue || ""}
                    onChange={(e) => setInstallmentValue(Number(e.target.value))}
                    className="bg-transparent border-b border-shadow/50 text-highlight font-semibold focus:outline-none focus:border-highlight text-right w-24"
                  />
                </div>
              </div>
              <input
                type="range"
                min="500"
                max="15000"
                step="100"
                value={installmentValue}
                onChange={(e) => setInstallmentValue(Number(e.target.value))}
                className="w-full h-2 bg-shadow rounded-lg appearance-none cursor-pointer accent-highlight"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>R$ 500</span>
                <span>R$ 15.000</span>
              </div>
            </div>


            {/* Session Price */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" /> Preço da Sessão
                </label>
                <div className="flex items-center gap-1">
                  <span className="text-gray-400 text-sm">R$</span>
                  <input
                    type="number"
                    value={sessionPrice || ""}
                    onChange={(e) => setSessionPrice(Number(e.target.value))}
                    className="bg-transparent border-b border-shadow/50 text-title font-semibold focus:outline-none focus:border-title text-right w-20"
                  />
                </div>
              </div>
              <input
                type="range"
                min="50"
                max="2000"
                step="10"
                value={sessionPrice}
                onChange={(e) => setSessionPrice(Number(e.target.value))}
                className="w-full h-2 bg-shadow rounded-lg appearance-none cursor-pointer accent-highlight"
              />
            </div>

            {/* Sessions per day */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Sessões por Dia
                </label>
                <input
                  type="number"
                  value={sessionsPerDay || ""}
                  onChange={(e) => setSessionsPerDay(Number(e.target.value))}
                  className="bg-transparent border-b border-shadow/50 text-title font-semibold focus:outline-none focus:border-title text-right w-16"
                />
              </div>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={sessionsPerDay}
                onChange={(e) => setSessionsPerDay(Number(e.target.value))}
                className="w-full h-2 bg-shadow rounded-lg appearance-none cursor-pointer accent-highlight"
              />
            </div>

            {/* Days worked */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Dias Trabalhados (Mês)
                </label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={daysWorked || ""}
                    onChange={(e) => setDaysWorked(Number(e.target.value))}
                    className="bg-transparent border-b border-shadow/50 text-title font-semibold focus:outline-none focus:border-title text-right w-16"
                  />
                  <span className="text-gray-400 text-sm">dias</span>
                </div>
              </div>
              <input
                type="range"
                min="1"
                max="31"
                step="1"
                value={daysWorked}
                onChange={(e) => setDaysWorked(Number(e.target.value))}
                className="w-full h-2 bg-shadow rounded-lg appearance-none cursor-pointer accent-highlight"
              />
            </div>
          </motion.div>

          {/* Outputs Section (Screen ONLY - No longer captured) */}
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
                  {consultantName && <p>Consultor: <span className="text-gray-300 font-medium">{consultantName}</span></p>}
                  {clientName && <p>Cliente: <span className="text-gray-300 font-medium">{clientName}</span></p>}
                  <p>Data: {new Date().toLocaleDateString('pt-BR')}</p>
                </div>
              </div>

              {/* Equipment Name Display */}
              {equipmentName && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card border border-highlight/30 rounded-2xl p-4 text-center shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                >
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Simulação de Retorno para</p>
                  <h3 className="text-2xl font-serif font-bold text-highlight">
                    {equipmentName}
                  </h3>
                </motion.div>
              )}

              {/* Revenue & Profit Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border border-shadow rounded-2xl p-6 relative overflow-hidden group hover:border-highlight/30 transition-colors">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <TrendingUp className="w-16 h-16 text-white" />
                </div>
                <p className="text-gray-400 text-sm font-medium mb-2">Faturamento Mensal</p>
                <h4 className="text-3xl font-bold text-title">{formatCurrency(monthlyRevenue)}</h4>
                <p className="text-xs text-gray-500 mt-4">
                  Sua receita bruta baseada nos atendimentos.
                </p>
              </div>

              <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-2xl p-6 relative overflow-hidden group hover:bg-[#D4AF37]/15 transition-colors">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <DollarSign className="w-16 h-16 text-[#D4AF37]" />
                </div>
                <p className="text-[#D4AF37]/80 text-sm font-medium mb-2">Lucro Mensal Líquido</p>
                <h4 className="text-3xl font-bold text-[#D4AF37]">{formatCurrency(monthlyProfit)}</h4>
                <p className="text-xs text-[#D4AF37]/60 mt-4">
                  O que sobra após pagar a parcela do equipamento.
                </p>
              </div>
            </div>

            {/* ROI Percentage Card */}
            <div className="bg-card border border-shadow rounded-2xl p-6 relative overflow-hidden group hover:border-highlight/30 transition-colors flex-grow flex flex-col justify-center">
              {/* Background Icon */}
              <div className="absolute right-0 top-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                <Percent className="w-24 h-24 text-white" />
              </div>
              
              <div className="relative z-10">
                <p className="text-gray-400 text-sm font-medium mb-2">Retorno sobre Investimento (ROI)</p>
                <div className="flex items-end gap-4">
                  <h4 className={`text-5xl md:text-6xl font-bold ${roiPercentage >= 0 ? 'text-[#4ade80]' : 'text-[#f87171]'}`}>
                    {roiPercentage > 0 ? '+' : ''}{roiPercentage.toFixed(0)}%
                  </h4>
                </div>
                
                <div className="mt-8 relative pt-4">
                  <div className="h-2 w-full bg-shadow/50 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full"
                      style={{ backgroundColor: '#D4AF37' }}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(Math.max(roiPercentage / 10, 0), 100)}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>0% (Empate)</span>
                    <span>1000%+</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-400 mt-6 leading-relaxed max-w-md">
                  {roiPercentage > 0 
                    ? `Excelente! O seu faturamento é ${(installmentValue > 0 ? (monthlyRevenue / installmentValue).toFixed(1) : 0)}x maior que o valor da parcela. Este investimento tem alto potencial de retorno.`
                    : `Atenção: Com estes valores, a parcela é maior que o faturamento. Tente aumentar as sessões ou o preço cobrado.`}
                </p>
              </div>
            </div>
            </div>

            {/* INVISIBLE A4 PDF TEMPLATE */}
            <div className="absolute left-[-9999px] top-0 pointer-events-none">
              <div 
                ref={reportRef} 
                className="bg-[#121212] flex flex-col justify-between"
                style={{ width: '794px', height: '1123px', padding: '60px' }}
              >
                {/* Header */}
                <div>
                  <div className="flex justify-between items-center border-b border-[#2A2A2A] pb-6 mb-8">
                    <div className="flex items-center gap-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/logo-pimenta.jpg" alt="Pimenta Estética" style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid #D4AF37' }} />
                      <div>
                        <h2 className="text-3xl font-serif font-bold text-[#D4AF37]">Pimenta Estética</h2>
                        <p className="text-sm text-gray-400 mt-1 uppercase tracking-widest">Estudo de Viabilidade Financeira</p>
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-300 space-y-1">
                      {consultantName && <p>Consultor: <span className="font-medium text-white">{consultantName}</span></p>}
                      {clientName && <p>Cliente: <span className="font-medium text-white">{clientName}</span></p>}
                      <p>Data: {new Date().toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>

                  {equipmentName && (
                    <div className="bg-[#1E1E1E] border border-[#D4AF37]/50 rounded-2xl p-6 text-center mb-8 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                      <p className="text-sm text-[#D4AF37] uppercase tracking-widest mb-2 font-semibold">Equipamento Selecionado</p>
                      <h3 className="text-4xl font-serif font-bold text-white">
                        {equipmentName}
                      </h3>
                    </div>
                  )}

                  {/* Parametros */}
                  <div className="bg-[#1A1A1A] rounded-2xl p-8 mb-8 border border-[#2A2A2A]">
                    <h4 className="text-[#D4AF37] text-lg font-bold mb-6 uppercase tracking-wider border-b border-[#2A2A2A] pb-2">Parâmetros da Simulação</h4>
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Valor da Parcela</p>
                        <p className="text-2xl font-bold text-white">{formatCurrency(installmentValue)}<span className="text-sm text-gray-500 font-normal">/mês</span></p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Valor da Sessão</p>
                        <p className="text-2xl font-bold text-white">{formatCurrency(sessionPrice)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Volume de Atendimentos</p>
                        <p className="text-2xl font-bold text-white">{sessionsPerDay} <span className="text-sm text-gray-500 font-normal">sessões/dia</span></p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Dias Úteis</p>
                        <p className="text-2xl font-bold text-white">{daysWorked} <span className="text-sm text-gray-500 font-normal">dias/mês</span></p>
                      </div>
                    </div>
                  </div>

                  {/* Resultados Principais */}
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-2xl p-8">
                      <p className="text-gray-400 text-sm font-medium mb-3">Faturamento Bruto Projetado</p>
                      <h4 className="text-4xl font-bold text-white">{formatCurrency(monthlyRevenue)}</h4>
                    </div>
                    <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-2xl p-8">
                      <p className="text-[#D4AF37]/80 text-sm font-medium mb-3">Lucro Líquido Projetado</p>
                      <h4 className="text-4xl font-bold text-[#D4AF37]">{formatCurrency(monthlyProfit)}</h4>
                    </div>
                  </div>

                  {/* ROI */}
                  <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-2xl p-8 text-center relative overflow-hidden">
                    <div className="absolute right-[-20px] top-[-20px] opacity-5">
                      <Percent className="w-48 h-48 text-white" />
                    </div>
                    <p className="text-gray-400 text-base font-medium mb-2">Retorno sobre Investimento (ROI)</p>
                    <h4 className={`text-7xl font-bold mb-4 ${roiPercentage >= 0 ? 'text-[#4ade80]' : 'text-[#f87171]'}`}>
                      {roiPercentage > 0 ? '+' : ''}{roiPercentage.toFixed(0)}%
                    </h4>
                    <p className="text-lg text-gray-300 max-w-xl mx-auto">
                      {roiPercentage > 0 
                        ? `O seu faturamento é ${(installmentValue > 0 ? (monthlyRevenue / installmentValue).toFixed(1) : 0)}x maior que o valor da parcela mensal.`
                        : `Atenção: Com estes valores, a parcela é maior que o faturamento.`}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-[#2A2A2A] pt-6 mt-8 text-center">
                  <p className="text-[#D4AF37] font-serif font-semibold text-xl mb-2">Equipando as Melhores Clínicas do Brasil</p>
                  <p className="text-gray-500 text-sm">Este é um simulador financeiro. Os valores são estimativas baseadas nos parâmetros informados.</p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex justify-center mt-8"
            >
              <button
                onClick={generatePDF}
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
