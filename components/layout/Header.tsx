import React from 'react';
import Image from 'next/image'
import Button from '@/components/ui/Button';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-shadow">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          ML Equipamentos
          {/* <Image src="/logo-pimenta.jpg" alt="Logo" width={40} height={40} /> */}
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <a href="#servicos" className="hover:text-highlight transition-colors">Serviços</a>
          <a href="#resultados" className="hover:text-highlight transition-colors">Resultados</a>
          <a href="#depoimentos" className="hover:text-highlight transition-colors">Depoimentos</a>
          <a href="#faq" className="hover:text-highlight transition-colors">FAQ</a>
        </nav>
        <div className="hidden sm:block">
          <Button text="Fale com um Especialista" url="#contato" />
        </div>
      </div>
    </header>
  );
}
