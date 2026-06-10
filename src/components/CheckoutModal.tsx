import { useEffect } from 'react';
import type { ProductPayment } from '../types/payments';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    price: number;
  };
}

export function CheckoutModal({ isOpen, onClose, product }: CheckoutModalProps) {
  
  useEffect(() => {
    if (!isOpen) return;

    async function dispararPagamento() {
      try {
        // 1. Estrutura o payload convertendo o 'name' do front para o 'title' que o MP exige
        const paymentPayload: ProductPayment = {
          id: product.id,
          title: product.name,
          price: Number(product.price)
        };

        // 2. Dispara a requisição para a sua API no Express/Railway
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify({ product: paymentPayload })
        });

        const data = await response.json();

        if (!response.ok || !data.initPoint) {
          throw new Error(data.error || 'Falha ao processar checkout');
        }

        // 3. ENGENHARIA DE CENTRALIZAÇÃO DO POPUP
        const largura = 500;
        const altura = 750;
        
        // Descobre o centro exato da tela física do usuário
        const esquerda = (window.screen.width / 2) - (largura / 2);
        const topo = (window.screen.height / 2) - (altura / 2);

        // Abre a meia-tela flutuante e focada
        const popup = window.open(
          data.initPoint,
          'MercadoPagoCheckout',
          `width=${largura},height=${altura},top=${topo},left=${esquerda},scrollbars=yes,resizable=yes`
        );

        // Alerta de segurança caso o navegador do usuário trave janelas externas
        if (!popup || popup.closed || typeof popup.closed === 'undefined') {
          alert('O bloqueador de popups do seu navegador barrou a janela de pagamento. Por favor, autorize popups para este site.');
        }

        // Fecha o modal de transição do React logo após abrir o checkout
        onClose();

      } catch (error) {
        console.error('Erro no fluxo do CheckoutModal:', error);
        alert('Não foi possível conectar ao ambiente de pagamentos. Tente novamente.');
        onClose();
      }
    }

    dispararPagamento();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop: Fundo escurecido com desfoque de cinema */}
      <div 
        className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md transition-opacity duration-300" 
        onClick={onClose}
      ></div>
      
      {/* Moldura Central Premium */}
      <div className="relative bg-zinc-900 border border-zinc-800 w-full max-w-md p-8 shadow-2xl text-center select-none rounded-sm">
        
        {/* Loader Radial Minimalista */}
        <div className="w-12 h-12 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mx-auto mb-6"></div>
        
        <span className="text-xs font-black tracking-[0.3em] text-amber-500 uppercase block mb-2">
          Ambiente Blindado
        </span>
        
        <h2 className="text-xl font-black text-white uppercase italic tracking-tight mb-4">
          Conectando ao Gateway
        </h2>
        
        <p className="text-zinc-400 text-xs font-mono leading-relaxed max-w-xs mx-auto">
          Preparando a requisição para o item <span className="text-zinc-200 font-bold">{product.name}</span>. Uma nova janela segura será aberta em instantes.
        </p>

        <div className="mt-8 pt-4 border-t border-zinc-800/50 text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
          Não atualize ou feche esta página
        </div>
      </div>
    </div>
  );
}