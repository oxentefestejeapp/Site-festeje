/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Testimonial, FAQItem } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'copo-long-drink',
    name: 'Copos Long Drink Premium',
    description: 'Copos de 350ml super resistentes, com cores neon vibrantes e brilho especial. Perfeitos para animar a pista de dança e garantir que todos lembrem da sua festa!',
    category: 'infantil',
    imageSeed: 'party-cup',
    minQuantity: 50,
    basePrice: 3.50,
    colors: ['#FF1493', '#00FFFF', '#FF8C00', '#32CD32', '#FFFFFF', '#000000'],
    rating: 4.9,
    reviewsCount: 124,
    isPopular: true,
    features: ['Plástico PS Ultra Resistente', 'Impressão em Serigrafia Premium', 'Opções de cores Neon', 'Livre de BPA']
  },
  {
    id: 'taca-gin',
    name: 'Taças de Gin Luxo 580ml',
    description: 'Elegância em cada brinde! Taças de gin robustas com base colorida ou degrade. O brinde dos sonhos para casamentos, despedidas de solteiro e festas de 15 anos.',
    category: 'casamento',
    imageSeed: 'gin-glass',
    minQuantity: 30,
    basePrice: 8.90,
    colors: ['#FF69B4', '#8A2BE2', '#00FA9A', '#FFD700', '#FFFFFF', '#E0FFFF'],
    rating: 5.0,
    reviewsCount: 88,
    isPopular: true,
    features: ['Capacidade 580ml', 'Acabamento em Degradê Opcional', 'Haste firme e confortável', 'Borda dourada metalizada opcional']
  },
  {
    id: 'ecobag-algodao',
    name: 'Ecobags de Algodão Cru',
    description: 'Charme rústico, ecológico e super útil! Sacolas 100% algodão com costura reforçada e estampa de alta definição. Uma lembrancinha que seus convidados vão usar no dia a dia.',
    category: 'geral',
    imageSeed: 'tote-bag',
    minQuantity: 30,
    basePrice: 12.50,
    colors: ['#F5F5DC', '#FFF8DC', '#FFE4C4'],
    rating: 4.8,
    reviewsCount: 95,
    isPopular: true,
    features: ['Algodão Cru Ecológico', 'Costura Reforçada', 'Tamanho Standard 35x40cm', 'Impressão Eco-Friendly']
  },
  {
    id: 'caneca-aluminio',
    name: 'Canecas de Alumínio Chopp',
    description: 'Para manter sua bebida trincando de gelada! Canecas de alumínio com pintura eletrostática brilhosa ou fosca e tirante personalizado. O queridinho das formaturas e blocos!',
    category: 'formatura',
    imageSeed: 'aluminum-mug',
    minQuantity: 20,
    basePrice: 14.90,
    colors: ['#000080', '#8B0000', '#006400', '#FFD700', '#000000', '#C0C0C0'],
    rating: 4.9,
    reviewsCount: 142,
    isPopular: true,
    features: ['Alumínio de alta chapa', 'Pintura Eletrostática', 'Mantém a temperatura', 'Acompanha Tirante opcional']
  },
  {
    id: 'squeeze-esporte',
    name: 'Garrafas Squeeze Metal 600ml',
    description: 'Brinde saudável e de alta durabilidade! Garrafas squeeze de alumínio com bico anatômico e mosquetão. Excelente escolha para marcas corporativas, escolas ou assessorias esportivas.',
    category: 'corporativo',
    imageSeed: 'water-bottle',
    minQuantity: 30,
    basePrice: 18.50,
    colors: ['#FFFFFF', '#000000', '#4682B4', '#FF4500', '#808080'],
    rating: 4.7,
    reviewsCount: 67,
    features: ['Alumínio com pintura fosca', 'Bico antivazamento', 'Tampa higiênica e mosquetão', 'Perfeita para Brinde Corporativo']
  },
  {
    id: 'necessaire-slim',
    name: 'Necessaires Slim Premium',
    description: 'Compacta, elegante e super prática para viagens e bolsa. Confeccionada em nylon estruturado com zíper de alta qualidade e pingente fofo. Um mimo inesquecível!',
    category: 'casamento',
    imageSeed: 'cosmetic-bag',
    minQuantity: 30,
    basePrice: 11.00,
    colors: ['#E6E6FA', '#FFF0F5', '#F0F8FF', '#F5FFE3', '#000000'],
    rating: 4.9,
    reviewsCount: 74,
    features: ['Nylon Poliéster Estruturado', 'Zíper tratorado de alta durabilidade', 'Totalmente lavável e impermeável por dentro', 'Estampa sublimática total']
  },
  {
    id: 'kit-colorir',
    name: 'Kits Diversão de Colorir',
    description: 'O maior sucesso com a criançada! Livrinho personalizado de desenhos no tema da festa acompanhado de giz de cera e embalagem fofa com lapela personalizada. Zero bagunça, 100% alegria!',
    category: 'infantil',
    imageSeed: 'coloring-book',
    minQuantity: 30,
    basePrice: 6.80,
    colors: ['#FFC0CB', '#ADD8E6', '#E0FFFF', '#FFFACD'],
    rating: 5.0,
    reviewsCount: 112,
    features: ['12 desenhos no tema da festa', 'Caixinha com 6 gizes de cera inclusos', 'Embalado individualmente', 'Capa papel fotográfico brilhante']
  },
  {
    id: 'chaveiro-metal',
    name: 'Chaveiros Abre-Garrafas Metal',
    description: 'Utilidade pública em formato de chaveiro! Chaveiros de metal resinado com cortador de unhas e abridor de garrafas. Pequeno no tamanho, gigante na utilidade corporativa ou festiva.',
    category: 'corporativo',
    imageSeed: 'keychain',
    minQuantity: 50,
    basePrice: 5.90,
    colors: ['#C0C0C0', '#FFD700'],
    rating: 4.8,
    reviewsCount: 53,
    features: ['Metal zamac robusto', 'Abridor de garrafa integrado', 'Resina brilhante protetora', 'Argola reforçada de aço']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Marina Silveira',
    role: 'Noiva Feliz',
    text: 'Arretado de bom! Encomendei as ecobags para o meu casamento na praia em Porto de Galinhas e todos os convidados ficaram encantados com o mimo. O atendimento da Oxente é diferenciado demais, super atenciosos em cada detalhe da estampa.',
    rating: 5,
    date: '15 Mai 2026',
    eventType: 'Casamento Rústico',
    avatarSeed: 'marina'
  },
  {
    id: '2',
    name: 'Thiago Rocha',
    role: 'Papai Coruja',
    text: 'Os copos long drink e os kits de colorir pro aniversário de 5 anos do meu filhote ficaram sensacionais! Cores vibrantes do jeitinho que ele queria. A entrega chegou super rápida aqui no Recife, tudo bem embaladinho e intacto. Recomendo muito!',
    rating: 5,
    date: '02 Jun 2026',
    eventType: 'Aniversário Infantil',
    avatarSeed: 'thiago'
  },
  {
    id: '3',
    name: 'Juliana Vasconcelos',
    role: 'Gerente de Marketing',
    text: 'Fizemos os squeezes metálicos e blocos de notas para a convenção de vendas da nossa empresa e superou todas as expectativas. O acabamento fosco com nossa logo gravada ficou elegantíssimo. Atendimento nota 10!',
    rating: 5,
    date: '20 Abr 2026',
    eventType: 'Brinde Corporativo',
    avatarSeed: 'juliana'
  },
  {
    id: '4',
    name: 'Mateus Albuquerque',
    role: 'Comissão de Formatura',
    text: 'Oxente, a formatura de Engenharia de Produção foi inesquecível com as canecas de alumínio de 500ml! Duraram a festa inteira, a estampa não descascou mesmo com as canecas batendo no chopp. O tirante personalizado foi a cereja do bolo!',
    rating: 5,
    date: '10 Mar 2026',
    eventType: 'Baile de Formatura',
    avatarSeed: 'mateus'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Qual é o prazo de produção dos brindes?',
    answer: 'Nosso prazo padrão é de 7 a 15 dias úteis após a aprovação da arte digital e confirmação do pagamento. Precisa com urgência? Fale com nosso atendimento no WhatsApp para verificarmos a possibilidade de uma taxa de produção acelerada!',
    category: 'Produção'
  },
  {
    id: 'faq-2',
    question: 'Vocês criam a arte de personalização ou eu devo enviar?',
    answer: 'Nós criamos uma arte exclusiva e inteiramente gratuita de acordo com o tema da sua festa ou as cores da sua empresa! Se preferir, você também pode enviar sua arte vetorizada nos formatos PDF, Corel Draw ou Illustrator para usarmos diretamente.',
    category: 'Arte & Criação'
  },
  {
    id: 'faq-3',
    question: 'Qual é o pedido mínimo para realizar uma compra?',
    answer: 'Para garantir a qualidade de produção e os custos competitivos, o pedido mínimo varia de acordo com o produto. Por exemplo, canecas de alumínio têm mínimo de 20 unidades, taças de gin 30 unidades e copos long drink 50 unidades. Você pode ver o mínimo de cada item no nosso simulador!',
    category: 'Pedidos'
  },
  {
    id: 'faq-4',
    question: 'Como funciona o envio para outras cidades e estados?',
    answer: 'Nós enviamos para todo o Brasil através de transportadoras parceiras e Correios (SEDEX ou PAC). Todas as nossas caixas de brindes são preparadas com muito plástico bolha e separadores para garantir que copos, taças e mimos cheguem 100% perfeitos ao destino.',
    category: 'Entrega'
  },
  {
    id: 'faq-5',
    question: 'Quais são as formas de pagamento disponíveis?',
    answer: 'Aceitamos PIX com 5% de desconto, transferência bancária e cartões de crédito em até 10x (com parcelas sem juros em até 3x). Facilitamos o pagamento para caber direitinho no planejamento da sua festa!',
    category: 'Pagamento'
  }
];
