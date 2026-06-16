export interface Script {
  title: string;
  text: string;
}

export interface ChannelData {
  id: string;
  label: string;
  stats: string;
  actionPlan: string[];
  scripts: Script[];
  cadence: string[];
  metrics: string;
  errors: string;
}

export interface ROICalculatorState {
  equipmentName: string;
  setEquipmentName: (name: string) => void;
  clientName: string;
  setClientName: (name: string) => void;
  consultantName: string;
  setConsultantName: (name: string) => void;
  installmentValue: number;
  setInstallmentValue: (val: number) => void;
  sessionPrice: number;
  setSessionPrice: (val: number) => void;
  sessionsPerDay: number;
  setSessionsPerDay: (val: number) => void;
  daysWorked: number;
  setDaysWorked: (val: number) => void;
  conversionRate: number;
  setConversionRate: (val: number) => void;
  selectedChannels: string[];
  setSelectedChannels: (val: string[] | ((prev: string[]) => string[])) => void;
  expandedChannel: string | null;
  setExpandedChannel: (val: string | null) => void;
  monthlyRevenue: number;
  conversationsNeeded: number;
  monthlyConversations: number;
  monthlyProfit: number;
  roiPercentage: number;
}
