import { ChannelData } from "../types/roi.types";

export const CHANNELS_DATA: ChannelData[] = [
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
