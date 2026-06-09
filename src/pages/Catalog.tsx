// src/pages/Catalog.tsx
import { Link } from 'react-router-dom';
import { PRODUCTS_DATA } from '../data/products';

export function Catalog() {
  return (
    <div className="w-full min-h-screen bg-zinc-950 text-white py-24 select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Topo do Catálogo */}
        <div className="mb-16 flex justify-between items-end border-b border-zinc-900 pb-6">
          <div>
            <span className="text-xs font-black tracking-[0.3em] text-zinc-500 uppercase block mb-3">
              LINHA EXCLUSIVA
            </span>
            <h1 className="font-black text-4xl md:text-5xl tracking-tighter uppercase italic">
              O Acervo
            </h1>
          </div>
          <Link 
            to="/" 
            className="text-xs font-mono font-bold tracking-[0.2em] text-zinc-400 hover:text-amber-500 transition-colors uppercase border-b border-transparent hover:border-amber-500 pb-1"
          >
            ← Voltar ao Início
          </Link>
        </div>

        {/* Grid 3x2 Proporcional */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {PRODUCTS_DATA.map((product) => (
            <Link 
              to={`/produto/${product.id}`}
              key={product.id}
              className="flex flex-col group cursor-pointer h-full"
            >
              {/* 1. Nome do Produto */}
              <div className="flex justify-between items-baseline mb-3">
                <h3 className="font-black text-lg tracking-tight uppercase italic text-zinc-200 group-hover:text-amber-500 transition-colors duration-300">
                  {product.name}
                </h3>
                <span className="font-mono text-[10px] text-zinc-600 tracking-wider font-bold">
                  {product.code}
                </span>
              </div>

              {/* 2. Moldura Minimalista com Imagem Real */}
              <div className="relative w-full aspect-square bg-zinc-900/40 border border-zinc-900 group-hover:border-zinc-700 transition-all duration-300 flex items-center justify-center overflow-hidden mb-4">
                <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950 via-transparent to-transparent opacity-40 z-10 pointer-events-none"></div>
                
                <img 
                  src={product.mainImage} 
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 z-0"
                />
              </div>

              {/* 3. Descrição Integral (Ajuste: Sem travas, texto corre 100% livre e nítido) */}
              <p className="text-zinc-400 text-sm leading-relaxed mb-8 block">
                {product.desc}
              </p>

              {/* 4. Rodapé Técnico (Ajuste: "Ver Detalhes" robusto e Preço imponente) */}
              <div className="mt-auto pt-4 flex items-center justify-between border-t border-zinc-900 group-hover:border-zinc-700 transition-colors duration-300">
                
                {/* Link de Ação Nítido e com tracking agressivo */}
                <div className="font-mono text-zinc-400 group-hover:text-amber-500 text-xs font-bold tracking-widest uppercase transition-colors duration-300 flex items-center gap-1.5">
                  Ver Detalhes 
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </div>

                {/* Preço em Destaque Absoluto */}
                <div className="text-white font-black text-2xl tracking-tight transition-transform duration-300 group-hover:scale-105">
                  <span className="text-xs font-light text-zinc-500 mr-1 italic">R$</span>
                  {product.price}
                  <span className="text-xs font-light text-zinc-500 italic">,00</span>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}