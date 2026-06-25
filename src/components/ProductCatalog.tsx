/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { PRODUCTS } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Star, Filter, Heart, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { EventCategory, Product } from '../types';

interface ProductCatalogProps {
  onSelectProduct: (productId: string) => void;
}

export default function ProductCatalog({ onSelectProduct }: ProductCatalogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<EventCategory | 'todos'>('todos');
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  // Category list filter buttons
  const categoriesList: Array<{ id: EventCategory | 'todos'; label: string }> = [
    { id: 'todos', label: 'Todos os Brindes' },
    { id: 'infantil', label: 'Infantil / Aniversários' },
    { id: 'casamento', label: 'Casamentos & 15 Anos' },
    { id: 'corporativo', label: 'Eventos Corporativos' },
    { id: 'formatura', label: 'Formaturas & Festas' },
  ];

  // Filtering logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.features.some((f) => f.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = activeCategory === 'todos' || product.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  const handleCustomizeClick = (id: string) => {
    onSelectProduct(id);
    // Scroll to simulator section
    const element = document.getElementById('simulador-visual');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="produtos">
      {/* Background accents */}
      <div className="absolute w-36 h-36 bg-yellow-400 rounded-full opacity-20 -top-10 left-[5%] blur-xl pointer-events-none" />
      <div className="absolute w-44 h-44 bg-pink-500 rounded-full opacity-10 bottom-10 right-[5%] blur-xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header content */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 bg-yellow-400 border-2 border-indigo-950 text-indigo-950 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5 animate-spin text-pink-600" /> Catálogo Festivo
            </div>
            <h2 className="text-4xl font-display font-black text-indigo-950 tracking-tighter sm:text-5xl">
              Nossa Coleção de <span className="text-pink-600 italic">Mimos e Brindes</span>
            </h2>
            <p className="mt-3 text-base text-indigo-900/80 font-bold leading-relaxed">
              Cada brinde é desenvolvido com materiais premium e estampas feitas para durar a vida inteira. Escolha o seu e comece a festejar!
            </p>
          </div>

          {/* Search bar inside catalog */}
          <div className="relative w-full lg:w-80">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-indigo-950" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar brinde (ex: Copo...)"
              className="w-full pl-10 pr-4 py-3 bg-white hover:bg-yellow-50 focus:bg-white border-4 border-indigo-950 focus:outline-none rounded-2xl text-sm transition-all text-indigo-950 font-black placeholder-indigo-950/50"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-10 border-b-2 border-indigo-950/10 pb-5 overflow-x-auto whitespace-nowrap scrollbar-none">
          {categoriesList.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 border-2 border-indigo-950 ${
                activeCategory === cat.id
                  ? 'bg-pink-600 text-white shadow-[0_4px_0_0_#be185d]'
                  : 'bg-white text-indigo-950 hover:bg-yellow-100'
              }`}
            >
              {activeCategory === cat.id && <Filter className="w-3.5 h-3.5" />}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Zero Results fallback state */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-yellow-400/40 rounded-[40px] border-4 border-dashed border-indigo-950 max-w-xl mx-auto p-8">
            <span className="text-4xl">🏜️</span>
            <h3 className="text-xl font-display font-black text-indigo-950 mt-3">Nenhum brinde encontrado</h3>
            <p className="text-sm font-semibold text-indigo-950/80 mt-1.5 px-4 leading-relaxed">
              Não achou o que procurava? Fale com a gente no WhatsApp! Nós personalizamos quase QUALQUER material de lembrancinha sob encomenda!
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('todos');
              }}
              className="mt-5 px-6 py-3 bg-pink-600 text-white font-black text-xs uppercase tracking-wider rounded-full border-2 border-indigo-950 shadow-[0_4px_0_0_#be185d] hover:translate-y-0.5 transition-all cursor-pointer"
            >
              Mostrar todos os brindes
            </button>
          </div>
        )}

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((p) => {
              const isHovered = hoveredCardId === p.id;
              
              // Custom local backgrounds based on the search seed to simulate colorful high quality illustration placeholders
              const productColorsMap: Record<string, string> = {
                'copo-long-drink': 'from-pink-400 to-rose-500',
                'taca-gin': 'from-purple-400 to-indigo-500',
                'ecobag-algodao': 'from-amber-100 to-orange-200 text-amber-900',
                'caneca-aluminio': 'from-blue-400 to-slate-500',
                'squeeze-esporte': 'from-emerald-400 to-teal-500',
                'necessaire-slim': 'from-fuchsia-300 to-pink-400',
                'kit-colorir': 'from-yellow-300 to-orange-400',
                'chaveiro-metal': 'from-zinc-300 to-zinc-500',
              };
              
              const gradColor = productColorsMap[p.id] || 'from-orange-400 to-pink-500';

              return (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  onMouseEnter={() => setHoveredCardId(p.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  className="bg-white rounded-[40px] border-4 border-indigo-950 shadow-[6px_6px_0_0_rgba(79,70,229,0.15)] hover:shadow-[10px_10px_0_0_rgba(79,70,229,0.25)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden relative group"
                >
                  {/* Visual card thumbnail header with vibrant gradient background representing the product mockup */}
                  <div className={`h-48 bg-gradient-to-tr ${gradColor} relative flex items-center justify-center p-6 text-white border-b-4 border-indigo-950 overflow-hidden`}>
                    
                    {/* Circle visual backing decoration */}
                    <div className="absolute w-36 h-36 rounded-full bg-white/10 blur-xl" />

                    {/* Popular indicator badge */}
                    {p.isPopular && (
                      <span className="absolute top-3 left-3 bg-yellow-400 text-indigo-950 font-display text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm z-10 flex items-center gap-1 border-2 border-indigo-950">
                        🔥 Popular
                      </span>
                    )}

                    {/* Category icon description badge */}
                    <span className="absolute top-3 right-3 bg-indigo-950 text-white font-mono text-[8px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest z-10 border border-white">
                      {p.category}
                    </span>

                    {/* SVG / Styled visual placeholder instead of missing picsum images to avoid broken links */}
                    <div className="relative z-10 flex flex-col items-center select-none filter drop-shadow-lg">
                      {p.id === 'copo-long-drink' && (
                        <div className="w-10 h-20 bg-white/30 rounded-b-lg rounded-t-sm border-2 border-white/40 shadow-inner flex items-center justify-center">
                          <span className="text-[6px] font-black tracking-widest text-white/70 rotate-[-90deg]">LONG DRINK</span>
                        </div>
                      )}
                      {p.id === 'taca-gin' && (
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-12 bg-white/30 rounded-full border-2 border-white/40 shadow-inner" />
                          <div className="w-1 h-10 bg-white/40" />
                          <div className="w-10 h-1 bg-white/40 rounded-full" />
                        </div>
                      )}
                      {p.id === 'ecobag-algodao' && (
                        <div className="w-16 h-16 bg-[#e6dfcc] border-2 border-[#d9ceb4] rounded-sm flex items-center justify-center shadow-md relative">
                          <div className="absolute -top-3 w-8 h-4 border-2 border-[#d9ceb4] rounded-t-full border-b-0" />
                          <span className="text-[8px] text-[#5e533c] font-bold uppercase font-display">COTTON</span>
                        </div>
                      )}
                      {p.id === 'caneca-aluminio' && (
                        <div className="flex items-center gap-1 mr-4">
                          <div className="w-14 h-16 bg-slate-300 border-2 border-white/50 rounded-md relative shadow-md">
                            <div className="absolute inset-y-0 right-1 w-2 bg-white/20" />
                          </div>
                          <div className="w-4 h-10 border-4 border-slate-300 rounded-r-lg -ml-1.5" />
                        </div>
                      )}
                      {p.id === 'squeeze-esporte' && (
                        <div className="w-10 h-22 bg-[#ffffff]/30 rounded-2xl border-2 border-white/40 shadow-md relative flex flex-col items-center">
                          <div className="w-5 h-2 bg-slate-800 rounded-t-sm" />
                          <div className="w-2 h-1 bg-red-500 rounded-t-sm" />
                        </div>
                      )}
                      {p.id === 'necessaire-slim' && (
                        <div className="w-22 h-12 bg-pink-100 border-2 border-white/50 rounded-xl relative shadow-md flex items-center justify-center">
                          <div className="absolute top-0 inset-x-0 h-1 bg-pink-600 rounded-t-xl" />
                          <span className="text-[8px] text-pink-700 font-bold uppercase tracking-wider">NECESSAIRE</span>
                        </div>
                      )}
                      {p.id === 'kit-colorir' && (
                        <div className="w-14 h-18 bg-white border-2 border-gray-200 rounded-sm p-1.5 shadow-md flex flex-col justify-between">
                          <div className="h-1 w-full bg-yellow-400" />
                          <div className="h-1 w-full bg-blue-400" />
                          <div className="h-1 w-full bg-green-400" />
                          <div className="flex gap-0.5 justify-center mt-2">
                            <div className="w-1 h-4 bg-orange-500" />
                            <div className="w-1 h-4 bg-teal-500" />
                          </div>
                        </div>
                      )}
                      {p.id === 'chaveiro-metal' && (
                        <div className="flex flex-col items-center">
                          <div className="w-5 h-5 rounded-full border-2 border-white/40" />
                          <div className="w-1 h-3 bg-white/40" />
                          <div className="w-10 h-6 bg-slate-200 border border-white rounded-md shadow-md" />
                        </div>
                      )}
                    </div>

                    {/* Gradient bottom transition fade */}
                    <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  </div>

                  {/* Card description details */}
                  <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                    <div>
                      {/* Product Name */}
                      <h3 className="font-display font-black text-indigo-950 text-md tracking-tight group-hover:text-pink-600 transition-colors">
                        {p.name}
                      </h3>

                      {/* Stars & rating count */}
                      <div className="flex items-center gap-1 mt-1.5 text-xs text-amber-500 font-mono">
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 fill-current ${
                                i < Math.floor(p.rating) ? 'text-amber-400' : 'text-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-black text-indigo-950 ml-1">{p.rating.toFixed(1)}</span>
                        <span className="text-gray-400 font-bold">({p.reviewsCount})</span>
                      </div>

                      {/* Brief description text */}
                      <p className="text-xs text-indigo-900/80 mt-2.5 leading-relaxed font-semibold font-sans line-clamp-2">
                        {p.description}
                      </p>

                      {/* Bullet highlights */}
                      <div className="mt-4 space-y-1.5">
                        {p.features.slice(0, 2).map((feat, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-[11px] text-indigo-950 font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100">
                      {/* Bottom Info & CTAs */}
                      <div className="flex justify-between items-baseline mb-3.5">
                        <div>
                          <span className="text-[10px] text-indigo-950/50 block uppercase font-mono font-black">A PARTIR DE</span>
                          <span className="text-lg font-mono font-black text-indigo-950">
                            R$ {p.basePrice.toFixed(2).replace('.', ',')}
                            <small className="text-xs font-bold text-indigo-950/60">/un</small>
                          </span>
                        </div>
                        <span className="text-[11px] bg-yellow-400/50 px-2.5 py-1 rounded-full text-indigo-950 border border-indigo-950/20 font-black">
                          Mín. {p.minQuantity} un.
                        </span>
                      </div>

                      {/* Click to custom design */}
                      <button
                        onClick={() => handleCustomizeClick(p.id)}
                        className="w-full py-2.5 bg-yellow-400 hover:bg-pink-600 hover:text-white text-indigo-950 font-black rounded-2xl text-xs transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer border-2 border-indigo-950 shadow-[0_3px_0_0_#4f46e5] hover:shadow-[0_1px_0_0_#be185d]"
                      >
                        <span>Simular Brinde</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Brand visual promise section banner */}
        <div className="mt-20 bg-yellow-400 rounded-[40px] p-8 sm:p-12 border-4 border-indigo-950 shadow-[6px_6px_0_0_rgba(190,24,93,1)] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h4 className="text-2xl font-display font-black text-indigo-950 tracking-tight">
              Precisa de outra quantidade ou de um brinde específico?
            </h4>
            <p className="mt-2 text-sm text-indigo-950 font-semibold leading-relaxed">
              Não se preocupe! Nós temos parceiros fornecedores de diversos insumos. Criamos chaveiros, topos de bolo, ecobags sob medida, taças com foil metalizado e kits festa prontos. Fale com nossa equipe!
            </p>
          </div>
          <a
            href="https://wa.me/5581999999999?text=Ol%C3%A1%21+Gostaria+de+saber+se+voc%C3%AAs+fazem+um+modelo+espec%C3%ADfico+de+brinde+ou+brindes+em+outra+quantidade%21"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4.5 bg-pink-600 text-white font-black text-md uppercase rounded-3xl border-2 border-indigo-950 shadow-[0_6px_0_0_#be185d] hover:translate-y-0.5 transition-all shrink-0 cursor-pointer"
          >
            Falar no WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
