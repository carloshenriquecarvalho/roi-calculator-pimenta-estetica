"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator, DollarSign, TrendingUp, Calendar, Clock, Percent } from "lucide-react";

export default function ROICalculator() {
  const [installmentValue, setInstallmentValue] = useState<number>(2500);
  const [sessionPrice, setSessionPrice] = useState<number>(300);
  const [sessionsPerDay, setSessionsPerDay] = useState<number>(4);
  const [daysWorked, setDaysWorked] = useState<number>(20);

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

          {/* Outputs Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
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

              <div className="bg-highlight/10 border border-highlight/20 rounded-2xl p-6 relative overflow-hidden group hover:bg-highlight/15 transition-colors">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <DollarSign className="w-16 h-16 text-highlight" />
                </div>
                <p className="text-highlight/80 text-sm font-medium mb-2">Lucro Mensal Líquido</p>
                <h4 className="text-3xl font-bold text-highlight">{formatCurrency(monthlyProfit)}</h4>
                <p className="text-xs text-highlight/60 mt-4">
                  O que sobra após pagar a parcela do equipamento.
                </p>
              </div>
            </div>

            {/* ROI Percentage Card */}
            <div className="bg-card border border-shadow rounded-2xl p-6 relative overflow-hidden group hover:border-highlight/30 transition-colors flex-grow flex flex-col justify-center">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Percent className="w-32 h-32 text-white" />
              </div>
              <p className="text-gray-400 text-sm font-medium mb-2">Retorno sobre Investimento (ROI)</p>
              <div className="flex items-end gap-4">
                <h4 className={`text-5xl md:text-6xl font-bold ${roiPercentage >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {roiPercentage > 0 ? '+' : ''}{roiPercentage.toFixed(0)}%
                </h4>
              </div>
              
              <div className="mt-8 relative pt-4">
                <div className="h-2 w-full bg-shadow rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-highlight"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(Math.max(roiPercentage / 10, 0), 100)}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>Ponto de Equilíbrio (0%)</span>
                  <span>Alta Rentabilidade</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-400 mt-6 leading-relaxed max-w-md">
                {roiPercentage > 0 
                  ? `Excelente! O seu faturamento é ${(monthlyRevenue / installmentValue).toFixed(1)}x maior que o valor da parcela. Este investimento tem alto potencial de retorno.`
                  : `Atenção: Com estes valores, a parcela é maior que o faturamento. Tente aumentar as sessões ou o preço cobrado.`}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
