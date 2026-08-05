export interface CardItem {
    id: number;
    title: string;
    desc: string;
    imgUrl: string;
}

export interface ButtonProps {
    text: string;
    url: string;
    variant?: "primary" | "outline";
}

export interface HeroProps {
    title: string;
    subtitle: string;
    buttonText: string;
    buttonUrl: string;
    imgUrl: string;
}

export interface PainCardProps {
    card: CardItem;
    index: number;
}

export interface PainProps {
    title: string;
    cardContent: CardItem[];
}

export interface SolutionItem {
    id: number;
    title?: string;
    description?: string;
    solutionTitle: string;
    solutionDescription: string;
    imgUrl: string;
}

export interface SolutionProps {
    cardContent: SolutionItem[];
}

export interface BenefitsProps {
    title: string;
    subtitle: string;
    imgUrls: string[];
}

export interface TestimonialItem {
    id: number;
    title: string;
    patientImgUrl: string;
    videoUrl: string;
}

export interface TestimonialsProps {
    title: string;
    cardContent: TestimonialItem[];
}

export interface FaqItem {
    id: number;
    question: string;
    answer: string;
}

export interface FaqProps {
    title: string;
    cardContent: FaqItem[];
    moreQuestions: {
        title: string;
        cta: string;
        contactButton: string;
    };
}

export interface LeadFormProps {
    title: string;
    subtitle: string;
    locationUrl?: string;
    campaign: string;
}

export interface CtaProps {
    title: string;
    imgUrl?: string;
}

export interface HubServiceItem {
    id: string;
    title: string;
    description: string;
    imgUrl: string;
    slug: string;
}

export interface HubHeroProps {
    title: string;
    subtitle: string;
    imgUrl: string;
}

export interface HubAboutProps {
    title: string;
    description: string;
    aestheticianName: string;
    imgUrl: string;
}

export interface HubContent {
    hero: HubHeroProps;
    about: HubAboutProps;
    services: HubServiceItem[];
    testimonials: TestimonialsProps;
    faq: FaqProps;
}

export interface FormButtonProps {
    campaign: string;
}