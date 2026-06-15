'use client'

import { motion } from "framer-motion";
import Image from "next/image";
import { Quote } from "lucide-react";
import { TestimonialItem } from "@/types/types";
import { YouTubeEmbed } from '@next/third-parties/google';

interface TestimonialCardProps {
    card: TestimonialItem;
    index: number;
}

export default function TestimonialCard({ card, index }: TestimonialCardProps) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="flex flex-col bg-card rounded-2xl shadow-xl shadow-shadow/50 border border-shadow overflow-hidden group h-full"
        >
            {card.videoUrl ? (
                <div className="relative w-full aspect-[9/16] md:aspect-video bg-shadow overflow-hidden">
                    {card.videoUrl.includes('youtube.com') || card.videoUrl.includes('youtu.be') ? (
                        <YouTubeEmbed 
                            videoid={card.videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/)![1]} 
                            playlabel={`Depoimento de ${card.title}`}
                            params="rel=0"
                        />
                    ) : (
                        <video 
                            src={card.videoUrl} 
                            controls 
                            className="w-full h-full object-cover"
                            preload="metadata"
                            playsInline
                        />
                    )}
                </div>
            ) : (
                <div className="relative w-full aspect-video bg-shadow flex items-center justify-center overflow-hidden">
                    {card.patientImgUrl ? (
                        <Image 
                            src={card.patientImgUrl} 
                            alt={card.title} 
                            fill 
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-title/30 bg-shadow w-full">
                            <span className="font-serif">Sem Vídeo/Foto</span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-title/10" />
                </div>
            )}
            
            <div className="flex flex-col p-8 gap-6 flex-grow justify-between">
                <div>
                    <Quote className="text-highlight/30 mb-4" size={32} />
                    <p className="text-base md:text-lg text-title/80 font-serif italic leading-relaxed">
                        "Um atendimento excepcional e resultados que superaram minhas expectativas. Recomendo de olhos fechados."
                    </p>
                </div>
                

            </div>
        </motion.div>
    );
}
