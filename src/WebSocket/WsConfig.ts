// src/WebSocket/WsConfig.ts
import Cookies from 'js-cookie';
import { wsRouter } from './WsRouter';
import type { WsResponsePayload, WsEntity, WsAction, WsRequestPayload } from '../types/TypesApp/AppTypes';

const WS_URL = import.meta.env.VITE_API_WS_URL || 'ws://localhost:3000/ws';

class SocketService {
  public ws: WebSocket | null = null;

  public connect(): void {
    if (this.ws?.readyState === WebSocket.OPEN || this.ws?.readyState === WebSocket.CONNECTING) return;

    const token = Cookies.get('web_appliance_token');
    this.ws = new WebSocket(`${WS_URL}?token=${token}`);

    this.ws.onmessage = (event: MessageEvent) => {
      const response: WsResponsePayload<unknown> = JSON.parse(event.data);
      wsRouter.dispatch(response);
    };

    this.ws.onopen = () => console.log('✅ WS Conectado');
    this.ws.onerror = (error) => console.error('❌ WS Erro:', error);
    this.ws.onclose = () => console.log('🔌 WS Fechado');
  }

  /**
   * Única implementação do método emit.
   * O uso de Generic <T> permite passar payloads complexos mantendo a tipagem estrita.
   */
  public emit<T = Record<string, string>>(
    entity: WsEntity, 
    action: WsAction, 
    payload: T
  ): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      // Aqui o WsRequestPayload<T> garante que o payload enviado é do tipo T
      const request: WsRequestPayload<T> = { entity, action, payload };
      this.ws.send(JSON.stringify(request));
    } else {
      console.warn(`⚠️ [WS] Tentativa de emitir ${entity}.${action} com socket fechado.`);
    }
  }

  public disconnect(): void {
    this.ws?.close();
    setTimeout(() => this.connect(), 3000);
    this.ws = null;
  }
}

export const socketService = new SocketService();
