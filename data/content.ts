import { HubContent } from "@/types/types";

const placeholderEquipamentoMock = {
    hero: {
        title: "[Nome do Equipamento]",
        subtitle: "A tecnologia que vai elevar o nível dos tratamentos na sua clínica e atrair clientes de alto padrão.",
        buttonText: "Falar com Consultor",
        buttonUrl: "#contato",
        imgUrl: "" 
    },
    pain: {
        title: "Por que atualizar a tecnologia da sua clínica?",
        cardContent: [
            {
                id: 1,
                title: "Concorrência Desleal",
                desc: "Clínicas com tecnologias ultrapassadas perdem pacientes para concorrentes que oferecem tratamentos mais rápidos e confortáveis.",
                imgUrl: ""
            },
            {
                id: 2,
                title: "Ticket Médio Baixo",
                desc: "Sem equipamentos de alto valor percebido, fica difícil justificar o aumento no preço dos seus protocolos.",
                imgUrl: ""
            },
            {
                id: 3,
                title: "Resultados Inconsistentes",
                desc: "Equipamentos antigos exigem mais sessões e nem sempre entregam o resultado prometido, gerando insatisfação.",
                imgUrl: ""
            },
            {
                id: 4,
                title: "Manutenção Constante",
                desc: "Aparelhos obsoletos passam mais tempo na assistência técnica do que gerando lucro para sua empresa.",
                imgUrl: ""
            }
        ]
    },
    solution: {
        cardContent: [
            {
                id: 1,
                title: "A Revolução na Estética Avançada",
                description: "Integre o que há de mais moderno no mercado e ofereça resultados visíveis desde a primeira sessão.",
                solutionTitle: "Alta Rentabilidade",
                solutionDescription: "Retorno sobre o investimento (ROI) acelerado devido à alta demanda por esta tecnologia.",
                imgUrl: ""
            },
            {
                id: 2,
                solutionTitle: "Treinamento VIP",
                solutionDescription: "Nossa equipe fornece treinamento completo para que sua equipe extraia o máximo do equipamento.",
                imgUrl: ""
            },
            {
                id: 3,
                solutionTitle: "Tecnologia Segura",
                solutionDescription: "Equipamento certificado, com parâmetros precisos que garantem a segurança do paciente.",
                imgUrl: ""
            }
        ]
    },
    benefits: {
        title: "Vantagens Exclusivas",
        subtitle: "Destaque-se no mercado oferecendo tratamentos premium.",
        imgUrls: ["", "", ""]
    },
    testimonials: {
        title: "O que os donos de clínica dizem",
        cardContent: [
            { id: 1, title: "Dra. Ana Silva", patientImgUrl: "", videoUrl: "https://www.youtube.com/embed/tgbNymZ7vqY" },
            { id: 2, title: "Dr. Marcos T.", patientImgUrl: "", videoUrl: "https://www.youtube.com/embed/tgbNymZ7vqY" },
            { id: 3, title: "Clínica Revitalize", patientImgUrl: "", videoUrl: "https://www.youtube.com/embed/tgbNymZ7vqY" },
        ]
    },
    faq: {
        title: "Dúvidas Frequentes",
        cardContent: [
            { id: 1, question: "Qual o prazo de garantia do equipamento?", answer: "Oferecemos garantia estendida e suporte técnico ágil." },
            { id: 2, question: "A Pimenta Estética fornece treinamento?", answer: "Sim. Todo equipamento acompanha treinamento presencial ou online para sua equipe." },
            { id: 3, question: "Quais as formas de pagamento?", answer: "Trabalhamos com financiamento, consórcio e parcelamento facilitado. Consulte nossos especialistas." },
            { id: 4, question: "Qual o prazo de entrega?", answer: "Temos equipamentos a pronta entrega e opções sob encomenda, consulte a disponibilidade." }
        ],
        moreQuestions: {
            title: "Ainda tem alguma dúvida?",
            cta: "Fale com um dos nossos consultores de negócios.",
            contactButton: "Chamar no WhatsApp"
        }
    },
    leadForm: {
        title: "Dê o próximo passo na evolução da sua clínica",
        subtitle: "Preencha seus dados para receber uma proposta personalizada deste equipamento.",
        locationUrl: ""
    },
    cta: {
        title: "Transforme o faturamento da sua clínica hoje mesmo.",
        imgUrl: ""
    },
    footer: {
        logoUrl: "/logo-pimenta.jpg",
        legalConsent: "© 2026 Pimenta Estética Multimarcas. Todos os direitos reservados."
    }
};

