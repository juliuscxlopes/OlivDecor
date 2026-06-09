// src/pages/Home.tsx
import { Header } from '../components/Header';
import { Frame0Hero } from '../components/home/Frame0Hero';
import { Frame1Products } from '../components/home/FrameProducts1'; // FIX: Nome do arquivo corrigido aqui
import { Frame2Artesao } from '../components/home/Frame2Artesao';

export function Home() {
  return (
    <main className="snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth bg-zinc-950">
      <Header />

      {/* FRAME 0: HERO */}
      <section 
        id="inicio" 
        className="h-screen w-full flex flex-col justify-center items-center snap-start bg-zinc-950 relative overflow-hidden" // FIX: min-h-screen alterado para h-screen
      >
        <Frame0Hero />
      </section>

      {/* FRAME 1: BANNER ROTATIVO (PRODUTOS) */}
      <section 
        id="novidades" 
        className="h-screen w-full flex flex-col justify-center items-center snap-start bg-zinc-950 relative overflow-hidden" // FIX: min-h-screen alterado para h-screen
      >
        {/* Textura de Juta de fundo */}
        <div className="absolute inset-0 opacity-10 bg-[url('/textures/juta.png')] pointer-events-none z-20"></div>
        
        {/* Renderiza o carrossel ocupando o frame inteiro */}
        <Frame1Products />
      </section>

      {/* FRAME 2: O ARTESÃO */} 
      <section 
        id="artesao" 
        className="h-screen w-full flex flex-col justify-center items-center snap-start bg-zinc-950 text-white relative overflow-hidden border-t border-zinc-900" // FIX: min-h-screen alterado para h-screen
      >
        {/* Mantém a consistência de fundo da oficina sem quebrar o snap */}
        <Frame2Artesao />
      </section>
    </main>
  );
}