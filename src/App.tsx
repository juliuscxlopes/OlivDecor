// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { Catalog } from './pages/Catalog';
import { ProductDetail } from './pages/ProductDetail';

function App() {
  return (
    <>
      <Routes>
        {/* Rota Pública Inicial */}
        <Route path="/" element={<Home />} />
        
        {/* Nova Rota: Catálogo Completo */}
        <Route path="/catalogo" element={<Catalog />} />
        
        {/* Nova Rota: Detalhe do Produto Dinâmico */}
        <Route path="/produto/:id" element={<ProductDetail />} />
      </Routes>
    </>
  );
}

export default App;