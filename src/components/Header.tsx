/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Menu, X, Instagram, PhoneCall, Gift } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-yellow-400/90 backdrop-blur-md shadow-lg py-3 border-b-4 border-indigo-950'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 12 }}
              className="w-12 h-12 bg-pink-600 rounded-2xl flex items-center justify-center rotate-3 shadow-lg border-2 border-indigo-950"
            >
              <span className="text-white font-black text-2xl">O!</span>
            </motion.div>
            <div className="flex flex-col">
              <span className="text-2xl font-display font-black tracking-tighter text-indigo-950 uppercase leading-none">
                OXENTE <span className="text-pink-600">FESTEJE</span>
              </span>
              <span className="text-[10px] tracking-widest font-mono font-black text-indigo-900 mt-0.5 uppercase">Brindes de Luxo</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            {[
              { id: 'produtos', label: 'Nossos Brindes' },
              { id: 'simulador-visual', label: 'Simulador 3D' },
              { id: 'simulador-orcamento', label: 'Calcular Orçamento' },
              { id: 'depoimentos', label: 'Quem Amou' },
              { id: 'faq', label: 'Dúvidas' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-xs font-black text-indigo-950 uppercase tracking-widest hover:text-pink-600 hover:border-b-2 hover:border-pink-500 transition-all cursor-pointer py-1"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://www.instagram.com/oxentefesteje"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-black text-pink-600 bg-white hover:bg-pink-50 rounded-full border-2 border-indigo-950 shadow-sm transition-all cursor-pointer"
            >
              <Instagram className="w-4 h-4" />
              <span>@oxentefesteje</span>
            </a>
            <button
              onClick={() => scrollToSection('simulador-orcamento')}
              className="flex items-center gap-1.5 px-6 py-2.5 text-xs font-black text-white bg-indigo-950 hover:bg-indigo-900 rounded-full shadow-[0_4px_0_0_#be185d] hover:translate-y-0.5 hover:shadow-[0_2px_0_0_#be185d] transition-all uppercase tracking-widest cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Orçamento</span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border-2 border-indigo-950 text-indigo-950 bg-white hover:bg-yellow-100 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-yellow-400 border-t-2 border-indigo-950 mt-3 shadow-xl overflow-hidden absolute w-full left-0 z-30"
          >
            <div className="px-6 py-6 space-y-4 flex flex-col">
              {[
                { id: 'produtos', label: 'Nossos Brindes' },
                { id: 'simulador-visual', label: 'Simulador 3D' },
                { id: 'simulador-orcamento', label: 'Calcular Orçamento' },
                { id: 'depoimentos', label: 'Quem Amou' },
                { id: 'faq', label: 'Dúvidas' },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-left font-black text-indigo-950 uppercase tracking-wider hover:text-pink-600 transition-colors py-1.5 cursor-pointer text-sm"
                >
                  {link.label}
                </button>
              ))}

              <div className="pt-4 border-t border-indigo-950/20 space-y-3">
                <a
                  href="https://www.instagram.com/oxentefesteje"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 text-xs font-black text-pink-600 bg-white border-2 border-indigo-950 rounded-full cursor-pointer"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Siga @oxentefesteje</span>
                </a>
                <button
                  onClick={() => scrollToSection('simulador-orcamento')}
                  className="flex items-center justify-center gap-2 w-full py-3 text-xs font-black text-white bg-indigo-950 rounded-full shadow-md cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Pedir Orçamento</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
