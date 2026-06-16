import { RefObject } from "react";
import { Target, MessageSquare, Clock, BarChart, AlertTriangle } from "lucide-react";
import { ROICalculatorState } from "../types/roi.types";
import { CHANNELS_DATA } from "../constants/channels.data";

interface Props {
  state: ROICalculatorState;
  reportRef: RefObject<HTMLDivElement | null>;
}

export default function PDFReportTemplate({ state, reportRef }: Props) {
  const {
    consultantName,
    clientName,
    equipmentName,
    installmentValue,
    monthlyRevenue,
    roiPercentage,
    monthlyConversations,
    selectedChannels
  } = state;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="absolute left-[-9999px] top-0 pointer-events-none">
      <div 
        ref={reportRef} 
        className="bg-[#121212] flex flex-col justify-between"
        style={{ width: '794px', minHeight: '1123px', height: 'auto', padding: '60px' }}
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
            <div className="text-right text-sm text-gray-400">
              {consultantName && <p className="mb-1">Consultor: <span className="text-white font-medium">{consultantName}</span></p>}
              {clientName && <p className="mb-1">Cliente: <span className="text-white font-medium">{clientName}</span></p>}
              <p>Data: {new Date().toLocaleDateString('pt-BR')}</p>
            </div>
          </div>

          <div className="text-center mb-10">
            <h3 className="text-4xl font-serif font-bold text-white mb-2">Simulação de Retorno</h3>
            <p className="text-[#D4AF37] text-xl font-medium uppercase tracking-widest">{equipmentName || 'Equipamento Selecionado'}</p>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-10">
            <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#2A2A2A]">
              <p className="text-gray-400 text-sm mb-1">Faturamento Estimado</p>
              <p className="text-3xl font-bold text-white">{formatCurrency(monthlyRevenue)} <span className="text-sm text-gray-500 font-normal">/mês</span></p>
            </div>
            <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#2A2A2A]">
              <p className="text-gray-400 text-sm mb-1">Parcela do Equipamento</p>
              <p className="text-3xl font-bold text-[#D4AF37]">{formatCurrency(installmentValue)} <span className="text-sm text-[#D4AF37]/50 font-normal">/mês</span></p>
            </div>
            <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#2A2A2A]">
              <p className="text-gray-400 text-sm mb-1">Retorno sobre Investimento</p>
              <p className={`text-3xl font-bold ${roiPercentage >= 0 ? 'text-[#4ade80]' : 'text-[#f87171]'}`}>
                {roiPercentage > 0 ? '+' : ''}{roiPercentage.toFixed(0)}%
              </p>
            </div>
            <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#2A2A2A]">
              <p className="text-gray-400 text-sm mb-1">Conversas Mensais</p>
              <p className="text-3xl font-bold text-white">{monthlyConversations} <span className="text-sm text-gray-500 font-normal">/mês</span></p>
            </div>
          </div>

          {/* Plano de Ação PDF */}
          {selectedChannels.length > 0 && (
            <div className="mt-8 bg-[#1A1A1A] rounded-2xl p-8 border border-[#2A2A2A]">
              <h4 className="text-[#D4AF37] text-lg font-bold mb-6 uppercase tracking-wider border-b border-[#2A2A2A] pb-2">Plano de Ação Estratégico Detalhado</h4>
              <div className="space-y-12">
                {CHANNELS_DATA.filter(c => selectedChannels.includes(c.id)).map(channel => (
                  <div key={channel.id} className="border-l-2 border-[#D4AF37] pl-6 pb-6 border-b border-[#2A2A2A] last:border-b-0 last:pb-0">
                    <h5 className="font-bold text-white text-2xl mb-1">{channel.label}</h5>
                    <p className="text-gray-400 text-sm mb-6 uppercase tracking-wider">{channel.stats}</p>
                    
                    <div className="grid grid-cols-12 gap-8">
                      {/* Esquerda: Passo a passo */}
                      <div className="col-span-7">
                        <h6 className="text-[#D4AF37] font-semibold flex items-center gap-2 mb-4 uppercase tracking-wider text-sm">
                          <Target className="w-4 h-4" /> PASSO A PASSO
                        </h6>
                        <ol className="space-y-4 pl-0 list-none">
                          {channel.actionPlan.map((step, idx) => (
                            <li key={idx} className="text-sm text-gray-300 flex gap-3 leading-relaxed">
                              <span className="text-[#D4AF37] font-bold">{idx + 1}.</span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Direita: Scripts, Cadencia, Metricas */}
                      <div className="col-span-5 space-y-6">
                        {/* Scripts */}
                        <div className="bg-[#121212] rounded-xl p-5 border border-[#2A2A2A]">
                          <h6 className="text-[#D4AF37] text-xs font-bold flex items-center gap-2 mb-3 uppercase">
                            <MessageSquare className="w-3 h-3" /> Scripts Prontos
                          </h6>
                          <div className="space-y-4">
                            {channel.scripts.map((script, idx) => (
                              <div key={idx}>
                                <p className="text-xs text-gray-500 mb-1 font-medium">{script.title}</p>
                                <p className="text-xs text-gray-300 italic leading-relaxed">"{script.text}"</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Cadência */}
                        <div className="bg-[#121212] rounded-xl p-5 border border-[#2A2A2A]">
                          <h6 className="text-[#D4AF37] text-xs font-bold flex items-center gap-2 mb-3 uppercase">
                            <Clock className="w-3 h-3" /> Cadência
                          </h6>
                          <ul className="space-y-3">
                            {channel.cadence.map((item, idx) => (
                              <li key={idx} className="text-xs text-gray-300 flex items-start gap-2 leading-relaxed">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1.5 flex-shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Métricas e Evite */}
                        <div className="bg-[#121212] rounded-xl p-5 border border-[#2A2A2A]">
                          <h6 className="text-[#D4AF37] text-xs font-bold mb-2 uppercase flex items-center gap-2">
                            <BarChart className="w-3 h-3" /> Métricas Esperadas
                          </h6>
                          <p className="text-xs text-gray-300 mb-5 leading-relaxed">{channel.metrics}</p>
                          
                          <h6 className="text-[#f87171] text-xs font-bold mb-2 uppercase flex items-center gap-2">
                            <AlertTriangle className="w-3 h-3" /> Evite
                          </h6>
                          <p className="text-xs text-gray-300 leading-relaxed">{channel.errors}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[#2A2A2A] pt-6 mt-8 text-center">
          <p className="text-[#D4AF37] font-serif font-semibold text-xl mb-2">Equipando as Melhores Clínicas do Brasil</p>
          <p className="text-gray-500 text-sm">Este é um simulador financeiro. Os valores são estimativas baseadas nos parâmetros informados.</p>
        </div>
      </div>
    </div>
  );
}
