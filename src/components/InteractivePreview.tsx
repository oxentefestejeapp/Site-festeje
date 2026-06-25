/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { PRODUCTS } from '../data';
import { motion } from 'motion/react';
import { Sparkles, Type, Paintbrush, Heart, Award, Star, Cake, PartyPopper, RefreshCw } from 'lucide-react';

const FONTS = [
  { id: 'font-script', name: 'Cursiva Elegante', className: 'font-serif italic' },
  { id: 'font-display', name: 'Moderna Outfit', className: 'font-display font-bold uppercase tracking-wider' },
  { id: 'font-mono', name: 'Retro Tech', className: 'font-mono font-bold uppercase' },
  { id: 'font-casual', name: 'Alegre Cômico', className: 'font-sans font-black italic' },
];

const STAMPS = [
  { id: 'none', name: 'Nenhum', icon: null },
  { id: 'heart', name: 'Coração', icon: Heart },
  { id: 'star', name: 'Estrela', icon: Star },
  { id: 'cake', name: 'Bolo de Festa', icon: Cake },
  { id: 'popper', name: 'Balões / Festa', icon: PartyPopper },
  { id: 'crown', name: 'Realeza', icon: Award },
];

const TEXT_COLORS = [
  { hex: '#FFFFFF', name: 'Branco Neve' },
  { hex: '#000000', name: 'Preto Coalho' },
  { hex: '#D4AF37', name: 'Dourado Ouro' },
  { hex: '#002F6C', name: 'Azul Real' },
];

interface InteractivePreviewProps {
  selectedProductId?: string;
  onSelectProduct?: (productId: string) => void;
}

