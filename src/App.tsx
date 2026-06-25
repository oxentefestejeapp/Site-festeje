/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Header from './components/Header';
import BalloonOverlay from './components/BalloonOverlay';
import ProductCatalog from './components/ProductCatalog';
import InteractivePreview from './components/InteractivePreview';
import BudgetSimulator from './components/BudgetSimulator';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { Sparkles, ArrowRight, Gift, Calendar, Sparkle, Heart, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [selectedProductId, setSelectedProductId] = useState('copo-long-drink');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased selection:bg-orange-500 selection:text-white overflow-x-hidden">
      
      {/* Sticky Header */}
      <Header />

      {/* Floating Celebrate / Balloons Overlay Trigger */}
      <BalloonOverlay />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-yellow-400 overflow-hidden border-b-8 border-indigo-950">
        {/* Floating Background Shapes (Balloons) */}
        <div className="absolute w-24 h-32 bg-pink-500 rounded-full opacity-60 -bottom-10 left-[10%] blur-sm animate-bounce pointer-events-none" style={{ animationDuration: '4s' }} />
        <div className="absolute w-20 h-28 bg-blue-500 rounded-full opacity-50 bottom-[20%] left-[25%] blur-md animate-pulse pointer-events-none" />
        <div className="absolute w-32 h-44 bg-orange-500 rounded-full opacity-40 -bottom-20 right-[15%] blur-sm pointer-events-none animate-bounce" style={{ animationDuration: '5s' }} />
        <div className="absolute w-16 h-20 bg-green-400 rounded-full opacity-60 top-[40%] right-[5%] blur-sm animate-pulse pointer-events-none" />
        
        {/* Abstract subtle grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000004_1px,transparent_1px),linear-gradient(to_bottom,#00000004_1px,transparent_1px)] bg-[size:32px_32px] opacity-70 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              
              {/* Joyful Accent Banner */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-white border-2 border-indigo-950 text-pink-600 px-4 py-2 rounded-full text-xs font-black font-display uppercase tracking-widest shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-pink-500 animate-spin" />
                <span>Oxe! Lembrancinhas Personalizadas Retadas de Lindas</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-[84px] leading-[0.9] font-display font-black tracking-tighter text-indigo-950"
              >
                Sua Festa com a{' '}
                <span className="text-pink-600 italic">
                  Energia e o Brilho
                </span>{' '}
                que Ela Merece!
              </motion.h1>

              {/* Supporting Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-lg md:text-xl text-indigo-950/90 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0"
              >
                Na <b>Oxente Festeje</b>, nós transformamos copos, taças de gin, canecas de chopp e ecobags em lembranças inesquecíveis. Crie sua estampa online, calcule preços com descontos e receba em qualquer lugar do Brasil! 🇧🇷
              </motion.p>

              {/* Calls to Action */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
              >
                <button
                  onClick={() => scrollToSection('produtos')}
                  className="w-full sm:w-auto px-10 py-5 bg-pink-600 text-white font-black text-lg border-2 border-indigo-950 rounded-3xl shadow-[0_8px_0_0_#be185d] hover:translate-y-1 hover:shadow-[0_4px_0_0_#be185d] transition-all uppercase flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>Ver Catálogo de Brindes</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </button>
                <button
                  onClick={() => scrollToSection('simulador-visual')}
                  className="w-full sm:w-auto px-10 py-5 bg-white border-4 border-indigo-950 text-indigo-950 font-black text-lg rounded-3xl shadow-md hover:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Gift className="w-5.5 h-5.5 text-pink-600" />
                  <span>Personalizar no Estúdio 3D</span>
                </button>
              </motion.div>

              {/* Trust Value Badges Grid */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t-2 border-indigo-950/20 max-w-3xl"
              >
                {[
                  { title: 'Arte Gratuita', desc: 'Criada por designers' },
                  { title: 'Envio Seguro', desc: 'Caixas hiper protegidas' },
                  { title: 'Desconto Progressivo', desc: 'Preço reduzido em atacado' },
                  { title: 'Qualidade Premium', desc: 'Materiais ultra resistentes' },
                ].map((item, i) => (
                  <div key={i} className="text-left space-y-1 bg-white p-3.5 rounded-2xl border-2 border-indigo-950 shadow-sm">
                    <span className="text-xs font-black text-indigo-950 block font-display">✨ {item.title}</span>
                    <span className="text-[10px] text-indigo-900/70 font-bold block font-sans leading-none">{item.desc}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Interactive Hero Card (5 cols) */}
            <div className="lg:col-span-5 relative flex justify-center">
              {/* Ambient Glowing Backlight */}
              <div className="absolute inset-0 bg-pink-500/20 rounded-[40px] blur-3xl pointer-events-none" />

              {/* Playful Floating Elements Mockup Container */}
              <motion.div
                initial={{ rotate: 3, scale: 0.95, opacity: 0 }}
                animate={{ rotate: -2, scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 50, delay: 0.2 }}
                className="bg-white rounded-[40px] shadow-2xl p-8 border-4 border-indigo-950 border-b-8 border-r-8 max-w-sm w-full relative overflow-hidden"
              >
                {/* Micro branding stamp */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-pink-500 border border-indigo-950" />
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500 border border-indigo-950" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 border border-indigo-950" />
                  </div>
                  <span className="text-[9px] font-black font-mono tracking-widest text-indigo-950 bg-yellow-400 border-2 border-indigo-950 px-2.5 py-0.5 rounded-md">
                    ESTILO OXENTE
                  </span>
                </div>

                {/* Main visual stack illustration of gorgeous stacked party cups */}
                <div className="relative h-56 flex items-center justify-center my-6">
                  {/* Back Cup (Neon Teal) */}
                  <div className="absolute -translate-x-8 -rotate-12 w-20 h-36 bg-[#00FFFF] rounded-b-lg rounded-t-sm shadow-md clip-path-cup border-2 border-indigo-950">
                    <div className="absolute inset-y-0 left-2 w-1.5 bg-white/10" />
                  </div>
                  {/* Side Cup (Orange) */}
                  <div className="absolute translate-x-8 rotate-12 w-20 h-36 bg-[#FF8C00] rounded-b-lg rounded-t-sm shadow-md clip-path-cup border-2 border-indigo-950">
                    <div className="absolute inset-y-0 left-2 w-1.5 bg-white/10" />
                  </div>
                  {/* Front Cup (Neon Pink) */}
                  <div className="absolute z-10 w-24 h-40 bg-[#FF1493] rounded-b-xl rounded-t-md shadow-lg clip-path-cup border-4 border-indigo-950 flex flex-col items-center justify-center text-white">
                    <div className="absolute inset-y-0 left-3 w-2 bg-white/20" />
                    <div className="flex flex-col items-center justify-center text-center p-1 font-display">
                      <Sparkle className="w-6 h-6 text-yellow-300 animate-pulse fill-current mb-1" />
                      <span className="text-[10px] font-black tracking-widest uppercase text-indigo-950 bg-white px-1 py-0.5 rounded rotate-3">OXENTE</span>
                      <span className="text-[7px] font-black tracking-widest uppercase font-mono mt-1 text-white">FESTEJE</span>
                    </div>
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <h3 className="font-display font-black text-xl text-indigo-950">
                    Kits Completos
                  </h3>
                  <p className="text-xs text-indigo-950/80 font-bold font-sans px-4">
                    Adicione copos long drink, taças de gin elegantes e ecobags no mesmo pedido com descontos especiais!
                  </p>
                </div>

                {/* Interactive Action Hook */}
                <div className="mt-6 pt-5 border-t-2 border-indigo-950 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-indigo-900/60 block uppercase font-mono font-black">Simule Agora</span>
                    <span className="text-xs font-black text-indigo-950 block font-display">Personalização Online</span>
                  </div>
                  <button
                    onClick={() => scrollToSection('simulador-visual')}
                    className="p-3 bg-pink-600 hover:bg-pink-700 text-white rounded-2xl border-2 border-indigo-950 shadow-[0_4px_0_0_#be185d] hover:translate-y-0.5 hover:shadow-[0_2px_0_0_#be185d] transition-all cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </div>

          </div>
          
          {/* Scroll Down Hint Anchor */}
          <div className="flex justify-center pt-16">
            <button
              onClick={() => scrollToSection('produtos')}
              className="text-gray-400 hover:text-gray-900 transition-colors flex flex-col items-center gap-1.5 cursor-pointer"
            >
              <span className="text-xs font-bold font-mono tracking-widest">VER PRODUTOS</span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ChevronDown className="w-4 h-4 text-orange-500" />
              </motion.div>
            </button>
          </div>
        </div>
      </section>

      {/* Product Catalog Section */}
      <ProductCatalog onSelectProduct={setSelectedProductId} />

      {/* Interactive visualizer designer section */}
      <InteractivePreview selectedProductId={selectedProductId} onSelectProduct={setSelectedProductId} />

      {/* Pricing simulator and leads section */}
      <BudgetSimulator selectedProductId={selectedProductId} onSelectProduct={setSelectedProductId} />

      {/* Reviews and testimonials section */}
      <Reviews />

      {/* FAQS Accordion section */}
      <FAQ />

      {/* Footer Details */}
      <Footer />

    </div>
  );
}
