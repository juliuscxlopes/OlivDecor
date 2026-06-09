// src/pages/ProductDetail.tsx
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS_DATA } from '../data/products';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();

  // 1. Busca o produto correspondente
  const product = PRODUCTS_DATA.find((p) => p.id === id);

  // 2. Controla apenas a imagem que o usuário CLICOU explicitamente
  const [userSelectedImage, setUserSelectedImage] = useState<string | null>(null);
  const [prevId, setPrevId] = useState(id);

  // 3. Se o ID da URL mudou, resetamos a seleção do usuário direto no fluxo de renderização
  if (id !== prevId) {
    setPrevId(id);
    setUserSelectedImage(null);
  }

  // Guard de segurança simplificado
  if (!product) return null;

  // 4. Estado Derivado: Se o usuário não clicou em nada, o padrão é a primeira imagem do produto
  const activeImage = userSelectedImage || (product.images[0] || product.mainImage || '');

  // Configuração simplificada do WhatsApp da Oficina
  const WHATSAPP_NUMBER = '5511999999999'; 
  const whatsappMessage = encodeURIComponent(
    `Olá! Gostaria de confirmar a reserva do capacete ${product.name} (Código Único: ${product.code}). Como funciona a entrega?`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-white py-24 select-none flex items-center">
      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* LADO ESQUERDO: MOLDURA E INTERAÇÃO DE FOTOS */}
        <div className="lg:col-span-6 flex flex-col gap-4 w-full">
          <div className="w-full aspect-square bg-zinc-900/30 border border-zinc-900 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/10 to-zinc-950/60 pointer-events-none z-10"></div>
            
            {activeImage && (
              <img 
                src={activeImage} 
                alt={product.name} 
                className="w-full h-full object-cover z-0"
              />
            )}
          </div>

          {/* Miniaturas de Posições */}
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {product.images.map((imgUrl, index) => {
              const isActive = activeImage === imgUrl;
              return (
                <button
                  key={index}
                  onClick={() => setUserSelectedImage(imgUrl)}
                  className={`aspect-square bg-zinc-900/20 border transition-all duration-200 overflow-hidden relative group p-1 ${
                    isActive 
                      ? 'border-white' 
                      : 'border-zinc-900/60 hover:border-zinc-700'
                  }`}
                >
                  <img 
                    src={imgUrl} 
                    alt={`${product.name} - Vista ${index + 1}`} 
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-40 group-hover:opacity-80'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* LADO DIREITO: INFORMAÇÕES TÉCNICAS E RESERVA */}
        <div className="lg:col-span-6 flex flex-col items-start w-full">
          
          {/* Topo Isolado: Evita que o link entre no container de baixo */}
          <div className="w-full flex justify-between items-baseline mb-6 border-b border-zinc-900 pb-2">
            <span className="text-xs font-black tracking-[0.3em] text-amber-500 uppercase">
              {product.tag}
            </span>
            <Link 
              to="/catalogo" 
              className="text-xs font-mono font-bold tracking-[0.2em] text-zinc-500 hover:text-amber-500 transition-colors uppercase border-b border-transparent hover:border-amber-500 pb-1"
            >
              ← Voltar ao Acervo
            </Link>
          </div>
          
          {/* Nome do Produto */}
          <h1 className="font-black text-4xl md:text-5xl tracking-tighter uppercase italic leading-none w-full mb-4">
            {product.name}
          </h1>

          {/* Bloco de Preço: Posicionamento limpo e com alta presença visual */}
          <div className="w-full flex items-baseline gap-2 pb-6 border-b border-zinc-900 mb-6">
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mr-2">Investimento:</span>
            <div className="text-white font-black text-3xl tracking-tight flex items-baseline">
              <span className="text-xs font-light text-zinc-500 mr-1 italic">R$</span>
              <span className="text-3xl font-black">{product.price}</span>
              <span className="text-xs font-light text-zinc-500 italic">,00</span>
            </div>
          </div>

          {/* Descrição Integral */}
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8 block font-medium pr-2">
            {product.desc}
          </p>

          {/* Ficha Técnica: Cravada em linha única sem quebras erradas */}
          <div className="w-full flex flex-col gap-4 mb-10 border-t border-b border-zinc-900 py-6">
            {product.specs.map((spec, i) => (
              <div 
                key={i} 
                className="flex justify-between items-center text-sm font-mono flex-nowrap whitespace-nowrap gap-4 border-b border-zinc-900/30 pb-2 last:border-0 last:pb-0"
              >
                <span className="text-zinc-500 tracking-wider uppercase text-xs font-bold block shrink-0">
                  {spec.label}
                </span>
                <span className="text-zinc-200 text-right font-medium block truncate">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>

          {/* Botão de Ação Direta */}
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center px-10 py-5 bg-white hover:bg-zinc-200 text-zinc-950 font-black uppercase tracking-widest text-xs transition-all duration-300 shadow-2xl flex items-center justify-center gap-2 group"
          >
            Confirmar Reserva
            <span className="transform group-hover:translate-x-1 transition-transform duration-300 text-sm font-bold">→</span>
          </a>
        </div>

      </div>
    </div>
  );
}