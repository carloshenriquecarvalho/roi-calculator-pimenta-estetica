import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-highlight rounded-full flex items-center justify-center">
              <span className="text-white font-serif font-bold">ME</span>
            </div>
            <span className="font-serif font-semibold text-xl">ML Equipamentos</span>
          </div>
          <p className="text-gray-300 max-w-sm mb-6">
            Especialistas em equipamentos que elevam os procedimentos da sua clínica.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-300 hover:text-highlight transition-colors">
              <Phone size={24} />
            </a>
            <a href="#" className="text-gray-300 hover:text-highlight transition-colors">
              <Mail size={24} />
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="font-serif text-lg mb-4 text-highlight">Links Rápidos</h4>
          <ul className="space-y-2 text-gray-300">
            <li><Link href="/#servicos" className="hover:text-white transition-colors">Nossos Serviços</Link></li>
            <li><Link href="/#resultados" className="hover:text-white transition-colors">Galeria de Resultados</Link></li>
            <li><Link href="/#depoimentos" className="hover:text-white transition-colors">O que dizem</Link></li>
            <li><Link href="/#faq" className="hover:text-white transition-colors">Dúvidas Frequentes</Link></li>
            <li><Link href="/politica-de-privacidade" className="hover:text-white transition-colors">Política de Privacidade</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg mb-4 text-highlight">Contato</h4>
          <ul className="space-y-4 text-gray-300">
            <li className="flex gap-2">
              <MapPin size={20} className="shrink-0 text-highlight" />
              <span>Cm. Norte, 9999 - Taguatinga<br/>Brasília, DF</span>
            </li>
            <li>
              <span>WhatsApp: (61) 99999-9999</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4 text-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} ML Pimentel - CNPJ: 32.617.140/0001-08. Todos os direitos reservados.</p>
        <Link href="/politica-de-privacidade" className="hover:text-white transition-colors underline decoration-highlight/40 decoration-2 underline-offset-4">
          Política de Privacidade
        </Link>
      </div>
    </footer>
  );
}
