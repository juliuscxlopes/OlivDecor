// src/WebSocket/WsRouter.ts
import type { WsResponsePayload } from '../types/TypesApp/AppTypes';

type Handler = (data: any) => void;

class WsRouter {
  private listeners: Map<string, Handler[]> = new Map();

  public subscribe(entity: string, action: string, callback: Handler) {
    const key = `${entity}:${action}`;
    if (!this.listeners.has(key)) this.listeners.set(key, []);
    this.listeners.get(key)?.push(callback);
  }

  public dispatch(message: WsResponsePayload<any>) {
    const key = `${message.entity}:${message.action}`;
    const handlers = this.listeners.get(key);
    if (handlers) handlers.forEach(h => h(message.data));
  }
}

export const wsRouter = new WsRouter();