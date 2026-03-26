// Defina a interface aqui em cima
interface HomeProps {
  onOpenLogin: () => void;
}

// Use a interface para tipar o componente
export function Home({ onOpenLogin }: HomeProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-5xl font-black text-slate-900 tracking-tighter">
        Web Appliance
      </h1>
      <button 
        onClick={onOpenLogin}
        className="mt-8 px-8 py-3 bg-slate-900 text-white rounded-full font-bold hover:scale-105 transition-transform"
      >
        Acessar Plataforma
      </button>
    </div>
  );
}