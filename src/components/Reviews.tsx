/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TESTIMONIALS } from '../data';
import { motion } from 'motion/react';
import { Star, MessageSquare, Heart, Quote } from 'lucide-react';

export default function Reviews() {
  return (
    <section className="py-24 bg-[#fefce8] relative overflow-hidden" id="depoimentos">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-pink-200/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header content */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 bg-yellow-400 border-2 border-indigo-950 text-indigo-950 px-4 py-1.5 rounded-full text-xs font-black font-display uppercase tracking-widest mb-4"
          >
            <Heart className="w-3.5 h-3.5 fill-current text-pink-600 animate-pulse" /> CLIENTES SATISFEITOS
          </motion.div>
          <h2 className="text-4xl font-display font-black text-indigo-950 tracking-tighter sm:text-5xl">
            Quem Amou, <span className="text-pink-600 italic">Espalhou a Alegria!</span>
          </h2>
          <p className="mt-4 text-lg text-indigo-950/80 font-bold font-sans">
            Não somos apenas nós que dizemos! Veja os depoimentos retados de quem confiou na Oxente Festeje para deixar suas celebrações ainda mais inesquecíveis.
          </p>
        </div>

        {/* Testimonials Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="bg-white rounded-[40px] p-6 border-4 border-indigo-950 shadow-[6px_6px_0_0_rgba(190,24,93,1)] flex flex-col justify-between relative group"
            >
              {/* Giant quote sign background decoration */}
              <Quote className="absolute top-6 right-6 w-12 h-12 text-gray-100 group-hover:text-pink-50 transition-colors pointer-events-none" />

              <div>
                {/* Event type badge */}
                <span className="inline-block text-[9px] font-black bg-yellow-400 text-indigo-950 border-2 border-indigo-950 px-2.5 py-1 rounded-full uppercase tracking-wider mb-4">
                  🎉 {t.eventType}
                </span>

                {/* Rating */}
                <div className="flex gap-0.5 text-amber-400 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Testimonial text content */}
                <p className="text-xs sm:text-sm text-indigo-950 font-bold font-sans leading-relaxed italic mb-6">
                  "{t.text}"
                </p>
              </div>

              {/* Author profile */}
              <div className="flex items-center gap-3 pt-4 border-t-2 border-indigo-950/10">
                {/* Initials avatar placeholder */}
                <div className="w-10 h-10 rounded-full bg-pink-600 border-2 border-indigo-950 text-white font-black flex items-center justify-center text-xs shadow-sm uppercase font-display">
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="text-xs font-black text-indigo-950">{t.name}</h4>
                  <span className="text-[10px] text-indigo-950/60 font-bold block">{t.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Proof / Call to Instagram */}
        <div className="mt-16 bg-white rounded-[40px] p-6 sm:p-10 border-4 border-indigo-950 shadow-[8px_8px_0_0_rgba(79,70,229,1)] flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div className="flex flex-col lg:flex-row items-center gap-5">
            <div className="w-14 h-14 rounded-3xl bg-pink-100 text-pink-600 flex items-center justify-center shrink-0 border-2 border-indigo-950">
              <MessageSquare className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-display font-black text-indigo-950">Mais de 1.500 festas personalizadas!</h3>
              <p className="text-xs text-indigo-950/60 font-bold mt-1 font-sans">
                Acompanhe fotos reais de clientes, vídeos de produção e bastidores diariamente no nosso Instagram.
              </p>
            </div>
          </div>
          <a
            href="https://www.instagram.com/oxentefesteje"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-pink-600 text-white font-black rounded-3xl border-2 border-indigo-950 shadow-[0_4px_0_0_#be185d] hover:translate-y-0.5 transition-all text-xs flex items-center gap-2 cursor-pointer uppercase tracking-wider"
          >
            Siga-nos @oxentefesteje
          </a>
        </div>

      </div>
    </section>
  );
}
