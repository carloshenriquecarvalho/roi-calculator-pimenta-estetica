import { Zap, ChevronDown, ChevronUp, Target, MessageSquare, Clock, BarChart, AlertTriangle } from "lucide-react";
import { CHANNELS_DATA } from "../constants/channels.data";

interface Props {
  selectedChannels: string[];
  expandedChannel: string | null;
  setExpandedChannel: (channel: string | null) => void;
}

export default function ActionPlanAccordion({ selectedChannels, expandedChannel, setExpandedChannel }: Props) {
  if (selectedChannels.length === 0) return null;

  return (
    <div className="mt-6 bg-card border border-highlight/20 rounded-2xl p-6">
      <h4 className="text-lg font-semibold text-highlight mb-4 flex items-center gap-2">
        <Zap className="w-5 h-5" /> Plano de Ação Estratégico
      </h4>
      <div className="space-y-4">
        {CHANNELS_DATA.filter(c => selectedChannels.includes(c.id)).map(channel => (
          <div key={channel.id} className="bg-background/50 rounded-xl border border-shadow/50 overflow-hidden transition-all">
            <button 
              onClick={() => setExpandedChannel(expandedChannel === channel.id ? null : channel.id)}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
            >
              <div>
                <h5 className="font-medium text-white text-lg">{channel.label}</h5>
                <p className="text-xs text-gray-500 mt-1">{channel.stats}</p>
              </div>
              {expandedChannel === channel.id ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
            </button>
            
            {expandedChannel === channel.id && (
              <div className="p-4 pt-0 border-t border-shadow/50 mt-2 space-y-6">
                {/* Plano de Ação */}
                <div>
                  <h6 className="text-highlight text-sm font-bold flex items-center gap-2 mb-3 uppercase tracking-wider">
                    <Target className="w-4 h-4" /> Passo a Passo
                  </h6>
                  <ol className="space-y-3 pl-0 list-none">
                    {channel.actionPlan.map((step, idx) => (
                      <li key={idx} className="text-sm text-gray-300 flex gap-3">
                        <span className="text-highlight font-bold mt-0.5">{idx + 1}.</span>
                        <span className="leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Scripts */}
                <div>
                  <h6 className="text-highlight text-sm font-bold flex items-center gap-2 mb-3 uppercase tracking-wider">
                    <MessageSquare className="w-4 h-4" /> Scripts Prontos
                  </h6>
                  <div className="space-y-3">
                    {channel.scripts.map((script, idx) => (
                      <div key={idx} className="bg-black/30 rounded-lg p-3 border border-white/5">
                        <p className="text-xs text-gray-400 mb-1 font-medium">{script.title}</p>
                        <p className="text-sm text-gray-200 italic">"{script.text}"</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Cadência */}
                  <div>
                    <h6 className="text-highlight text-sm font-bold flex items-center gap-2 mb-3 uppercase tracking-wider">
                      <Clock className="w-4 h-4" /> Cadência
                    </h6>
                    <ul className="space-y-3">
                      {channel.cadence.map((item, idx) => (
                        <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1.5 flex-shrink-0" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Métricas e Erros */}
                  <div className="space-y-6">
                    <div>
                      <h6 className="text-highlight text-sm font-bold flex items-center gap-2 mb-2 uppercase tracking-wider">
                        <BarChart className="w-4 h-4" /> Métricas Esperadas
                      </h6>
                      <p className="text-sm text-gray-300 leading-relaxed">{channel.metrics}</p>
                    </div>
                    <div>
                      <h6 className="text-[#f87171] text-sm font-bold flex items-center gap-2 mb-2 uppercase tracking-wider">
                        <AlertTriangle className="w-4 h-4" /> Evite
                      </h6>
                      <p className="text-sm text-gray-300 leading-relaxed">{channel.errors}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
