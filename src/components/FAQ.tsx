/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { FAQS } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header content */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 bg-yellow-400 border-2 border-indigo-950 text-indigo-950 px-4 py-1.5 rounded-full text-xs font-black font-display uppercase tracking-widest mb-4"
          >
            <HelpCircle className="w-3.5 h-3.5" /> Perguntas Frequentes
          </motion.div>
          <h2 className="text-3xl font-display font-black text-indigo-950 tracking-tighter sm:text-4xl">
            Tire Suas <span className="text-pink-600 italic">Dúvidas de Brinde</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-indigo-950/60 font-bold font-sans">
            Tudo o que você precisa saber sobre o processo de arte, prazos de entrega e formas de pagamento da Oxente Festeje.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`border-4 border-indigo-950 rounded-[28px] transition-all duration-300 ${
                  isOpen
                    ? 'bg-pink-100 shadow-[4px_4px_0_0_#be185d]'
                    : 'bg-white hover:bg-yellow-50'
                }`}
              >
                {/* Accordion header button */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[9px] font-black tracking-wider font-mono bg-indigo-950 text-white rounded-full px-2.5 py-1 uppercase border-2 border-indigo-950">
                      {faq.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-black text-indigo-950">
                      {faq.question}
                    </h3>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-pink-600 shrink-0 stroke-[3]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-indigo-950 shrink-0 stroke-[3]" />
                  )}
                </button>

                {/* Accordion content with animated presence */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-xs sm:text-sm text-indigo-950 font-bold font-sans leading-relaxed border-t-2 border-indigo-950/15 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still have questions hint banner */}
        <div className="mt-12 text-center bg-[#fefce8] rounded-[32px] p-6 border-4 border-indigo-950 shadow-[6px_6px_0_0_#4f46e5]">
          <p className="text-xs sm:text-sm text-indigo-950 font-black font-sans">
            Ainda ficou com alguma dúvida sobre a personalização? 🤔
          </p>
          <a
            href="https://wa.me/5581999999999?text=Ol%C3%A1%21+Estive+lendo+o+FAQ+do+site+mas+ainda+fiquei+com+algumas+d%C3%BAvidas.+Poderiam+me+ajudar%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-pink-600 hover:text-indigo-950 font-black text-xs sm:text-sm mt-2 transition-colors cursor-pointer group"
          >
            <span>Falar com nosso especialista de plantão</span>
            <span className="group-hover:translate-x-1 transition-transform font-black">→</span>
          </a>
        </div>

      </div>
    </section>
  );
}
