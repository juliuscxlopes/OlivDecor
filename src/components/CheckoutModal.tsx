import { useEffect, useState } from 'react';
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

// Estados possíveis do fluxo
type CheckoutStatus = 'loading' | 'paying' | 'success';

export function CheckoutModal({ isOpen, onClose, product }: CheckoutModalProps) {
  const [status, setStatus] = useState<CheckoutStatus>('loading');

  useEffect(() => {
    if (!isOpen) {
      setStatus('loading'); // Reseta o estado ao fechar
      return;
    }

    // Ouvinte que escuta se a janela do Mercado Pago avisou que deu certo
    const escutarMensagens = (event: MessageEvent) => {
      if (event.data?.status === 'MERCADOPAGO_SUCCESS') {
        setStatus('success');
      }
    };

    window.addEventListener('message', escutarMensagens);

    async function dispararPagamento() {
      try {
        const paymentPayload: ProductPayment = {
          id: product.id,
          title: product.name,
          price: Number(product.price)
        };

        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ product: paymentPayload })
        });

        const data = await response.json();

        if (!response.ok || !data.initPoint) {
          throw new Error(data.error || 'Falha ao processar checkout');
        }

        // Configuração de tamanho proporcional ideal (Estilo Checkout Slim)
        const largura = 480;
        const altura = 700;
        const esquerda = (window.screen.width / 2) - (largura / 2);
        const topo = (window.screen.height / 2) - (altura / 2);

        // Dispara a janela
        const popup = window.open(
          data.initPoint,
          'MercadoPagoCheckout',
          `width=${largura},height=${altura},top=${topo},left=${esquerda},scrollbars=yes,resizable=yes`
        );

        if (!popup || popup.closed || typeof popup.closed === 'undefined') {
          alert('Por favor, libere os popups do seu navegador para prosseguir.');
          onClose();
          return;
        }

        // Avança o modal para o estado de "Aguardando o pagamento na outra tela"
        setStatus('paying');

      } catch (error) {
        console.error('Erro no checkout:', error);
        alert('Não foi possível iniciar o ambiente de pagamentos.');
        onClose();
      }
    }

    dispararPagamento();

    // Cleanup do event listener ao desmontar
    return () => window.removeEventListener('message', escutarMensagens);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop: Fica trancado com blur rígido e não fecha ao clicar fora se estiver pagando */}
      <div 
        className="absolute inset-0 bg-zinc-950/85 backdrop-blur-md transition-all duration-500"
        onClick={status === 'success' ? onClose : undefined} 
      ></div>
      
      {/* Card Central Premium */}
      <div className="relative bg-zinc-900 border border-zinc-800 w-full max-w-md p-8 shadow-2xl text-center select-none rounded-sm transition-all duration-300">
        
        {/* INTERFACE 1: CARREGANDO INICIAL */}
        {status === 'loading' && (
          <div className="animate-fade-in">
            <div className="w-12 h-12 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mx-auto mb-6"></div>
            <span className="text-xs font-black tracking-[0.3em] text-amber-500 uppercase block mb-2">Ambiente Seguro</span>
            <h2 className="text-xl font-black text-white uppercase italic tracking-tight mb-2">Conectando...</h2>
            <p className="text-zinc-400 text-xs font-mono max-w-xs mx-auto">Criando requisição criptografada.</p>
          </div>
        )}

        {/* INTERFACE 2: AGUARDANDO PAGAMENTO (TELA FICA EMBAÇADA ATRÁS) */}
        {status === 'paying' && (
          <div className="animate-fade-in">
            <div className="w-12 h-12 border-2 border-zinc-700 border-t-amber-500 rounded-full animate-spin mx-auto mb-6"></div>
            <span className="text-xs font-black tracking-[0.3em] text-zinc-500 uppercase block mb-2">Aguardando Operação</span>
            <h2 className="text-xl font-black text-white uppercase italic tracking-tight mb-3">Pagamento em Andamento</h2>
            <p className="text-zinc-400 text-xs font-mono leading-relaxed max-w-xs mx-auto mb-6">
              Conclua o Pix ou Cartão na janela que foi aberta. Esta tela atualizará automaticamente assim que recebermos a confirmação.
            </p>
            
            {/* Escape caso o webhook demore ou o cliente queira forçar a tela de sucesso */}
            <button 
              onClick={() => setStatus('success')}
              className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] font-mono font-bold uppercase tracking-wider rounded-sm transition-colors border border-zinc-700"
            >
              Já realizei o pagamento
            </button>
          </div>
        )}

        {/* INTERFACE 3: TELA DE AGRADECIMENTO (SUCESSO!) */}
        {status === 'success' && (
          <div className="animate-fade-in flex flex-col items-center">
            {/* Ícone de Sucesso Industrial Check */}
            <div className="w-16 h-16 bg-amber-500/10 border border-amber-500 text-amber-500 rounded-full flex items-center justify-center text-2xl font-black mb-6 animate-bounce">
              ✓
            </div>
            <span className="text-xs font-black tracking-[0.3em] text-amber-500 uppercase block mb-2">Pedido Confirmado</span>
            <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-4">Obrigado!</h2>
            
            <div className="bg-zinc-950/50 p-4 border border-zinc-800/80 font-mono text-left text-xs text-zinc-400 leading-relaxed max-w-sm mb-6">
              <p className="mb-2 text-zinc-200 font-bold uppercase text-[10px] tracking-wider text-amber-500">Próximos Passos:</p>
              O sistema identificou o seu pagamento para o item <span className="text-white font-medium">{product.name}</span>. 
              Em até <span className="text-white font-bold">1 dia útil</span> nossa equipe entrará em contato diretamente via WhatsApp ou e-mail para alinhar os detalhes do envio e emissão.
            </div>

            <button 
              onClick={onClose}
              className="w-full py-4 bg-amber-500 hover:bg-amber-400 font-black uppercase tracking-widest text-xs text-zinc-950 transition-colors"
            >
              Voltar ao Acervo
            </button>
          </div>
        )}

      </div>
    </div>
  );
}