"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Calculator, DollarSign, TrendingUp, Calendar, Clock, Percent, Download, Target, Users, MessageCircle, CheckSquare, CheckCircle2, ChevronDown, ChevronUp, Zap, BarChart, AlertTriangle, MessageSquare } from "lucide-react";
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";

const CHANNELS = [
  {
    id: "clientes_ativos",
    label: "Clientes Ativos",
    stats: "Velocidade: Resultado rápido | Esforço: Baixo | ROI: Alto",
    actionPlan: [
      "Segmente sua base antes de qualquer contato. Separe clientes em 3 grupos: (a) compraram há menos de 90 dias, (b) entre 90–180 dias sem retorno, (c) mais de 6 meses. Cada grupo recebe abordagem diferente — tom, oferta e urgência variam conforme o tempo de distância.",
      "Monte uma oferta de lançamento exclusiva. Não ofereça desconto genérico. Crie uma \"condição de cliente VIP\": sessão de avaliação gratuita com o novo equipamento, pacote trial, ou acesso antecipado antes de abrir ao público. A percepção de exclusividade é o que gera resposta rápida.",
      "Contato via WhatsApp com personalização real. Mencione o nome, o tratamento anterior que ela fez, e o resultado que já obteve. \"Oi Camila, lembro que você veio fazer o protocolo de firmeza — achei que ia adorar conhecer o novo equipamento que chegou aqui.\"",
      "Crie urgência legítima. Limite a oferta a 10 clientes da base antes de abrir ao público geral. Isso gera prioridade real, não artificial — e funciona porque é verdade.",
      "Acompanhe o resultado da sessão e peça indicação imediata. Logo após o agendamento confirmado, pergunte se ela tem uma amiga que também ia adorar conhecer. Aproveite o momentum da empolgação antes que esfrie."
    ],
    scripts: [
      { title: "Reativação — grupo B (90–180 dias sem retorno)", text: "Oi [nome]! Sumida 👋 Lembro que você fez [tratamento] aqui com a gente e adorou o resultado. Chegou um equipamento novo que complementa exatamente o que você fez — e antes de abrir pra agenda normal, quero oferecer pra quem já é cliente. Tenho horário na [dia] ou [dia], qual funciona melhor pra você?" },
      { title: "Base quente — grupo A (menos de 90 dias)", text: "Oi [nome], tudo bem? Aqui é [seu nome] da [clínica]. Acabou de chegar um equipamento que combina perfeitamente com o protocolo que você já faz — estamos com agenda de avaliação gratuita essa semana pra clientes. Você topa conhecer?" }
    ],
    cadence: [
      "Dia 1 — Envio do WhatsApp personalizado para o grupo B (90–180 dias).",
      "Dia 2 — Envio para o grupo A (menos de 90 dias), com oferta diferente, mais direta.",
      "Dia 4 — Follow-up para quem não respondeu: mensagem mais curta, sem repetir a oferta, só curiosidade.",
      "Dia 7 — Último contato: \"Já preenchemos boa parte das vagas, mas reservei uma pra você até amanhã.\"",
      "Dia 14 — Iniciar reativação do grupo C (mais de 6 meses) com abordagem mais suave e ângulo diferente."
    ],
    metrics: "Taxa de resposta: 30–50%. Taxa de conversão em agendamento: 15–25%. Tempo até o primeiro resultado: 2–4 dias.",
    errors: "Não mande mensagem em massa com o mesmo texto — parece spam e destrói a percepção de exclusividade. Não ofereça desconto sem agregar valor antes — isso treina o cliente a esperar promoção. Não esqueça de seguir o contato de quem disse \"depois\" — a maioria das conversões vem no follow-up."
  },
  {
    id: "trafego_pago",
    label: "Tráfego Pago",
    stats: "Velocidade: Resultado em 7–15 dias | Esforço: Alto | ROI: Médio–alto",
    actionPlan: [
      "Defina a \"dor específica\" antes de criar qualquer criativo. Não anuncie o equipamento — anuncie o problema que ele resolve. \"Flacidez que nenhum creme resolve\" ou \"gordura localizada que persiste mesmo malhando\" convertem muito mais do que \"conheça nossa nova tecnologia\".",
      "Crie 3 campanhas com objetivos distintos. Consciência: vídeo curto mostrando antes/depois real. Consideração: depoimento de cliente com resultado específico e detalhado. Conversão: oferta direta com CTA para WhatsApp ou landing page simples. Cada campanha fala com a pessoa em um momento diferente da jornada.",
      "Direcione sempre para WhatsApp, não para o Instagram. Landing pages que abrem o WhatsApp têm conversão 3x maior do que formulários. Configure o botão com texto pré-preenchido no link para a pessoa não precisar digitar nada.",
      "Segmentação: mulheres de 28–52 anos, raio de 10–15 km da clínica. Não use interesse genérico como \"beleza\". Use comportamentos: pessoas que interagem com conteúdo de emagrecimento, saúde da mulher, ou procedimentos estéticos específicos.",
      "Teste 3 variações de criativo por semana, mudando uma variável por vez. Headline, imagem ou CTA — um de cada vez. Desligue o que tem CPL acima de R$25–40 e escale o que está abaixo. Sem testes sistemáticos, você não sabe o que está funcionando."
    ],
    scripts: [
      { title: "Abertura de vídeo — primeiros 3 segundos", text: "Você já tentou de tudo e a flacidez ainda está lá? — Mostre o rosto falando direto para a câmera. Sem texto animado, sem música alta. Autenticidade converte mais do que produção nesse formato." },
      { title: "Copy do anúncio de conversão", text: "Chegou o [nome do equipamento] na [clínica]. Tecnologia usada para [resultado específico] em [X sessões]. Agenda limitada para avaliação gratuita essa semana. Clique e fale com a gente agora 👇" }
    ],
    cadence: [
      "Semana 1 — Lançar campanha de consciência com 2 criativos de vídeo antes/depois. Analisar primeiros dados de alcance e custo por visualização.",
      "Semana 2 — Adicionar campanha de conversão. Analisar CPL e desligar criativos com performance ruim.",
      "Semana 3 — Criar campanha de remarketing para quem assistiu 50% ou mais do vídeo e ainda não entrou em contato.",
      "Semana 4 — Revisão geral. Escalar orçamento do criativo com melhor CPL e repetir o ciclo de testes."
    ],
    metrics: "CPL saudável: R$15–35 por lead. Taxa de conversão de lead em agendamento: 20–35%. ROAS mínimo para escalar: 3–5x.",
    errors: "Não impulsione posts do feed — crie anúncios específicos no Gerenciador de Anúncios. Não use imagens de banco (stock photos) — rostos reais de clientes convertem muito mais. Não demore para responder leads: a taxa de conversão cai 80% depois de 2 horas sem retorno."
  },
  {
    id: "indicacao",
    label: "Indicação",
    stats: "Velocidade: Resultado em 15–30 dias | Esforço: Baixo | ROI: Muito alto",
    actionPlan: [
      "Crie um benefício que o cliente ativamente quer contar. Desconto só funciona se for relevante. Pense em: sessão extra gratuita, produto exclusivo, upgrade no protocolo, ou acesso a tratamento que ela ainda não fez. O benefício precisa ser bom o suficiente para ela sentir orgulho de compartilhar.",
      "Defina o benefício para a amiga indicada também. A dinâmica mais poderosa é dupla: quem indica e quem é indicada ganham algo. Isso remove a barreira psicológica de \"parecer interesseira\" e deixa a conversa natural.",
      "Peça a indicação no momento certo: logo após o resultado. O melhor momento é quando a cliente vê o resultado no espelho ainda na clínica. A euforia do resultado é o gatilho mais poderoso — não deixe esfriar.",
      "Facilite ao máximo: dê a mensagem pronta para ela enviar. Muitas clientes gostariam de indicar mas não sabem como começar. Crie uma mensagem que ela pode copiar e enviar para a amiga em 10 segundos, sem precisar pensar no que escrever.",
      "Rastreie cada indicação e feche o ciclo com quem indicou. Quando a amiga indicada aparecer, avise quem indicou: \"Sua amiga [nome] agendou! Seu benefício já está garantido.\" Isso gera sensação de recompensa e repete o comportamento automaticamente."
    ],
    scripts: [
      { title: "Pedido de indicação após a sessão", text: "[Nome], você está adorando o resultado né? Acabei de lembrar: temos nosso programa onde se você indicar uma amiga e ela vier conhecer, você ganha [benefício]. Tem alguém que você sabe que ia amar isso? — Pausa. Deixe ela pensar. Não preencha o silêncio." },
      { title: "Mensagem pronta para a cliente copiar e enviar", text: "Amiga, comecei a fazer [tratamento] na [clínica] e to amando os resultados. A [nome da profissional] é incrível. Você pode agendar uma avaliação gratuita aqui: [link/número]. Fala que fui eu que indiquei 😊" }
    ],
    cadence: [
      "Durante a sessão — Perguntar sobre o resultado e abrir a conversa sobre indicação de forma natural, sem parecer roteiro.",
      "Logo após a sessão — Enviar a mensagem pronta via WhatsApp para a cliente copiar e encaminhar.",
      "3 dias depois — Follow-up gentil: \"Teve alguma amiga interessada?\"",
      "Ao confirmar — Notificar quem indicou quando a amiga agendar: reforça o comportamento e fecha o ciclo."
    ],
    metrics: "Com abordagem ativa: 1 em cada 3 clientes indica alguém. Taxa de conversão de indicadas em agendamento: 60–80%. Custo de aquisição: zero.",
    errors: "Não ofereça só desconto — experiências e benefícios em serviço têm muito mais valor percebido. Não peça indicação por mensagem fria — o momento presencial após o resultado é insubstituível. Não esqueça de fechar o ciclo: a cliente que indicou precisa saber que a amiga veio."
  },
  {
    id: "instagram_organico",
    label: "Instagram Orgânico",
    stats: "Velocidade: Resultado em 30–60 dias | Esforço: Médio | ROI: Médio",
    actionPlan: [
      "Construa em 3 pilares de conteúdo, não poste aleatoriamente. Pilar 1 — Educação: explique como o tratamento funciona, mitos e dúvidas frequentes. Pilar 2 — Prova social: resultados reais, depoimentos, bastidores de atendimento. Pilar 3 — Humanização: quem é você, sua rotina, o que te motivou a trabalhar com isso.",
      "Reels de antes/depois com narração são o formato de maior alcance. Não publique só a imagem — grave um áudio explicando o que foi feito, quantas sessões, qual o protocolo. Isso educa e vende ao mesmo tempo, e o algoritmo distribui muito mais do que posts estáticos.",
      "Stories diários com CTA claro no final. Mostre o dia a dia, bastidores, receba perguntas nas caixinhas. No último Story do dia, sempre um convite direto: \"Quer agendar sua avaliação? Manda uma mensagem aqui.\"",
      "Responda todos os comentários e DMs nas primeiras 2 horas. O algoritmo premia engajamento rápido. Além disso, cada comentário respondido é uma conversa de venda em potencial — trate como tal.",
      "Crie uma sequência de antecipação de 7 dias para qualquer novidade. Antes de revelar o novo equipamento: Stories de \"está chegando algo\", enquetes sobre as principais dores, contagem regressiva. Isso gera audiência aquecida antes do lançamento e aumenta o alcance do post de revelação."
    ],
    scripts: [
      { title: "Abertura de Reel — primeiros 3 segundos", text: "Você sabe por que a maioria dos tratamentos não funciona sozinho? — Pausa — Responde a pergunta. Prender a atenção nos primeiros 3 segundos é o único objetivo da abertura. Use pergunta, curiosidade ou afirmação que gere discordância imediata." },
      { title: "Story de conversão — último do dia", text: "Se você acompanha aqui há um tempo e ainda não veio conhecer nossa clínica, esse é o sinal. Agenda aberta essa semana — responde esse Story com 'quero' e eu te mando as opções de horário 👇" }
    ],
    cadence: [
      "Segunda — Reel educativo: dúvida frequente ou mito sobre o tratamento.",
      "Quarta — Post de resultado real com depoimento da cliente (com autorização).",
      "Sexta — Reel de bastidores ou humanização: quem é você, por que faz o que faz.",
      "Todo dia — 3 a 5 Stories: rotina, caixinha de perguntas, CTA de agendamento no final."
    ],
    metrics: "Taxa de engajamento saudável: 3–5%. Proporção de seguidores que viram DMs por mês: 5–10%. Tempo mínimo para ver resultado consistente: 30 dias.",
    errors: "Não poste só fotos de resultado sem contexto — explique o que foi feito, senão parece photoshop. Não use hashtags genéricas como #beleza ou #estetica — prefira nichadas como #drenagemmanual ou #radiofrequenciafacial. Não mude de estratégia em menos de 30 dias — consistência é a variável mais importante no orgânico."
  },
  {
    id: "prospeccao_ativa",
    label: "Prospecção Ativa",
    stats: "Velocidade: Resultado rápido | Esforço: Alto | ROI: Médio",
    actionPlan: [
      "Separe os leads em 3 listas antes de começar. Lista A: fez orçamento há menos de 30 dias. Lista B: entre 30–90 dias. Lista C: mais de 90 dias ou contato inicial que nunca retornou. Cada lista tem script e abordagem diferentes — não trate todas igual.",
      "Nunca reaborde com o mesmo argumento que não funcionou. Se a cliente sumiu depois do orçamento, ela teve uma objeção — preço, tempo, dúvida. Voltar com o mesmo texto é desperdiçar o contato. Aborde com um ângulo novo: novidade, resultado de cliente com perfil similar, ou mudança na oferta.",
      "Use a novidade do equipamento como gancho legítimo. \"Lembrei de você porque chegou um equipamento que resolve exatamente o que você queria tratar\" — isso abre a conversa sem parecer que você está cobrando a decisão antiga.",
      "Defina um bloco fixo de 30–45 minutos diários exclusivo para prospecção. Não misture com atendimento. Foco total nesse bloco, com meta de 10–15 contatos por dia. Sem volume consistente, não há resultado previsível.",
      "Documente cada contato com status e data de follow-up. Use uma planilha simples: nome, data do contato, resposta, próximo passo. Sem registro, você vai entrar em contato duas vezes com alguém ou nunca dar follow-up em quem estava quase fechando."
    ],
    scripts: [
      { title: "Reativação de orçamento — lista A (até 30 dias)", text: "Oi [nome]! Aqui é [nome] da [clínica]. Passando pra avisar que chegou um equipamento novo aqui que trabalha exatamente a [queixa que ela tinha]. Antes de abrir agenda pro público, queria oferecer pra quem já demonstrou interesse. Topa uma avaliação rápida essa semana?" },
      { title: "Contato frio que nunca respondeu", text: "Oi [nome], tudo bem? Sei que faz um tempo desde nosso último contato — não quero ser inconveniente, só queria compartilhar que temos uma novidade que pode ser exatamente o que você buscava. Se não for o momento, sem problema! 😊" }
    ],
    cadence: [
      "Bloco diário — 30–45 minutos fixos. Meta de 10–15 contatos. Começa sempre pela lista A, que tem maior probabilidade de conversão.",
      "Resposta rápida — Leads que respondem: mover para agendamento em menos de 2 horas.",
      "Dia 3 sem resposta — Um follow-up leve: \"Você viu minha mensagem de [dia]?\" — só uma vez.",
      "Sem resposta após o follow-up — Marcar para recontatar em 30 dias com novo ângulo. Não insistir além disso."
    ],
    metrics: "Taxa de resposta em lista fria: 10–20%. Taxa de conversão em lista quente (até 30 dias): 40–60%. Meta diária para resultado consistente: 15 contatos.",
    errors: "Não mande mensagem genérica para toda a lista — personalização é o que diferencia contato de spam. Não insista mais de 2 vezes no mesmo ciclo — respeitar o silêncio preserva a reputação da marca. Não prospecte sem script definido — improvisar no momento gera mensagens fracas e resultado inconsistente."
  }
];

