// src/services/mercadoPago.ts
import type { ProductPayment } from '../types/payments';

// Define o tipo do SDK do Mercado Pago direto no window, eliminando o 'any'
declare global {
  interface Window {
    MercadoPago?: new (publicKey: string, options: { locale: string }) => {
      checkout: (options: { preference: { id: string }; autoOpen: boolean }) => void;
    };
  }
}

export const mercadoPagoService = {
  async initCheckoutPro(product: ProductPayment): Promise<void> {
    try {
      // 1. Chama a sua rota do Railway
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product }),
      });

      const data = await response.json();

      // 2. Resgata o SDK tipado do window e abre o modal de forma segura
      const MercadoPagoSDK = window.MercadoPago;
      
      if (MercadoPagoSDK && data.preferenceId) {
        const mp = new MercadoPagoSDK(import.meta.env.VITE_MP_PUBLIC_KEY, {
          locale: 'pt-BR'
        });

        mp.checkout({
          preference: { id: data.preferenceId },
          autoOpen: true 
        });
      }
    } catch (error) {
      console.error('Erro ao abrir checkout:', error);
    }
  }
};