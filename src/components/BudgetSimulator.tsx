/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, FormEvent } from 'react';
import { PRODUCTS } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, MessageSquare, Check, Sparkles, Gift, Percent } from 'lucide-react';
import { EventCategory } from '../types';

interface BudgetSimulatorProps {
  selectedProductId?: string;
  onSelectProduct?: (productId: string) => void;
}

export default function BudgetSimulator({
  selectedProductId: propSelectedProductId,
  onSelectProduct,
}: BudgetSimulatorProps) {
  const [internalSelectedProductId, setInternalSelectedProductId] = useState(PRODUCTS[0].id);

  const selectedProductId = propSelectedProductId || internalSelectedProductId;
  const setSelectedProductId = onSelectProduct || setInternalSelectedProductId;

  const [eventType, setEventType] = useState<EventCategory | 'outro'>('infantil');
  const [quantity, setQuantity] = useState(100);
  const [hasLogo, setHasLogo] = useState<'yes' | 'no_need'>('no_need');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [eventDate, setEventDate] = useState('');

  const selectedProduct = useMemo(() => {
    const prod = PRODUCTS.find((p) => p.id === selectedProductId);
    // If quantity is lower than selected product's minimum, adjust quantity
    if (prod && quantity < prod.minQuantity) {
      setQuantity(prod.minQuantity);
    }
    return prod || PRODUCTS[0];
  }, [selectedProductId, quantity]);

  // Adjust quantity if the selected product changes and current quantity is too low
  const handleProductSelect = (id: string) => {
    setSelectedProductId(id);
    const prod = PRODUCTS.find((p) => p.id === id);
    if (prod && quantity < prod.minQuantity) {
      setQuantity(prod.minQuantity);
    }
  };

  // Dynamic calculations
  const { unitPrice, discountPercentage, originalTotal, totalEstimated, totalSaved } = useMemo(() => {
    const base = selectedProduct.basePrice;
    let discount = 0;
    
    // Volume discounts
    if (quantity >= 500) {
      discount = 20; // 20% discount for 500+ items
    } else if (quantity >= 250) {
      discount = 15; // 15% discount for 250+
    } else if (quantity >= 100) {
      discount = 10; // 10% discount for 100+
    }

    const calculatedUnitPrice = base * (1 - discount / 100);
    const origTotal = base * quantity;
    const finalTotal = calculatedUnitPrice * quantity;
    const saved = origTotal - finalTotal;

    return {
      unitPrice: calculatedUnitPrice,
      discountPercentage: discount,
      originalTotal: origTotal,
      totalEstimated: finalTotal,
      totalSaved: saved,
    };
  }, [selectedProduct, quantity]);

  const handleWhatsAppSend = (e: FormEvent) => {
    e.preventDefault();

    if (!clientName) {
      alert('Por favor, informe seu nome para que possamos te chamar de forma personalizada!');
      return;
    }

    const formattedPhone = clientPhone.replace(/\D/g, '');
    const dateStr = eventDate ? new Date(eventDate).toLocaleDateString('pt-BR') : 'Não informada';

    const text = `Olá, Oxente Festeje! 🎉
Estive no simulador do site e montei uma proposta de orçamento retada:

*DADOS DO PEDIDO:*
• *Brinde:* ${selectedProduct.name}
• *Quantidade:* ${quantity} unidades
• *Valor Estimado:* R$ ${totalEstimated.toFixed(2).replace('.', ',')} (R$ ${unitPrice.toFixed(2).replace('.', ',')}/un)
• *Desconto Aplicado:* ${discountPercentage}% (Economia de R$ ${totalSaved.toFixed(2).replace('.', ',')}!)

*DADOS DO CLIENTE:*
• *Nome:* ${clientName}
• *WhatsApp:* ${clientPhone}
• *Estilo do Evento:* ${eventType.toUpperCase()}
• *Data da Festa:* ${dateStr}
• *Precisa de Arte?* ${hasLogo === 'yes' ? 'Já tenho arte/logo vetorizada' : 'Quero que a Oxente crie de graça!'}

Gostaria de falar com o time para confirmar as cores, aprovar a arte e fechar o pedido!`;

    const whatsappUrl = `https://wa.me/5581999999999?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden" id="simulador-orcamento">
      {/* Confetti decorative stars */}
      <div className="absolute top-10 right-[5%] text-yellow-400 opacity-20 pointer-events-none">
        <Sparkles className="w-16 h-16 animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 bg-yellow-400 border-2 border-indigo-950 text-indigo-950 px-4 py-1.5 rounded-full text-xs font-black font-display uppercase tracking-widest mb-4"
          >
            <Calculator className="w-3.5 h-3.5" /> Sem Surpresas ou Segredos
          </motion.div>
          <h2 className="text-4xl font-display font-black text-indigo-950 tracking-tighter sm:text-5xl">
            Simulador de <span className="text-pink-600 italic">Orçamento Retado</span>
          </h2>
          <p className="mt-4 text-lg text-indigo-950/80 font-bold font-sans">
            Transparência total! Simule a quantidade ideal para o seu evento, veja os descontos progressivos e envie diretamente para o nosso WhatsApp para fechar.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Side (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-[40px] shadow-2xl border-4 border-indigo-950 p-6 sm:p-10 shadow-[8px_8px_0_0_rgba(190,24,93,0.15)]">
            <h3 className="text-2xl font-display font-black text-indigo-950 mb-6 flex items-center gap-2">
              <Gift className="w-6 h-6 text-pink-600" /> Detalhes da sua Celebração
            </h3>

            <form onSubmit={handleWhatsAppSend} className="space-y-6">
              {/* Event category */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-indigo-950 mb-2.5">Qual é o estilo do seu evento?</label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {[
                    { id: 'infantil', name: 'Infantil' },
                    { id: 'casamento', name: 'Casamento' },
                    { id: 'corporativo', name: 'Empresa' },
                    { id: 'formatura', name: 'Formatura' },
                    { id: 'geral', name: 'Aniversário' },
                    { id: 'outro', name: 'Outro' },
                  ].map((evt) => (
                    <button
                      key={evt.id}
                      type="button"
                      onClick={() => setEventType(evt.id as any)}
                      className={`py-2 px-1 text-center rounded-2xl text-xs font-black uppercase tracking-wider border-2 border-indigo-950 transition-all cursor-pointer ${
                        eventType === evt.id
                          ? 'border-indigo-950 bg-pink-600 text-white shadow-[0_3px_0_0_#be185d]'
                          : 'border-indigo-950 bg-white text-indigo-950 hover:bg-yellow-100'
                      }`}
                    >
                      {evt.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product selection dropdown or card grid */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-indigo-950 mb-2.5">Qual brinde você quer simular?</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PRODUCTS.map((prod) => (
                    <button
                      key={prod.id}
                      type="button"
                      onClick={() => handleProductSelect(prod.id)}
                      className={`p-4 rounded-[32px] border-4 text-left flex items-start justify-between transition-all cursor-pointer ${
                        selectedProductId === prod.id
                          ? 'border-pink-600 bg-pink-100 shadow-[0_4px_0_0_#be185d]'
                          : 'border-indigo-950 bg-white hover:bg-yellow-100'
                      }`}
                    >
                      <div>
                        <h4 className="text-sm font-black text-indigo-950">
                          {prod.name}
                        </h4>
                        <p className="text-xs text-indigo-950/60 font-bold mt-0.5">Lembrancinha de {prod.category.toUpperCase()}</p>
                        <span className="inline-block mt-2 text-[10px] bg-white px-2.5 py-1 rounded-full border-2 border-indigo-950 font-black text-indigo-950">
                          Mínimo: {prod.minQuantity} un.
                        </span>
                      </div>
                      <span className="text-xs font-mono font-black text-indigo-950">
                        R$ {prod.basePrice.toFixed(2).replace('.', ',')}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Slider / Selector */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-black uppercase tracking-wider text-indigo-950">Quantidade de Lembrancinhas</label>
                  <span className="text-lg font-mono font-black text-pink-600 bg-pink-100 border-2 border-indigo-950 px-3.5 py-1 rounded-2xl shadow-[0_3px_0_0_#be185d]">
                    {quantity} unidades
                  </span>
                </div>
                
                {/* Visual discount scale bar */}
                <div className="mb-4 flex items-center justify-between text-[10px] text-indigo-950 font-mono bg-yellow-400 border-2 border-indigo-950 p-2.5 rounded-xl font-bold">
                  <span className={quantity < 100 ? 'text-indigo-950 font-black underline' : ''}>Preço Base</span>
                  <span className="text-indigo-950/30">|</span>
                  <span className={quantity >= 100 && quantity < 250 ? 'text-pink-600 font-black' : ''}>100 un. (10% OFF)</span>
                  <span className="text-indigo-950/30">|</span>
                  <span className={quantity >= 250 && quantity < 500 ? 'text-pink-600 font-black' : ''}>250 un. (15% OFF)</span>
                  <span className="text-indigo-950/30">|</span>
                  <span className={quantity >= 500 ? 'text-pink-600 font-black underline' : ''}>500 un. (20% OFF!)</span>
                </div>

                <input
                  type="range"
                  min={selectedProduct.minQuantity}
                  max={1000}
                  step={10}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full accent-pink-600 h-2 bg-indigo-950 rounded-lg appearance-none cursor-pointer border border-indigo-950"
                />
                <div className="flex justify-between text-[11px] text-indigo-950/50 mt-1 font-mono font-bold">
                  <span>Mín: {selectedProduct.minQuantity} un.</span>
                  <span>500 un.</span>
                  <span>1.000 un.</span>
                </div>
              </div>

              {/* Design Artwork specification */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-indigo-950 mb-2.5">Sobre a arte de personalização:</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setHasLogo('no_need')}
                    className={`p-3.5 rounded-[30px] border-4 text-left text-xs transition-all flex items-center gap-3 cursor-pointer ${
                      hasLogo === 'no_need'
                        ? 'border-pink-600 bg-pink-100 font-black text-indigo-950 shadow-[0_4px_0_0_#be185d]'
                        : 'border-indigo-950 bg-white text-indigo-950 font-bold hover:bg-yellow-100'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full border-2 border-indigo-950 flex items-center justify-center bg-white">
                      {hasLogo === 'no_need' && <div className="w-2.5 h-2.5 rounded-full bg-pink-600" />}
                    </div>
                    <div>
                      <span className="block font-black text-indigo-950 text-xs uppercase">Criar arte exclusiva (GRÁTIS)</span>
                      <span className="text-[10px] text-indigo-950/60 font-bold">Nossos designers criam para você!</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setHasLogo('yes')}
                    className={`p-3.5 rounded-[30px] border-4 text-left text-xs transition-all flex items-center gap-3 cursor-pointer ${
                      hasLogo === 'yes'
                        ? 'border-pink-600 bg-pink-100 font-black text-indigo-950 shadow-[0_4px_0_0_#be185d]'
                        : 'border-indigo-950 bg-white text-indigo-950 font-bold hover:bg-yellow-100'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full border-2 border-indigo-950 flex items-center justify-center bg-white">
                      {hasLogo === 'yes' && <div className="w-2.5 h-2.5 rounded-full bg-pink-600" />}
                    </div>
                    <div>
                      <span className="block font-black text-indigo-950 text-xs uppercase">Eu já tenho a minha logo</span>
                      <span className="text-[10px] text-indigo-950/60 font-bold">Envie vetorizada no fechamento</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Client Basic Details (Name, Phone, Event Date) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t-2 border-indigo-950/10">
                <div>
                  <label className="block text-xs font-black text-indigo-950 uppercase tracking-wider mb-1">Seu Nome *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Amanda Silva"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-4 py-3 border-4 border-indigo-950 rounded-2xl text-sm focus:outline-none text-indigo-950 font-bold placeholder-indigo-950/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-indigo-950 uppercase tracking-wider mb-1">Seu WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="Ex: (81) 99999-9999"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full px-4 py-3 border-4 border-indigo-950 rounded-2xl text-sm focus:outline-none text-indigo-950 font-bold placeholder-indigo-950/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-indigo-950 uppercase tracking-wider mb-1">Data da Festa</label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-4 py-3 border-4 border-indigo-950 rounded-2xl text-sm focus:outline-none text-indigo-950 font-bold text-indigo-950/60"
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Value card side (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-yellow-400 via-pink-500 to-rose-500 rounded-[40px] p-6 sm:p-8 text-indigo-950 border-4 border-indigo-950 shadow-[8px_8px_0_0_rgba(79,70,229,1)] flex flex-col justify-between self-stretch">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[10px] tracking-widest font-mono uppercase bg-indigo-950 text-white px-2.5 py-1 rounded-full border-2 border-white/20 font-black">
                    Proposta Estimada
                  </span>
                  <h4 className="text-xl font-display font-black mt-2 tracking-tight">Oxente Festeje</h4>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-indigo-950/70 block uppercase font-black">Item Selecionado:</span>
                  <b className="text-sm font-black tracking-tight">{selectedProduct.name}</b>
                </div>
              </div>

              {/* Dynamic discount alert sticker */}
              <AnimatePresence mode="wait">
                {discountPercentage > 0 ? (
                  <motion.div
                    key={discountPercentage}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white border-2 border-indigo-950 rounded-[28px] p-4 mb-6 flex items-center gap-3 shadow-[0_3px_0_0_#4f46e5]"
                  >
                    <div className="bg-pink-600 text-white p-2.5 rounded-2xl">
                      <Percent className="w-5 h-5 font-black" />
                    </div>
                    <div>
                      <span className="text-[9px] text-indigo-950/60 font-mono block font-black">DESCONTO DE QUANTIDADE!</span>
                      <p className="text-sm font-black text-pink-600">Você ganhou {discountPercentage}% OFF nesse pedido!</p>
                    </div>
                  </motion.div>
                ) : (
                  <div className="bg-white/20 border border-indigo-950/20 rounded-[28px] p-4 mb-6 text-xs text-indigo-950 font-bold leading-relaxed">
                    💡 <b>Dica de Ouro da Oxente:</b> Adicione {100 - quantity > 0 ? 100 - quantity : 50} mais unidades para liberar um desconto de <b>10% OFF</b> no valor unitário de produção!
                  </div>
                )}
              </AnimatePresence>

              {/* Price Breakdown */}
              <div className="space-y-4 border-t-2 border-b-2 border-indigo-950/10 py-6 mb-6 text-indigo-950 font-black text-xs sm:text-sm">
                <div className="flex justify-between font-sans">
                  <span>Preço Unitário Original:</span>
                  <span className="font-mono line-through opacity-60">
                    R$ {selectedProduct.basePrice.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <div className="flex justify-between font-sans">
                  <span>Preço Unitário com Desconto:</span>
                  <span className="font-mono text-indigo-950">
                    R$ {unitPrice.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <div className="flex justify-between font-sans">
                  <span>Quantidade Selecionada:</span>
                  <span className="font-mono">{quantity} unidades</span>
                </div>

                {totalSaved > 0 && (
                  <div className="flex justify-between text-pink-600 font-sans font-black bg-white border-2 border-indigo-950 px-3 py-1.5 rounded-xl shadow-[0_2.5px_0_0_#be185d]">
                    <span>Economia Total:</span>
                    <span className="font-mono">- R$ {totalSaved.toFixed(2).replace('.', ',')}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Total value display */}
            <div>
              <div className="text-center mb-6">
                <span className="text-xs text-indigo-950/70 block uppercase font-mono tracking-widest font-black">VALOR TOTAL ESTIMADO</span>
                <span className="text-4xl sm:text-5xl font-display font-black tracking-tighter text-indigo-950 block mt-1">
                  R$ {totalEstimated.toFixed(2).replace('.', ',')}
                </span>
                <span className="text-[10px] text-indigo-950/70 block mt-1.5 font-bold">
                  *Podem ocorrer variações conforme a complexidade da arte final.
                </span>
              </div>

              {/* Big CTA */}
              <button
                onClick={handleWhatsAppSend}
                className="w-full py-4.5 bg-indigo-950 hover:bg-pink-600 hover:text-white text-yellow-400 font-black rounded-3xl shadow-xl transition-all flex items-center justify-center gap-2 text-base cursor-pointer border-2 border-indigo-950 shadow-[0_4px_0_0_#be185d] hover:shadow-[0_2px_0_0_#be185d] uppercase tracking-wider text-xs sm:text-sm"
              >
                <MessageSquare className="w-5 h-5 fill-current" />
                <span>Solicitar no WhatsApp!</span>
              </button>

              <div className="flex flex-wrap justify-center items-center gap-4 text-[10px] text-indigo-950/80 font-black uppercase mt-4">
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-pink-600" /> Sem Compromisso
                </span>
                <span className="w-1.5 h-1.5 bg-indigo-950/20 rounded-full" />
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-pink-600" /> Arte Grátis
                </span>
                <span className="w-1.5 h-1.5 bg-indigo-950/20 rounded-full" />
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-pink-600" /> PIX -5%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