export default function InteractivePreview({
  selectedProductId: propSelectedProductId,
  onSelectProduct,
}: InteractivePreviewProps) {
  const previewProducts = PRODUCTS.slice(0, 4); // Take first 4 items for preview (copo, gin glass, ecobag, caneca)
  const [internalSelectedProductId, setInternalSelectedProductId] = useState(previewProducts[0].id);

  const selectedProductId = propSelectedProductId || internalSelectedProductId;
  const setSelectedProductId = onSelectProduct || setInternalSelectedProductId;

  const selectedProduct = PRODUCTS.find((p) => p.id === selectedProductId) || previewProducts[0];

  const [productColor, setProductColor] = useState(selectedProduct.colors[0]);
  const [customText, setCustomText] = useState('Oxente, Maria fez 15!');
  const [selectedFontId, setSelectedFontId] = useState(FONTS[0].id);
  const [stampId, setStampId] = useState('popper');
  const [textColor, setTextColor] = useState('#FFFFFF');

  // Automatically update product color when selected product changes
  useEffect(() => {
    if (selectedProduct && selectedProduct.colors.length > 0) {
      setProductColor(selectedProduct.colors[0]);
    }
  }, [selectedProductId]);

  const selectedFont = FONTS.find((f) => f.id === selectedFontId) || FONTS[0];
  const SelectedStampIcon = STAMPS.find((s) => s.id === stampId)?.icon || null;

  // Handle product change and update default color
  const handleProductChange = (id: string) => {
    setSelectedProductId(id);
    const prod = PRODUCTS.find((p) => p.id === id);
    if (prod && prod.colors.length > 0) {
      setProductColor(prod.colors[0]);
    }
  };

  const handleReset = () => {
    setCustomText('Oxente, Festeje!');
    setSelectedFontId(FONTS[0].id);
    setStampId('popper');
    setTextColor('#FFFFFF');
    if (selectedProduct.colors.length > 0) {
      setProductColor(selectedProduct.colors[0]);
    }
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden" id="simulador-visual">
      {/* Background Decorative Blobs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-yellow-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-pink-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-yellow-400 border-2 border-indigo-950 text-indigo-950 px-4 py-1.5 rounded-full text-xs font-black font-display uppercase tracking-widest mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin text-pink-600" /> Estúdio de Criação Oxente
          </motion.div>
          <h2 className="text-4xl font-display font-black text-indigo-950 tracking-tighter sm:text-5xl">
            Crie e <span className="text-pink-600 italic">Personalize Online</span>
          </h2>
          <p className="mt-4 text-lg text-indigo-950/80 font-bold font-sans">
            Solte sua imaginação! Escolha um brinde, mude as cores, escreva sua frase retada e veja na hora como vai ficar a lembrancinha da sua festa.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left panel: Controls (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-[40px] shadow-2xl border-4 border-indigo-950 p-6 sm:p-8 flex flex-col justify-between shadow-[8px_8px_0_0_rgba(190,24,93,0.15)]" id="visual-editor-controls">
            <div>
              <div className="flex justify-between items-center mb-6 border-b-2 border-indigo-950/10 pb-4">
                <h3 className="text-xl font-display font-black text-indigo-950 flex items-center gap-2">
                  <Paintbrush className="w-5 h-5 text-pink-600" /> Customização
                </h3>
                <button
                  onClick={handleReset}
                  className="text-xs text-indigo-950/60 hover:text-pink-600 transition-colors flex items-center gap-1 cursor-pointer font-black uppercase tracking-wider"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Limpar tudo
                </button>
              </div>

              {/* 1. Select Product */}
              <div className="mb-6">
                <label className="block text-xs font-black uppercase tracking-wider text-indigo-950 mb-2">1. Escolha o Produto</label>
                <div className="grid grid-cols-2 gap-2">
                  {previewProducts.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleProductChange(p.id)}
                      className={`p-3 rounded-2xl border-2 text-left text-xs transition-all flex flex-col justify-between cursor-pointer ${
                        selectedProductId === p.id
                          ? 'border-pink-600 bg-pink-100 font-black text-indigo-950 shadow-[0_3px_0_0_#be185d]'
                          : 'border-indigo-950 bg-white text-indigo-950 font-bold hover:bg-yellow-100'
                      }`}
                    >
                      <span className="truncate">{p.name}</span>
                      <span className="text-[10px] text-indigo-900/60 font-black mt-1">Mín. {p.minQuantity} un.</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Choose Product Color */}
              <div className="mb-6">
                <label className="block text-xs font-black uppercase tracking-wider text-indigo-950 mb-2">
                  2. Cor do Brinde: <span className="text-pink-600 font-mono">({productColor})</span>
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {selectedProduct.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setProductColor(color)}
                      style={{ backgroundColor: color }}
                      className={`w-9 h-9 rounded-full border-4 shadow-md cursor-pointer transition-all ${
                        productColor === color
                          ? 'ring-4 ring-pink-500 scale-110 border-indigo-950'
                          : 'border-indigo-950 hover:scale-105'
                      }`}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              {/* 3. Text Input */}
              <div className="mb-6">
                <label className="block text-xs font-black uppercase tracking-wider text-indigo-950 mb-1.5 flex justify-between items-center">
                  <span>3. Frase ou Nome do Evento</span>
                  <span className={`text-[10px] font-mono font-black ${customText.length > 30 ? 'text-red-600' : 'text-indigo-950/50'}`}>
                    {customText.length}/35 carac.
                  </span>
                </label>
                <input
                  type="text"
                  maxLength={35}
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Ex: João & Maria - 15 Anos"
                  className="w-full px-4 py-3 border-4 border-indigo-950 rounded-2xl text-sm focus:outline-none text-indigo-950 font-bold placeholder-indigo-950/40"
                />
              </div>

              {/* 4. Font Selection */}
              <div className="mb-6">
                <label className="block text-xs font-black uppercase tracking-wider text-indigo-950 mb-2 flex items-center gap-1">
                  <Type className="w-4 h-4 text-pink-600" /> 4. Estilo da Fonte
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {FONTS.map((font) => (
                    <button
                      key={font.id}
                      onClick={() => setSelectedFontId(font.id)}
                      className={`px-3 py-2.5 rounded-2xl border-2 text-sm transition-all text-center cursor-pointer ${
                        selectedFontId === font.id
                          ? 'border-pink-600 bg-pink-100 text-indigo-950 font-black shadow-[0_3px_0_0_#be185d]'
                          : 'border-indigo-950 bg-white text-indigo-950 hover:bg-yellow-100 font-bold'
                      }`}
                    >
                      <span className={font.className}>{font.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Stamp / Icon Selection */}
              <div className="mb-6">
                <label className="block text-xs font-black uppercase tracking-wider text-indigo-950 mb-2">5. Estampa do Centro</label>
                <div className="grid grid-cols-3 gap-2">
                  {STAMPS.map((stamp) => {
                    const StampIcon = stamp.icon;
                    return (
                      <button
                        key={stamp.id}
                        onClick={() => setStampId(stamp.id)}
                        className={`p-2.5 rounded-2xl border-2 text-xs transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                          stampId === stamp.id
                            ? 'border-yellow-400 bg-yellow-100 text-indigo-950 font-black shadow-[0_3px_0_0_#be185d]'
                            : 'border-indigo-950 bg-white text-indigo-950 font-bold hover:bg-yellow-100'
                        }`}
                      >
                        {StampIcon ? (
                          <StampIcon className="w-4 h-4 text-pink-600" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-dashed border-indigo-950/40" />
                        )}
                        <span>{stamp.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              
              {/* 6. Stamp / Text Color */}
              <div className="mb-6">
                <label className="block text-xs font-black uppercase tracking-wider text-indigo-950 mb-2">6. Cor da Gravação (Arte)</label>
                <div className="flex flex-wrap gap-2.5">
                  {TEXT_COLORS.map((tc) => (
                    <button
                      key={tc.hex}
                      onClick={() => setTextColor(tc.hex)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 text-xs cursor-pointer transition-all ${
                        textColor === tc.hex
                          ? 'border-indigo-950 bg-yellow-400 font-black text-indigo-950 scale-105 shadow-[0_2px_0_0_#4f46e5]'
                          : 'border-indigo-950 bg-white text-indigo-950 font-bold hover:bg-yellow-100'
                      }`}
                    >
                      <div
                        className="w-3.5 h-3.5 rounded-full border border-indigo-950"
                        style={{ backgroundColor: tc.hex }}
                      />
                      <span>{tc.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t-2 border-indigo-950/10">
              <a
                href={`https://wa.me/5581999999999?text=Ol%C3%A1%21+Estive+no+simulador+da+Oxente+Festeje+e+amei+o+brinde+${encodeURIComponent(
                  selectedProduct.name
                )}+na+cor+${encodeURIComponent(productColor)}+com+a+frase+%22${encodeURIComponent(
                  customText
                )}%22.+Gostaria+de+um+or%C3%A7amento%21`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4.5 px-6 bg-pink-600 hover:bg-pink-700 text-white font-black rounded-3xl border-2 border-indigo-950 shadow-[0_4px_0_0_#be185d] hover:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider text-xs"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.182 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.968C16.574 1.97 14.101.945 11.48.943c-5.44 0-9.866 4.372-9.87 9.802 0 1.83.504 3.611 1.46 5.181l-.997 3.637 3.734-.972zm11.526-7.093c-.3-.149-1.774-.864-2.047-.962-.272-.099-.471-.148-.669.149-.197.297-.767.962-.94 1.16-.173.199-.347.223-.647.074-.3-.149-1.265-.461-2.41-1.471-.89-.785-1.49-1.755-1.664-2.052-.174-.297-.019-.458.13-.606.134-.133.3-.347.449-.52.149-.173.197-.297.296-.495.099-.198.05-.371-.025-.52-.075-.148-.669-1.597-.916-2.193-.242-.58-.487-.5-.669-.51-.173-.008-.371-.01-.568-.01-.197 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.774-.717 2.022-1.412.247-.693.247-1.287.172-1.411-.074-.124-.272-.198-.57-.347z" />
                </svg>
                <span>Orçar essa criação no WhatsApp!</span>
              </a>
            </div>
          </div>

          {/* Right panel: Live 3D Preview Stage (7 cols) */}
          <div className="lg:col-span-7 bg-indigo-950 rounded-[40px] p-6 sm:p-12 flex flex-col justify-between items-center text-white relative shadow-2xl border-4 border-indigo-950 shadow-[8px_8px_0_0_#facc15] overflow-hidden" id="visual-preview-stage">
            {/* Grid Pattern in dark stage */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute top-10 right-10 bg-yellow-400 text-indigo-950 border-2 border-indigo-950 rounded-full px-3.5 py-1 text-[10px] font-black tracking-widest flex items-center gap-1.5 shadow-[0_2.5px_0_0_#4f46e5]">
              <span className="w-2 h-2 rounded-full bg-pink-600 animate-ping" />
              PREVIEW INTERATIVO 3D
            </div>

            <div className="w-full flex justify-between items-center z-10 text-white/60 text-[10px] font-black tracking-widest mb-4">
              <span>PRODUTO: <b className="text-yellow-400 font-mono">{selectedProduct.name.toUpperCase()}</b></span>
              <span>GRAVAÇÃO: <b className="text-pink-400 font-mono">{textColor.toUpperCase()}</b></span>
            </div>

            {/* Container Rendering Area with standard aspect ration based on container */}
            <div className="relative w-full flex-1 min-h-[340px] flex items-center justify-center z-10 py-6">
              {/* Animated Floating Showcase container */}
              <motion.div
                key={selectedProductId}
                initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 15 }}
                className="relative w-72 h-80 flex items-center justify-center"
              >
                {/* 1. COPO LONG DRINK */}
                {selectedProductId === 'copo-long-drink' && (
                  <div className="relative w-44 h-72 flex flex-col items-center">
                    {/* Shadow underneath */}
                    <div className="absolute -bottom-4 w-40 h-6 bg-black/40 rounded-full blur-md" />
                    {/* Cup shape */}
                    <div
                      className="w-full h-full relative transition-colors duration-500 rounded-b-[20px] rounded-t-[5px]"
                      style={{
                        backgroundColor: productColor,
                        clipPath: 'polygon(5% 0%, 95% 0%, 82% 100%, 18% 100%)',
                        boxShadow: 'inset -20px 0 30px rgba(0,0,0,0.15), inset 20px 0 30px rgba(255,255,255,0.2), 0 10px 20px rgba(0,0,0,0.2)'
                      }}
                    >
                      {/* Reflection Line */}
                      <div className="absolute left-[15%] top-0 bottom-0 w-[8%] bg-white/20 blur-[1px]" />
                      <div className="absolute right-[20%] top-0 bottom-0 w-[12%] bg-black/10 blur-[1.5px]" />
                    </div>

                    {/* Personalization layer centered on cup */}
                    <div
                      className="absolute top-[28%] left-1/2 -translate-x-1/2 w-[60%] flex flex-col items-center text-center pointer-events-none select-none"
                      style={{ color: textColor }}
                    >
                      {SelectedStampIcon && (
                        <motion.div
                          initial={{ scale: 0.5 }}
                          animate={{ scale: 1 }}
                          className="mb-3.5"
                        >
                          <SelectedStampIcon className="w-8 h-8 opacity-90 filter drop-shadow-sm" />
                        </motion.div>
                      )}
                      <p className={`text-base leading-tight font-medium max-h-[100px] overflow-hidden ${selectedFont.className}`} style={{ textShadow: textColor === '#FFFFFF' ? '1px 1px 2px rgba(0,0,0,0.4)' : 'none' }}>
                        {customText || 'Oxente Festeje!'}
                      </p>
                      <div className="w-12 h-[1px] mt-2 bg-current opacity-60" />
                      <span className="text-[7px] tracking-widest uppercase mt-1 opacity-80 font-mono">Oxente Festeje</span>
                    </div>
                  </div>
                )}

                {/* 2. TAÇA DE GIN */}
                {selectedProductId === 'taca-gin' && (
                  <div className="relative w-48 h-72 flex flex-col items-center">
                    {/* Shadow underneath */}
                    <div className="absolute -bottom-4 w-32 h-4 bg-black/50 rounded-full blur-md" />
                    {/* Gin glass base & stem */}
                    <div className="absolute bottom-0 w-32 h-2 bg-gray-400/80 rounded-full" />
                    <div className="absolute bottom-2 w-2 h-32 bg-gradient-to-b from-gray-300 to-gray-500" />
                    
                    {/* Gin glass bowl */}
                    <div
                      className="w-44 h-44 absolute top-0 rounded-full flex items-center justify-center transition-all duration-500"
                      style={{
                        backgroundColor: productColor,
                        borderRadius: '45% 45% 50% 50% / 40% 40% 60% 60%',
                        boxShadow: 'inset -20px -20px 40px rgba(0,0,0,0.2), inset 20px 20px 30px rgba(255,255,255,0.25)',
                      }}
                    >
                      {/* Reflection circle */}
                      <div className="absolute top-[10%] left-[20%] w-[25%] h-[20%] bg-white/20 rounded-full blur-[1px] rotate-[-15deg]" />
                      
                      {/* Personalization layer */}
                      <div
                        className="absolute top-[28%] left-1/2 -translate-x-1/2 w-[70%] flex flex-col items-center text-center pointer-events-none select-none"
                        style={{ color: textColor }}
                      >
                        {SelectedStampIcon && (
                          <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="mb-2.5">
                            <SelectedStampIcon className="w-7 h-7 opacity-90" />
                          </motion.div>
                        )}
                        <p className={`text-sm leading-tight font-medium ${selectedFont.className}`} style={{ textShadow: textColor === '#FFFFFF' ? '1px 1px 2px rgba(0,0,0,0.4)' : 'none' }}>
                          {customText || 'Oxente Festeje!'}
                        </p>
                        <div className="w-10 h-[1px] mt-1.5 bg-current opacity-60" />
                        <span className="text-[6px] tracking-widest uppercase mt-0.5 opacity-80 font-mono">Oxente Festeje</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. ECOBAG DE ALGODÃO */}
                {selectedProductId === 'ecobag-algodao' && (
                  <div className="relative w-52 h-76 flex flex-col items-center">
                    {/* Straps */}
                    <svg className="absolute -top-10 w-28 h-16" viewBox="0 0 100 60">
                      <path
                        d="M20 60 C20 -10, 80 -10, 80 60"
                        fill="none"
                        stroke="#D2B48C"
                        strokeWidth="8"
                        strokeLinecap="round"
                        opacity="0.8"
                      />
                    </svg>
                    {/* Shadow underneath */}
                    <div className="absolute -bottom-2 w-48 h-5 bg-black/40 rounded-full blur-md" />
                    {/* Bag body */}
                    <div
                      className="w-full h-56 mt-6 rounded-md relative flex items-center justify-center transition-colors duration-500 p-4"
                      style={{
                        backgroundColor: productColor,
                        boxShadow: 'inset 0 10px 15px rgba(0,0,0,0.05), inset 0 -10px 15px rgba(255,255,255,0.3), 0 10px 20px rgba(0,0,0,0.15)',
                        border: '2px solid rgba(0,0,0,0.06)'
                      }}
                    >
                      {/* Fabric Texture Lines */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:4px_4px] opacity-60 rounded-md" />
                      
                      {/* Personalization layer */}
                      <div
                        className="w-[80%] flex flex-col items-center text-center pointer-events-none select-none z-10"
                        style={{ color: textColor }}
                      >
                        {SelectedStampIcon && (
                          <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="mb-3">
                            <SelectedStampIcon className="w-8 h-8 opacity-85" />
                          </motion.div>
                        )}
                        <p className={`text-base leading-snug font-semibold ${selectedFont.className}`} style={{ textShadow: textColor === '#FFFFFF' ? '1px 1px 2px rgba(0,0,0,0.2)' : 'none' }}>
                          {customText || 'Oxente Festeje!'}
                        </p>
                        <div className="w-12 h-[1.5px] mt-2.5 bg-current opacity-60" />
                        <span className="text-[7px] tracking-widest uppercase mt-1 opacity-70 font-mono">ECO-FRIENDLY</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. CANECA DE ALUMÍNIO CHOPP */}
                {selectedProductId === 'caneca-aluminio' && (
                  <div className="relative w-56 h-72 flex items-center justify-center">
                    {/* Shadow underneath */}
                    <div className="absolute bottom-1 w-40 h-5 bg-black/50 rounded-full blur-md" />
                    
                    {/* Mug Handle (underneath) */}
                    <div
                      className="absolute right-[4%] top-1/2 -translate-y-1/2 w-14 h-36 rounded-r-3xl border-[12px]"
                      style={{
                        borderColor: '#9E9E9E',
                        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)'
                      }}
                    />

                    {/* Mug body */}
                    <div
                      className="w-40 h-52 rounded-2xl relative flex items-center justify-center transition-colors duration-500 overflow-hidden"
                      style={{
                        backgroundColor: productColor,
                        boxShadow: 'inset -20px 0 25px rgba(0,0,0,0.2), inset 20px 0 25px rgba(255,255,255,0.25), 0 10px 15px rgba(0,0,0,0.2)'
                      }}
                    >
                      {/* Metallic Shine */}
                      <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-[-15deg] pointer-events-none" />
                      
                      {/* Personalization layer */}
                      <div
                        className="w-[75%] flex flex-col items-center text-center pointer-events-none select-none z-10"
                        style={{ color: textColor }}
                      >
                        {SelectedStampIcon && (
                          <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="mb-3">
                            <SelectedStampIcon className="w-8 h-8 opacity-90" />
                          </motion.div>
                        )}
                        <p className={`text-base leading-tight font-semibold ${selectedFont.className}`} style={{ textShadow: textColor === '#FFFFFF' ? '1px 1px 2px rgba(0,0,0,0.4)' : 'none' }}>
                          {customText || 'Oxente Festeje!'}
                        </p>
                        <div className="w-12 h-[1px] mt-2.5 bg-current opacity-60" />
                        <span className="text-[7px] tracking-widest uppercase mt-1 opacity-80 font-mono">ALUMÍNIO CHOPP</span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Hint & specs */}
            <div className="text-center z-10 mt-4 bg-white/10 backdrop-blur-md px-6 py-4.5 rounded-[24px] border-2 border-white/20 max-w-md shadow-md">
              <span className="text-[11px] text-white/80 block mb-2.5 font-sans font-bold leading-relaxed">
                💡 A arte final do seu brinde é ajustada e aperfeiçoada pelos nossos designers logo após a aprovação do pedido. Nós garantimos 100% de satisfação!
              </span>
              <span className="text-xs text-yellow-400 font-black font-display uppercase tracking-widest block">
                Pedido Mínimo deste item: {selectedProduct.minQuantity} Unidades
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
