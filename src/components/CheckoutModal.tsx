import { useEffect, useState, useCallback } from 'react';
import type { ProductPayment } from '../types/payments';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    price: number;
    code?: string; // Código opcional para o suporte do WhatsApp
  };
}

type CheckoutStatus = 'loading' | 'paying' | 'success';

export function CheckoutModal({ isOpen, onClose, product }: CheckoutModalProps) {
  const [status, setStatus] = useState<CheckoutStatus>('loading');

  // Função isolada para poder ser chamada no clique do "Tentar Novamente"
  const dispararPagamento = useCallback(async () => {
    setStatus('loading');
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

      // Dimensões da janela flutuante
      const largura = 480;
      const altura = 700;
      const esquerda = (window.screen.width / 2) - (largura / 2);
      const topo = (window.screen.height / 2) - (altura / 2);

      const popup = window.open(
        data.initPoint,
        'MercadoPagoCheckout',
        `width=${largura},height=${altura},top=${topo},left=${esquerda},scrollbars=yes,resizable=yes`
      );

      if (!popup || popup.closed || typeof popup.closed === 'undefined') {
        alert('Por favor, libere os popups do seu navegador para prosseguir com o pagamento.');
        setStatus('paying');
        return;
      }

      setStatus('paying');

    } catch (error) {
      console.error('Erro no checkout:', error);
      // Se der erro na API, joga para a tela de aguardo onde ele pode tentar de novo ou chamar wpp
      setStatus('paying');
    }
  }, [product]);

  useEffect(() => {
    if (!isOpen) {
      setStatus('loading');
      return;
    }

    const escutarMensagens = (event: MessageEvent) => {
      if (event.data?.status === 'MERCADOPAGO_SUCCESS') {
        setStatus('success');
      }
    };

    window.addEventListener('message', escutarMensagens);
    dispararPagamento();

    return () => window.removeEventListener('message', escutarMensagens);
  }, [isOpen, dispararPagamento]);

  if (!isOpen) return null;

  // Configuração do WhatsApp de Suporte Direto do Modal
  const WHATSAPP_NUMBER = '5511999999999'; 
  const txtWpp = encodeURIComponent(
    `Olá! Tive um problema ou dúvida ao tentar finalizar o pagamento do produto ${product.name} (Ref: ${product.code || product.id}). Pode me ajudar?`
  );
  const whatsappSuporteUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${txtWpp}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop: Clique fora também fecha o modal agora (Desistência voluntária) */}
      <div 
        className="absolute inset-0 bg-zinc-950/85 backdrop-blur-md transition-all duration-500"
        onClick={onClose} 
      ></div>
      
      {/* Card Central */}
      <div className="relative bg-zinc-900 border border-zinc-800 w-full max-w-md p-8 shadow-2xl text-center select-none rounded-sm transition-all duration-300">
        
        {/* BOTÃO DE FECHAR (X) - Elegante e discreto no canto superior direito */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-200 font-mono text-sm transition-colors p-1"
          aria-label="Fechar modal"
        >
          ✕
        </button>

        {/* INTERFACE 1: CARREGANDO INICIAL */}
        {status === 'loading' && (
          <div className="animate-fade-in py-4">
            <div className="w-12 h-12 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mx-auto mb-6"></div>
            <span className="text-xs font-black tracking-[0.3em] text-amber-500 uppercase block mb-2">Ambiente Seguro</span>
            <h2 className="text-xl font-black text-white uppercase italic tracking-tight mb-2">Conectando...</h2>
            <p className="text-zinc-400 text-xs font-mono max-w-xs mx-auto">Criando requisição com o Mercado Pago.</p>
          </div>
        )}

        {/* INTERFACE 2: AGUARDANDO PAGAMENTO OU FALHA (COM AS DUAS OPÇÕES DE RETORNO) */}
        {status === 'paying' && (
          <div className="animate-fade-in">
            <div className="w-12 h-12 border-2 border-zinc-800 border-t-amber-500 rounded-full animate-spin mx-auto mb-6"></div>
            <span className="text-xs font-black tracking-[0.3em] text-zinc-500 uppercase block mb-2">Aguardando Operação</span>
            <h2 className="text-xl font-black text-white uppercase italic tracking-tight mb-3">Pagamento Iniciado</h2>
            
            <p className="text-zinc-400 text-xs font-mono leading-relaxed max-w-xs mx-auto mb-6">
              Conclua a transação na janela flutuante. Se a janela não abriu ou fechou sem querer, use as ações abaixo:
            </p>
            
            {/* Bloco de botões de ajuste sugeridos */}
            <div className="flex flex-col gap-2 w-full mt-4">
              {/* Botão 1: Tentar Novamente */}
              <button 
                onClick={dispararPagamento}
                className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black uppercase tracking-widest text-xs transition-colors rounded-sm"
              >
                Tentar Novamente (Reabrir Tela)
              </button>

              {/* Botão 2: Suporte via WhatsApp */}
              <a 
                href={whatsappSuporteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-transparent hover:bg-zinc-800 text-zinc-400 hover:text-white font-mono font-bold uppercase tracking-widest text-[10px] transition-all duration-300 border border-zinc-800 hover:border-zinc-700 flex items-center justify-center gap-2 rounded-sm"
              >
                Falar com Suporte no WhatsApp
              </a>
            </div>
          </div>
        )}

        {/* INTERFACE 3: TELA DE AGRADECIMENTO (SUCESSO!) */}
        {status === 'success' && (
          <div className="animate-fade-in flex flex-col items-center">
            <div className="w-16 h-16 bg-amber-500/10 border border-amber-500 text-amber-500 rounded-full flex items-center justify-center text-2xl font-black mb-6">
              ✓
            </div>
            <span className="text-xs font-black tracking-[0.3em] text-amber-500 uppercase block mb-2">Pedido Confirmado</span>
            <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-4">Obrigado!</h2>
            
            <div className="bg-zinc-950/50 p-4 border border-zinc-800/80 font-mono text-left text-xs text-zinc-400 leading-relaxed max-w-sm mb-6 rounded-sm">
              <p className="mb-2 text-zinc-200 font-bold uppercase text-[10px] tracking-wider text-amber-500">Próximos Passos:</p>
              O sistema identificou o pagamento do item <span className="text-white font-medium">{product.name}</span>. 
              Em até <span className="text-white font-bold">1 dia útil</span> entraremos em contato direto para alinhar os detalhes de entrega/customização.
            </div>

            <button 
              onClick={onClose}
              className="w-full py-4 bg-amber-500 hover:bg-amber-400 font-black uppercase tracking-widest text-xs text-zinc-950 transition-colors rounded-sm"
            >
              Voltar ao Acervo
            </button>
          </div>
        )}

      </div>
    </div>
  );
}