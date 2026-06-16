import { motion } from "framer-motion";
import { DollarSign, Clock, Calendar, Target, Users, CheckSquare } from "lucide-react";
import { ROICalculatorState } from "../types/roi.types";
import { CHANNELS_DATA } from "../constants/channels.data";

interface Props {
  state: ROICalculatorState;
}

export default function CalculatorInputs({ state }: Props) {
  const {
    consultantName, setConsultantName,
    clientName, setClientName,
    equipmentName, setEquipmentName,
    installmentValue, setInstallmentValue,
    sessionPrice, setSessionPrice,
    sessionsPerDay, setSessionsPerDay,
    daysWorked, setDaysWorked,
    conversionRate, setConversionRate,
    selectedChannels, setSelectedChannels
  } = state;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="lg:col-span-5 lg:sticky lg:top-24 self-start bg-card/50 backdrop-blur-sm border border-shadow rounded-2xl p-6 md:p-8 space-y-8"
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

      {/* Conversion Rate */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <Target className="w-4 h-4" /> Taxa de Conversão
          </label>
          <div className="flex items-center gap-1">
            <input
              type="number"
              value={conversionRate || ""}
              onChange={(e) => setConversionRate(Number(e.target.value))}
              className="bg-transparent border-b border-shadow/50 text-title font-semibold focus:outline-none focus:border-title text-right w-16"
            />
            <span className="text-gray-400 text-sm">%</span>
          </div>
        </div>
        <input
          type="range"
          min="1"
          max="100"
          step="1"
          value={conversionRate}
          onChange={(e) => setConversionRate(Number(e.target.value))}
          className="w-full h-2 bg-shadow rounded-lg appearance-none cursor-pointer accent-highlight"
        />
      </div>

      {/* Channels */}
      <div className="space-y-4 pt-4 border-t border-shadow/50">
        <label className="text-sm font-medium text-gray-300 flex items-center gap-2 mb-4">
          <Users className="w-4 h-4" /> Canais de Aquisição (Plano de Ação)
        </label>
        <div className="grid grid-cols-1 gap-3">
          {CHANNELS_DATA.map((channel) => (
            <label key={channel.id} className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center mt-0.5">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={selectedChannels.includes(channel.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedChannels([...selectedChannels, channel.id]);
                    } else {
                      setSelectedChannels(selectedChannels.filter(id => id !== channel.id));
                    }
                  }}
                />
                <div className="w-5 h-5 border-2 border-gray-500 rounded flex items-center justify-center peer-checked:border-highlight peer-checked:bg-highlight transition-colors">
                  {selectedChannels.includes(channel.id) && <CheckSquare className="w-3 h-3 text-black" />}
                </div>
              </div>
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{channel.label}</span>
            </label>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
