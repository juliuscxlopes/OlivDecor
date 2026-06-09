// src/components/home/Frame1Products.tsx
import { useState, useEffect } from 'react';

export function Frame1Products() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Aumentamos o tempo de troca para 8 segundos para uma leitura confortável do copy encorpado
  useEffect(() => {
    const timer = setInterval(() => {
      // Loop por 3 slides (0, 1, 2)
      setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1));
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center bg-zinc-950 select-none overflow-hidden">
      
      {/* ------------------------------------------------------------- */}
      {/* BANNER 1: ESTILO E CULTURA (TEMA: DNA VINTAGE & ATITUDE) */}
      {/* ------------------------------------------------------------- */}
      <div
        className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out flex items-center ${
          currentSlide === 0 
            ? "opacity-100 translate-x-0 scale-100 z-10" 
            : "opacity-0 -translate-x-8 scale-95 pointer-events-none"
        }`}
      >
        {/* Background customizado para o Banner 1 */}
        <div className="absolute inset-0 w-full h-full bg-zinc-950">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-zinc-950 opacity-80"></div>
          {/* Textura sutil de asfalto/estrada */}
          <div className="absolute inset-0 opacity-15 mix-blend-overlay bg-cover bg-center" style={{ backgroundImage: "url('/textures/dark-asphalt.jpg')" }}></div>
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-transparent"></div>
        </div>

        {/* Conteúdo Banner 1: Alinhamento refinado mt-20 */}
        <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10 mt-20">
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Tag Premium Laranja (Amber) igual ao Artesão */}
            <span className="inline-block text-xs font-black tracking-widest text-amber-500 uppercase bg-amber-950/20 border border-amber-800/60 px-4 py-1.5 mb-5 rounded-sm">
              CULTURA DE GARAGEM
            </span>
            {/* Ajustado o leading e o pb para a linha separadora não sobrepor as letras */}
            <h2 className="font-black text-5xl md:text-8xl tracking-tighter uppercase italic max-w-2xl leading-none md:leading-[1.05] mb-6 text-white">
              Visual Retrô. <span className="text-zinc-400 block md:inline border-b-4 border-zinc-800 pb-3">Atitude Custom.</span>
            </h2>
            <p className="text-zinc-400 text-lg md:text-xl max-w-lg font-medium leading-relaxed mb-10">
              Muito além da segurança. É sobre bom gosto e personalidade. Cascos custom vintage, conforto premium respirável e o visual retrô que combina perfeitamente com a sua moto.
            </p>
            <div className="flex flex-wrap gap-4 w-full sm:w-auto mb-16 lg:mb-0">
              {/* Adicionado hover com tom laranja do projeto */}
              <a href="catalogo" className="w-full sm:w-auto text-center px-10 py-5 bg-white hover:bg-amber-500 text-zinc-950 font-black uppercase tracking-widest text-xs transition-all duration-300 shadow-xl">
                Ver Acervo Vintage
              </a>
              {/* Sem função/Link limpo no momento */}
              <a href="https://wa.me/+553198446035?text=ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20Capacetes%20custom%20personalizados.." className="w-full sm:w-auto text-center px-10 py-5 bg-transparent hover:bg-zinc-900 text-zinc-400 hover:text-white font-black uppercase tracking-widest text-xs border border-zinc-800 hover:border-zinc-500 transition-all duration-300">
                Chamar no WhatsApp {/* TODO: Implementar link para WhatsApp */}
              </a>
            </div>
          </div>

          {/* Elemento Gráfico Banner 1: Roda de Moto Custom */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-80 h-80 md:w-[420px] md:h-[420px] flex items-center justify-center opacity-30 hover:opacity-50 transition-opacity duration-700 pointer-events-none">
              <svg className="w-full h-full text-zinc-700" viewBox="0 0 512 512" fill="none" stroke="currentColor" strokeWidth="6">
                <circle cx="256" cy="256" r="200" strokeWidth="28" strokeDasharray="15 10" />
                <circle cx="256" cy="256" r="170" strokeWidth="4" />
                <circle cx="256" cy="256" r="40" fill="currentColor" />
                {[...Array(24)].map((_, i) => (
                  <line 
                    key={i} 
                    x1="256" 
                    y1="256" 
                    x2={256 + 170 * Math.cos((i * 15 * Math.PI) / 180)} 
                    y2={256 + 170 * Math.sin((i * 15 * Math.PI) / 180)} 
                    strokeWidth="2"
                    opacity="0.6"
                  />
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* BANNER 2: O PRODUTO (TEMA: LIBERDADE & ESTRADA) */}
      {/* ------------------------------------------------------------- */}
      <div
        className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out flex items-center ${
          currentSlide === 1 
            ? "opacity-100 translate-x-0 scale-100 z-10" 
            : "opacity-0 translate-x-8 scale-95 pointer-events-none"
        }`}
      >
        {/* Background customizado para o Banner 2 */}
        <div className="absolute inset-0 w-full h-full bg-zinc-950">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-zinc-900/60 via-zinc-950 to-zinc-950"></div>
          <div className="absolute inset-0 opacity-10 mix-blend-color-dodge bg-cover bg-center" style={{ backgroundImage: "url('/textures/garage-wall.jpg')" }}></div>
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent"></div>
        </div>

        {/* Conteúdo Banner 2: Alinhamento mt-20 */}
        <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10 mt-20">
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <span className="inline-block text-xs font-black tracking-widest text-amber-500 uppercase bg-amber-950/20 border border-amber-800/60 px-4 py-1.5 mb-5 rounded-sm">
              EDIÇÃO LIMITADA
            </span>
            {/* Ajustado leading e pb */}
            <h2 className="font-black text-5xl md:text-8xl tracking-tighter uppercase italic max-w-2xl leading-none md:leading-[1.05] mb-6 text-white">
              Vista sua <span className="text-zinc-100 border-b-4 border-zinc-700 block md:inline pb-3">Liberdade</span>
            </h2>
            <p className="text-zinc-400 text-lg md:text-xl max-w-lg font-medium leading-relaxed mb-10">
              Engenharia robusta, conforto respirável. Cada curva da cidade com classe e atitude. Feito pra quem viaja pelo tempo, não apenas pelo asfalto.
            </p>
            <div className="flex flex-wrap gap-4 w-full sm:w-auto mb-16 lg:mb-0">
              {/* Apontando para o catálogo com hover laranja */}
              <a href="catalogo" className="w-full sm:w-auto text-center px-10 py-5 bg-white hover:bg-amber-500 text-zinc-950 font-black uppercase tracking-widest text-xs transition-all duration-300 shadow-xl">
                Ver Modelos Custom
              </a>
              {/* Sem função/Link limpo no momento */}
              <a href="https://wa.me/55DDDSEUNUMERO?text=ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20Capacetes%20custom%20personalizados.." className="w-full sm:w-auto text-center px-10 py-5 bg-transparent hover:bg-zinc-900 text-zinc-400 hover:text-white font-black uppercase tracking-widest text-xs border border-zinc-800 hover:border-zinc-500 transition-all duration-300">
                Detalhes no WhatsApp {/* Link Whatsapp */}
              </a>
            </div>
          </div>

          {/* Elemento Gráfico Banner 2: O Capacete Imponente */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-85 h-85 md:w-[480px] md:h-[480px] flex items-center justify-center opacity-60 hover:opacity-80 transition-all duration-700">
              <div className="absolute w-72 h-72 md:w-96 md:h-96 bg-zinc-800/20 rounded-full blur-3xl pointer-events-none"></div>
              <svg className="w-full h-full text-zinc-400" viewBox="0 0 512 512" fill="none" >
                <path d="M256,40 C120,40 40,130 40,260 C40,320 60,370 100,410 L150,390 L140,320 L105,310 C95,290 90,270 90,250 C90,150 160,88 256,88 C352,88 422,150 422,250 C422,270 417,290 407,310 L372,320 L362,390 L412,410 C452,370 472,320 472,260 C472,130 392,40 256,40 Z" fill="#18181b" />
                <path d="M256,50 C135,50 55,135 55,255 C55,305 72,350 102,385 L145,365 L135,300 C115,250 120,180 170,140 C210,108 302,108 342,140 C392,180 397,250 377,300 L367,365 L410,385 C440,350 457,305 457,255 C457,135 377,50 256,50 Z" fill="#27272a" stroke="#52525b" strokeWidth="4" />
                <path d="M102,385 L145,365 L135,300 C125,275 125,240 130,220" stroke="#d4d4d8" strokeWidth="5" strokeLinecap="round" />
                <path d="M410,385 L367,365 L377,300 C387,275 387,240 382,220" stroke="#d4d4d8" strokeWidth="5" strokeLinecap="round" />
                <path d="M125,210 C125,120 180,95 256,95 C332,95 387,120 387,210" stroke="#e4e4e7" strokeWidth="8" strokeLinecap="round" />
                <path d="M120,220 C110,350 180,410 256,410 C332,410 402,350 392,220 C392,190 360,185 256,185 C152,185 120,190 120,220 Z" fill="#ffffff" fillOpacity="0.06" stroke="#a1a1aa" strokeWidth="3" />
                <path d="M340,240 C360,270 360,320 330,350" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.2" />
                <path d="M355,255 C370,280 370,310 350,330" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.15" />
                <circle cx="145" cy="195" r="7" fill="#d4d4d8" stroke="#27272a" strokeWidth="2" />
                <circle cx="256" cy="108" r="7" fill="#d4d4d8" stroke="#27272a" strokeWidth="2" />
                <circle cx="367" cy="195" r="7" fill="#d4d4d8" stroke="#27272a" strokeWidth="2" />
                <path d="M175,350 C200,370 312,370 337,350" stroke="#3f3f46" strokeWidth="12" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* BANNER 3: NOVO SLIDE (TEMA: DNA CUSTOM & FRENTE HARLEY SVG) */}
      {/* ------------------------------------------------------------- */}
      <div
        className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out flex items-center ${
          currentSlide === 2 
            ? "opacity-100 translate-x-0 scale-100 z-10" 
            : "opacity-0 translate-x-8 scale-95 pointer-events-none"
        }`}
      >
        {/* Background customizado para o Banner 3 */}
        <div className="absolute inset-0 w-full h-full bg-zinc-950">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/40 via-zinc-950 to-zinc-950 opacity-80"></div>
          <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-cover bg-center" style={{ backgroundImage: "url('/textures/garage-wall.jpg')" }}></div>
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-transparent"></div>
        </div>

        {/* Conteúdo Banner 3: Alinhamento mt-20 */}
        <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10 mt-20">
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <span className="inline-block text-xs font-black tracking-widest text-amber-500 uppercase bg-amber-950/20 border border-amber-800/60 px-4 py-1.5 mb-5 rounded-sm">
              DNA CUSTOM
            </span>
            {/* Ajustado leading e pb */}
            <h2 className="font-black text-5xl md:text-8xl tracking-tighter uppercase italic max-w-2xl leading-none md:leading-[1.05] mb-6 text-white">
              Classe. Conforto. <span className="text-zinc-400 block md:inline border-b-4 border-zinc-800 pb-3">Atitude.</span>
            </h2>
            <p className="text-zinc-400 text-lg md:text-xl max-w-lg font-medium leading-relaxed mb-10">
              Proteção que tem classe. Conforto respirável que tem style. Onde a cultura da garagem encontra o DNA bruto das estradas.
            </p>
            <div className="flex flex-wrap gap-4 w-full sm:w-auto mb-16 lg:mb-0">
              {/* Direcionando ambos para o catálogo conforme solicitado, adicionando o hover correspondente */}
              <a href="https://wa.me/55DDDSEUNUMERO?text=ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20Capacetes%20custom%20personalizados.." className="w-full sm:w-auto text-center px-10 py-5 bg-white hover:bg-amber-500 text-zinc-950 font-black uppercase tracking-widest text-xs transition-all duration-300 shadow-xl">
                Conhecer a Oficina {/* TODO: Link Whatsapp + Agendamento */}
              </a>
              <a href="catalogo" className="w-full sm:w-auto text-center px-10 py-5 bg-transparent hover:bg-zinc-900 text-zinc-400 hover:text-white font-black uppercase tracking-widest text-xs border border-zinc-800 hover:border-zinc-500 transition-all duration-300">
                Ver Acervo Premium 
              </a>
            </div>
          </div>

          {/* Elemento Gráfico Banner 3: Frente de Harley SVG Maior e Imponente */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-85 h-85 md:w-[480px] md:h-[480px] flex items-center justify-center opacity-40 hover:opacity-60 transition-all duration-700 pointer-events-none">
              <div className="absolute w-72 h-72 md:w-96 md:h-96 bg-amber-900/15 rounded-full blur-3xl"></div>
              <svg className="w-full h-full text-zinc-600 filter drop-shadow-[0_15px_30px_rgba(255,255,255,0.05)]" viewBox="0 0 512 512" fill="none" >
                <path d="M256,120 C140,120 40,180 40,320 C40,400 60,460 100,500 L150,480 L140,410 L105,400 C95,380 90,360 90,340 C90,240 160,178 256,178 C352,178 422,240 422,340 C422,360 417,380 407,400 L372,410 L362,480 L412,500 C452,460 472,400 472,320 C472,180 372,120 256,120 Z" fill="#18181b" />
                <path d="M256,130 C180,130 160,80 120,80 C60,80 30,130 30,130 L40,140 C40,140 70,100 120,100 C150,100 170,140 256,140 C342,140 362,100 392,100 C442,100 472,140 472,140 L482,130 C482,130 452,80 392,80 C352,80 332,130 256,130 Z" fill="#a1a1aa" stroke="#3f3f46" strokeWidth="2" />
                <path d="M120,140 L160,140 L160,500 L120,500 Z" fill="#27272a" stroke="#52525b" strokeWidth="3" />
                <path d="M352,140 L392,140 L392,500 L352,500 Z" fill="#27272a" stroke="#52525b" strokeWidth="3" />
                <circle cx="256" cy="420" r="110" fill="#27272a" stroke="#52525b" strokeWidth="4" />
                <circle cx="256" cy="420" r="100" stroke="#d4d4d8" strokeWidth="16" strokeDasharray="15 10" />
                <circle cx="256" cy="420" r="40" fill="#a1a1aa" stroke="#3f3f46" strokeWidth="2" />
                <circle cx="165" cy="185" r="40" fill="#ffffff" stroke="#d4d4d8" strokeWidth="4" />
                <circle cx="347" cy="185" r="40" fill="#ffffff" stroke="#d4d4d8" strokeWidth="4" />
                <circle cx="256" cy="195" r="50" fill="#ffffff" stroke="#d4d4d8" strokeWidth="4" />
                <path d="M175,250 C180,220 220,210 256,210 C292,210 332,220 337,250 L310,310 L202,310 Z" fill="#3f3f46" stroke="#52525b" strokeWidth="3" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Indicadores de Navegação REPOSICIONADOS: Agora perfeitamente centralizados horizontalmente abaixo do conteúdo */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-4 pointer-events-auto">
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 transition-all duration-500 rounded-sm ${
              index === currentSlide ? "w-16 bg-white shadow-lg" : "w-8 bg-zinc-800 hover:bg-zinc-600"
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}