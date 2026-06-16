import { MessageCircle, Target } from "lucide-react";
import { ROICalculatorState } from "../types/roi.types";

interface Props {
  state: Pick<ROICalculatorState, 'conversationsNeeded' | 'monthlyConversations' | 'sessionsPerDay' | 'conversionRate' | 'daysWorked'>;
}

export default function ConversionFunnelCards({ state }: Props) {
  const { conversationsNeeded, monthlyConversations, sessionsPerDay, conversionRate, daysWorked } = state;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div className="bg-card border border-shadow rounded-2xl p-6 relative overflow-hidden group hover:border-highlight/30 transition-colors">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <MessageCircle className="w-16 h-16 text-white" />
        </div>
        <p className="text-gray-400 text-sm font-medium mb-2">Meta Diária de Conversas</p>
        <h4 className="text-3xl font-bold text-title">{conversationsNeeded} <span className="text-lg text-gray-500 font-normal">pessoas</span></h4>
        <p className="text-xs text-gray-500 mt-4">
          Para agendar {sessionsPerDay} sessões com {conversionRate}% de conversão.
        </p>
      </div>
      <div className="bg-card border border-shadow rounded-2xl p-6 relative overflow-hidden group hover:border-highlight/30 transition-colors">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Target className="w-16 h-16 text-white" />
        </div>
        <p className="text-gray-400 text-sm font-medium mb-2">Meta Mensal de Conversas</p>
        <h4 className="text-3xl font-bold text-title">{monthlyConversations} <span className="text-lg text-gray-500 font-normal">pessoas</span></h4>
        <p className="text-xs text-gray-500 mt-4">
          Volume total no mês (considerando {daysWorked} dias úteis).
        </p>
      </div>
    </div>
  );
}