export default function ROICalculator() {
  const [equipmentName, setEquipmentName] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");
  const [consultantName, setConsultantName] = useState<string>("");
  const [installmentValue, setInstallmentValue] = useState<number>(2500);
  const [sessionPrice, setSessionPrice] = useState<number>(300);
  const [sessionsPerDay, setSessionsPerDay] = useState<number>(4);
  const [daysWorked, setDaysWorked] = useState<number>(20);
  const [conversionRate, setConversionRate] = useState<number>(10);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);

  // PDF Export State
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const reportRef = useRef<HTMLDivElement>(null);

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
      
      const elementHeight = reportRef.current.offsetHeight;
      const pdfHeight = Math.max(elementHeight, 1123); // At least A4

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [794, pdfHeight]
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, 794, elementHeight);
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
                {CHANNELS.map((channel) => (
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

            {/* Conversations Needed Cards */}
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

            {/* Action Plan Screen */}
            {selectedChannels.length > 0 && (
              <div className="mt-6 bg-card border border-highlight/20 rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-highlight mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5" /> Plano de Ação Estratégico
                </h4>
                <div className="space-y-4">
                  {CHANNELS.filter(c => selectedChannels.includes(c.id)).map(channel => (
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
            )}
            </div>

            {/* INVISIBLE A4 PDF TEMPLATE */}
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

                  {/* Funil de Conversão */}
                  <div className="mt-8 bg-[#1E1E1E] border border-[#2A2A2A] rounded-2xl p-8">
                    <h4 className="text-[#D4AF37] text-lg font-bold mb-6 uppercase tracking-wider border-b border-[#2A2A2A] pb-2">Funil de Vendas e Conversão</h4>
                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Taxa de Conversão</p>
                        <p className="text-3xl font-bold text-white">{conversionRate}%</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Conversas Diárias</p>
                        <p className="text-3xl font-bold text-white">{conversationsNeeded} <span className="text-sm text-gray-500 font-normal">/dia</span></p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Conversas Mensais</p>
                        <p className="text-3xl font-bold text-white">{monthlyConversations} <span className="text-sm text-gray-500 font-normal">/mês</span></p>
                      </div>
                    </div>
                  </div>

                  {/* Plano de Ação PDF */}
                  {selectedChannels.length > 0 && (
                    <div className="mt-8 bg-[#1A1A1A] rounded-2xl p-8 border border-[#2A2A2A]">
                      <h4 className="text-[#D4AF37] text-lg font-bold mb-6 uppercase tracking-wider border-b border-[#2A2A2A] pb-2">Plano de Ação Estratégico Detalhado</h4>
                      <div className="space-y-12">
                        {CHANNELS.filter(c => selectedChannels.includes(c.id)).map(channel => (
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
