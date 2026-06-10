import { useEffect, useRef, useState, useCallback } from 'react';

// Lista ordenada dos vídeos MP4 de alta resolução (2048x902)
const HERO_VIDEOS = [
  '/videos/hero-1.mp4',
  '/videos/hero-2.mp4',
  '/videos/hero-3.mp4',
  '/videos/hero-4.mp4'
];

export function Frame0Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection Observer para animações de entrada
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // Lógica de encadeamento de vídeos
  const handleVideoEnded = useCallback(() => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % HERO_VIDEOS.length);
  }, []);

  return (
    <div 
      ref={sectionRef}
      // ADICIONADO z-0 para o container pai
      className="relative w-full min-h-screen flex items-center bg-zinc-950 overflow-hidden select-none pt-24 pb-16 z-0"
    >
      
      {/* ========================================================================= */}
      {/* CAMADA DE VÍDEO FUNDO INTEIRO (Ocupa toda a Section) */}
      {/* ========================================================================= */}
      {/* Container absoluto com animação de entrada */}
      <div className={`absolute inset-0 z-1 transform transition-all duration-[2200ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[300ms] ${
        isVisible ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-md scale-105'
      }`}>
        <video
          key={`hero-bg-video-${currentVideoIndex}`}
          src={HERO_VIDEOS[currentVideoIndex]}
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnded}
          // CLASSSES CHAVE: object-cover h-full w-full mix-blend-screen
          // object-cover: Corta o vídeo proporcionalmente para preencher toda a área sem distorcer.
          className="w-full h-full object-cover mix-blend-screen brightness-[1.03] drop-shadow-[0_0_60px_rgba(245,158,11,0.03)]"
        />
        
        {/* Vinheta escura sutil por cima do vídeo para garantir leitura do texto perto das bordas */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/20 via-transparent to-zinc-950/60 pointer-events-none"></div>
      </div>


      {/* ========================================================================= */}
      {/* EFEITOS DE FUNDO (Brilhos Âmbar Originais) - Mantidos z-0 */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50"> {/* Reduzi levemente a opacidade deles para não brigar com o vídeo */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/[0.015] rounded-full blur-[140px]"></div>
        <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-zinc-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay bg-repeat" style={{ backgroundImage: "url('/textures/noise.png')" }}></div>
      </div>


      {/* ========================================================================= */}
      {/* GRID DE CONTEÚDO PRINCIPAL (Flutuando sobre o vídeo) */}
      {/* ========================================================================= */}
      {/* ADICIONADO z-10 para garantir que o texto fique na FRENTE do vídeo */}
      <div className="relative w-full max-w-[1400px] mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10">
        
        {/* LADO ESQUERDO VAZIO: Ocupa 5 colunas no PC para afastar o texto, permitindo que a arte do vídeo respire naquele espaço */}
        <div className="hidden lg:block lg:col-span-5 w-full relative">
        </div>
        
        {/* LADO DIREITO: MANIFESTO + CONTEÚDO */}
        <div className="lg:col-span-7 flex flex-col items-start text-left lg:pl-8">
          
          {/* 1. Badge de Contexto */}
          <span className={`inline-block text-[11px] font-bold tracking-[0.2em] border border-amber-600/60 bg-amber-950/10 text-amber-500 px-4 py-1.5 uppercase rounded mb-6 transform transition-all duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[200ms] ${
            isVisible ? 'opacity-100 translate-x-0 blur-0' : 'opacity-0 translate-x-20 blur-sm'
          }`}>
            Cultura de Garagem
          </span>
          
          {/* 2. Título Principal */}
          <h1 className={`font-black text-5xl md:text-8xl tracking-tighter uppercase italic leading-[0.9] mb-8 text-white transform transition-all duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[500ms] ${
            isVisible ? 'opacity-100 translate-x-0 blur-0' : 'opacity-0 translate-x-24 blur-md'
          }`}>
            Arte sobre <br />
            <span className="text-zinc-400 not-italic border-b-4 border-amber-500 pb-2 inline-block mt-2">
              Duas Rodas.
            </span>
          </h1>
          
          {/* ASSET PARA MOBILE REMOVIDO DAQUI (pois o vídeo já ocupa o fundo inteiro) */}
          
          {/* 4. Bloco de Texto / Manifesto */}
          <div className={`text-zinc-400 text-lg md:text-xl max-w-xl font-medium leading-relaxed space-y-4 mb-10 transform transition-all duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[800ms] ${
            isVisible ? 'opacity-100 translate-x-0 blur-0' : 'opacity-0 translate-x-20 blur-sm'
          }`}>
            <p>
              "Não moldamos apenas metal e couro. Criamos a extensão definitiva da sua liberdade nas estradas."
            </p>
            <p className="text-zinc-500 text-base font-normal leading-relaxed">
              Cada peça que sai do nosso ateliê carrega uma identidade única, unindo a resistência intransigente da fibra de vidro leve com o design brute da cultura custom clássica. Feito à mão para quem não aceita o comum.
            </p>
          </div>

          {/* 5. Botões de Ação */}
          <div className={`flex flex-col sm:flex-row gap-4 w-full sm:w-auto transform transition-all duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[1100ms] ${
            isVisible ? 'opacity-100 translate-x-0 blur-0' : 'opacity-0 translate-x-16 blur-sm'
          }`}>
            <a 
              href="catalogo" 
              className="w-full sm:w-auto text-center px-10 py-5 bg-white text-zinc-950 hover:bg-zinc-900 hover:text-amber-500 border border-transparent hover:border-zinc-800 font-black uppercase tracking-widest text-xs transition-all duration-300"
            >
              Ver o Acervo
            </a>
            <a 
              href="#artesao" 
              className="w-full sm:w-auto text-center px-10 py-5 bg-transparent text-zinc-400 hover:text-amber-500 font-black uppercase tracking-widest text-xs border border-zinc-800 hover:border-amber-500/40 transition-all duration-300"
            >
              O Artesão
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}