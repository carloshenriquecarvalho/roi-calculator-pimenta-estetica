import { campaigns } from "@/data/content";
import { notFound } from "next/navigation";
import { Metadata } from "next";

import LandingHeader from "@/components/layout/LandingHeader";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/landing/Hero";
import Pain from "@/components/sections/landing/Pain";
import Solution from "@/components/sections/landing/Solution";
import Testimonials from "@/components/sections/landing/Testimonials";
import Faq from "@/components/sections/landing/Faq";
import LeadForm from "@/components/sections/landing/LeadForm";
import Cta from "@/components/sections/landing/Cta";

export async function generateMetadata({ params }: { params: Promise<{ campaign: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const data = campaigns[resolvedParams.campaign as keyof typeof campaigns];
    
    if (!data) return { title: 'Not Found' };
    
    return {
        title: `${data.hero.title} | ML Equipamentos`,
        description: data.hero.subtitle,
        openGraph: {
            title: data.hero.title,
            description: data.hero.subtitle,
            images: [data.hero.imgUrl],
        }
    }
}

export default async function LandingPage({params}: { params: Promise<{ campaign: string }>}) {
    const resolvedParams = await params;
    const slug = resolvedParams.campaign;

    const data = campaigns[slug as keyof typeof campaigns];

    if(!data) {
        notFound();
    }

    return (
        <div className="flex flex-col min-h-screen">
            <LandingHeader />
            <main className="flex-grow pt-20">
                <Hero {...data.hero} />
                <Solution cardContent={data.solution.cardContent} />
                <Testimonials {...data.testimonials} />
                <Faq {...data.faq} />
                <LeadForm {...data.leadForm} campaign={slug} />
                <Cta {...data.cta} />
            </main>
            <Footer />
        </div>
    )
}