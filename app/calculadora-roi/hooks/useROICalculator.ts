import { useState, useEffect } from "react";
import { ROICalculatorState } from "../types/roi.types";

export function useROICalculator(): ROICalculatorState {
  const [equipmentName, setEquipmentName] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");
  const [consultantName, setConsultantName] = useState<string>("");
  const [installmentValue, setInstallmentValue] = useState<number>(2500);
  const [sessionPrice, setSessionPrice] = useState<number>(300);
  const [sessionsPerDay, setSessionsPerDay] = useState<number>(4);
  const [daysWorked, setDaysWorked] = useState<number>(20);
  const [conversionRate, setConversionRate] = useState<number>(10);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [expandedChannel, setExpandedChannel] = useState<string | null>(null);

  // Computed Values
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(0);
  const [conversationsNeeded, setConversationsNeeded] = useState<number>(0);
  const [monthlyConversations, setMonthlyConversations] = useState<number>(0);
  const [monthlyProfit, setMonthlyProfit] = useState<number>(0);
  const [roiPercentage, setRoiPercentage] = useState<number>(0);

  useEffect(() => {
    const revenue = sessionPrice * sessionsPerDay * daysWorked;
    const profit = revenue - installmentValue;
    const roi = installmentValue > 0 ? (profit / installmentValue) * 100 : 0;

    const conversationsPerDay = conversionRate > 0 ? Math.ceil(sessionsPerDay / (conversionRate / 100)) : 0;

    setMonthlyRevenue(revenue);
    setMonthlyProfit(profit);
    setRoiPercentage(roi);
    setConversationsNeeded(conversationsPerDay);
    setMonthlyConversations(conversationsPerDay * daysWorked);
  }, [installmentValue, sessionPrice, sessionsPerDay, daysWorked, conversionRate]);

  return {
    equipmentName,
    setEquipmentName,
    clientName,
    setClientName,
    consultantName,
    setConsultantName,
    installmentValue,
    setInstallmentValue,
    sessionPrice,
    setSessionPrice,
    sessionsPerDay,
    setSessionsPerDay,
    daysWorked,
    setDaysWorked,
    conversionRate,
    setConversionRate,
    selectedChannels,
    setSelectedChannels,
    expandedChannel,
    setExpandedChannel,
    monthlyRevenue,
    conversationsNeeded,
    monthlyConversations,
    monthlyProfit,
    roiPercentage
  };
}