export const campaigns = {
    "placeholder_equipamento": placeholderEquipamentoMock
};

export const hubContent: HubContent = {
    hero: {
        title: "Equipando as Melhores Clínicas do Brasil",
        subtitle: "Tecnologia high-ticket, treinamento de excelência e suporte técnico premium. A Pimenta Estética Multimarcas é o seu parceiro estratégico para escalar resultados.",
        imgUrl: "/hero-hub-banner.png"
    },
    about: {
        title: "Sobre a Pimenta Estética Multimarcas",
        description: "Somos especialistas na distribuição dos melhores e mais modernos equipamentos de estética avançada e médica. Nosso compromisso vai além da venda: entregamos conhecimento, protocolos validados e assistência técnica para que a sua clínica alcance a alta performance.",
        aestheticianName: "Pimenta Estética",
        imgUrl: ""
    },
    services: [
        {
            id: "lasers",
            slug: "lasers", // Deve corresponder a uma chave em 'campaigns' quando houver
            title: "Lasers de Alta Potência",
            description: "Tecnologias para depilação definitiva, remoção de tatuagem e rejuvenescimento.",
            imgUrl: "/omerlaser.jpeg"
        },
        {
            id: "radiofrequencia",
            slug: "radiofrequencia",
            title: "Radiofrequência Fracionada",
            description: "Equipamentos de ponta para tratamento de flacidez, estrias e cicatrizes.",
            imgUrl: "/radiofrequência.jpeg"
        },
        {
            id: "ultrassom",
            slug: "ultrassom",
            title: "Ultrassom Microfocado",
            description: "O padrão ouro em lifting não cirúrgico e contorno corporal.",
            imgUrl: "/ultrassom.jpeg"
        }
    ],
    results: {
        title: "Equipamentos em Destaque",
        subtitle: "As tecnologias mais cobiçadas do mercado, agora ao alcance da sua clínica.",
        imgUrls: ["", "", ""]
    },
    testimonials: {
        title: "Parceiros de Sucesso",
        cardContent: [
            { id: 1, title: "Dra. Fernanda L.", patientImgUrl: "", videoUrl: "https://www.youtube.com/embed/tgbNymZ7vqY" },
            { id: 2, title: "Dr. Ricardo G.", patientImgUrl: "", videoUrl: "https://www.youtube.com/embed/tgbNymZ7vqY" },
            { id: 3, title: "Clínica Bela Pele", patientImgUrl: "", videoUrl: "https://www.youtube.com/embed/tgbNymZ7vqY" },
        ]
    },
    faq: {
        title: "Dúvidas Frequentes",
        cardContent: [
            { id: 1, question: "Como funciona a assistência técnica?", answer: "Contamos com laboratório próprio e equipe técnica ágil para garantir que seu equipamento não fique parado." },
            { id: 2, question: "Vocês enviam para todo o Brasil?", answer: "Sim, realizamos o envio seguro para qualquer estado do território nacional." },
            { id: 3, question: "O treinamento está incluso na compra?", answer: "Sim. Oferecemos o treinamento de manuseio e protocolos de forma presencial ou online." },
            { id: 4, question: "Como faço para negociar um equipamento?", answer: "Basta clicar em qualquer botão do site e falar diretamente com um de nossos consultores via WhatsApp." }
        ],
        moreQuestions: {
            title: "Não encontrou sua dúvida?",
            cta: "Nossa equipe comercial está à disposição.",
            contactButton: "Chamar no WhatsApp"
        }
    }
};

export const whatsappLink = "https://wa.me/5561996095651";