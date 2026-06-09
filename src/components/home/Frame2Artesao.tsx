// src/components/home/Frame2Artesao.tsx
export function Frame2Artesao() {
  return (
    <div className="w-full max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
      
      {/* BLOCO DA FOTO: MOLDURA PREMIUM INDUSTRIAL */}
      <div className="lg:col-span-5 flex justify-center w-full">
        <div className="relative w-full max-w-[360px] aspect-square bg-zinc-900/10 border border-zinc-900 p-3 backdrop-blur-sm group">
          {/* Cantoneiras sutis de precisão */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-700"></div>
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-zinc-700"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-zinc-700"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zinc-700"></div>
          
          <div className="w-full h-full overflow-hidden border border-zinc-800 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent z-10 pointer-events-none"></div>
            <img 
              src="/foto-artesao.jpg" 
              alt="Rafael - O Artesão" 
              className="grayscale hover:grayscale-0 transition-all duration-700 w-full h-full object-cover scale-105 group-hover:scale-100" 
            />
          </div>
        </div>
      </div>

      {/* BLOCO NARRATIVO: DRAMATURGIA E PESO */}
      <div className="lg:col-span-7 flex flex-col items-start text-left">
        <span className="text-xs font-black tracking-[0.3em] text-amber-500 uppercase mb-3">
          Mente & Manufatura
        </span>
        
        <h2 className="font-black text-4xl md:text-5xl tracking-tighter uppercase italic leading-none mb-6 border-b border-zinc-900 pb-4 w-full">
          O Artesão
        </h2>
        
        <div className="space-y-4 text-zinc-400 text-base md:text-lg leading-relaxed font-medium pr-4">
          <p>
            Artista por essência e escolha, <span className="text-white font-bold">Rafael</span> opera 
            na linha tênue onde a força bruta encontra a precisão cirúrgica. Um artesão nato 
            com uma habilidade incomum para domar materiais complexos e dar forma ao impossível.
          </p>
          <p>
            Reconhecido no meio custom como o <span className="text-amber-500 font-mono text-sm uppercase tracking-wider">mago dos reparos</span>, 
            sua especialidade não é o caminho convencional, mas sim o trabalho manual de alta dificuldade de manipulação. 
            Onde a maioria enxerga um limite intransponível, ele encontra o início do processo.
          </p>
        </div>

        {/* Citação de Desafio em Destaque */}
        <div className="mt-8 border-l-2 border-amber-500 pl-4 py-1">
          <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block mb-1">A Filosofia da Oficina:</span>
          <p className="text-xl md:text-2xl font-black italic tracking-tight text-white uppercase">
            "Me dê um desafio."
          </p>
        </div>
      </div>

    </div>
  );
}