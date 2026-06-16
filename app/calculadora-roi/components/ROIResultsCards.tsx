import { motion } from "framer-motion";
import { TrendingUp, DollarSign, Percent } from "lucide-react";
import { ROICalculatorState } from "../types/roi.types";

interface Props {
  state: Pick<ROICalculatorState, 'monthlyRevenue' | 'monthlyProfit' | 'roiPercentage' | 'installmentValue'>;
}

export default function ROIResultsCards({ state }: Props) {
  const { monthlyRevenue, monthlyProfit, roiPercentage, installmentValue } = state;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <>
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
      <div className="bg-card border border-shadow rounded-2xl p-6 relative overflow-hidden group hover:border-highlight/30 transition-colors flex-grow flex flex-col justify-center mt-6">
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
    </>
  );
}
