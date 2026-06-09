import { useState, useEffect } from 'react';

export function Header() {
  const menuItems = [
    { name: 'Início', href: '#inicio' },
    { name: 'Novidades', href: '#novidades' },
    { name: 'O Artesão', href: '#artesao' },
    { name: 'Catálogo', href: 'catalogo' },
  ];

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-zinc-950/90 backdrop-blur-md shadow-lg border-b border-zinc-900' 
          : 'bg-transparent border-b border-white/5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Identidade Visual / Logo */}
        <a href="#inicio" className="flex items-center gap-3 group focus:outline-none">
          <img 
            src="/src/assets/Gemini_Generated_Image_xkftw8xkftw8xkft.png" 
            alt="OlivDecor" 
            className="w-10 h-10 rounded-full object-cover border border-zinc-800" 
          />
          <div className="text-xl md:text-2xl font-black tracking-tight uppercase italic text-white">
            OlivDecor
            <span className="text-zinc-400 not-italic mx-0.5 inline-block transform group-hover:translate-x-0.5 transition-transform">
              .
            </span>
            <span className="text-zinc-500 font-medium tracking-normal text-lg md:text-xl normal-case not-italic ml-1">
              Ateliê
            </span>
          </div>
        </a>

        {/* Menu de Navegação */}
        <ul className="flex gap-8 items-center">
          {menuItems.map((item) => (
            <li key={item.name}>
              <a 
                href={item.href} 
                className="text-xs md:text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors duration-200 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[2px] after:bottom-[-4px] after:left-0 after:bg-white after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

      </nav>
    </header>
  );
}