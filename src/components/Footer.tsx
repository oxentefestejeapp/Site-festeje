/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Gift, Instagram, MapPin, Mail, Phone, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-indigo-950 text-white/80 py-16 border-t-4 border-indigo-950" id="rodape">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b-2 border-white/10 pb-12">
          {/* Logo Brand / Summary Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={handleScrollToTop}>
              <div className="w-10 h-10 rounded-2xl bg-yellow-400 flex items-center justify-center text-indigo-950 font-black border-2 border-indigo-950 shadow-[2px_2px_0_0_#be185d]">
                <Gift className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-lg font-display font-black tracking-tight text-white leading-none uppercase">
                OXENTE <span className="text-pink-500">FESTEJE</span>
              </span>
            </div>
            <p className="text-xs text-white/70 font-bold font-sans leading-relaxed max-w-sm">
              Especialistas em eternizar sorrisos e tornar momentos inesquecíveis! Criamos brindes personalizados de alta qualidade com a alegria vibrante e calorosa do nosso Nordeste.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/oxentefesteje"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white hover:bg-pink-600 hover:text-white transition-all flex items-center justify-center text-indigo-950 border-2 border-indigo-950 shadow-[2.5px_2.5px_0_0_#be185d] cursor-pointer font-black"
                title="Siga no Instagram"
              >
                <Instagram className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Quick links Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-yellow-400 uppercase tracking-widest font-mono">Navegação</h4>
            <ul className="space-y-2 text-xs font-bold text-white/90">
              {[
                { id: 'produtos', label: 'Coleção de Brindes' },
                { id: 'simulador-visual', label: 'Estúdio 3D Interativo' },
                { id: 'simulador-orcamento', label: 'Calcular Orçamento' },
                { id: 'depoimentos', label: 'Opiniões de Clientes' },
                { id: 'faq', label: 'Perguntas Frequentes' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      const el = document.getElementById(item.id);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-yellow-400 transition-colors cursor-pointer text-left focus:outline-none font-bold"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-black text-yellow-400 uppercase tracking-widest font-mono">Fale Conosco</h4>
            <ul className="space-y-2.5 text-xs font-bold text-white/90">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
                <span>Recife - PE | Enviamos com amor para todo o Brasil! 🇧🇷</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-pink-500 shrink-0" />
                <a href="https://wa.me/5581999999999" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">
                  (81) 99999-9999 (WhatsApp)
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-pink-500 shrink-0" />
                <a href="mailto:oxentefesteje@gmail.com" className="hover:text-yellow-400 transition-colors">
                  oxentefesteje@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom footer copyright details */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/50 font-mono uppercase tracking-wider font-black">
          <p>© {currentYear} Oxente Festeje. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            Feito com <Heart className="w-3 h-3 text-pink-500 fill-current animate-pulse" /> para festejar sua vida!
          </p>
        </div>

      </div>
    </footer>
  );
}
