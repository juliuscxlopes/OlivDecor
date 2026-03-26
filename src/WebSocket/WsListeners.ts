// src/WebSocket/WsListeners.ts
import { wsRouter } from './WsRouter';
import type { UserProfile } from '../types/TypesApp/AppTypes';

export const WsListeners = {
  /**
   * Escuta a resposta de dados do usuário
   * Backend emite: entity: 'user', action: 'ResUserData'
   */
  onUserProfileLoaded: (callback: (profile: UserProfile) => void) => {
    console.log("👂 [Listener] Aguardando 'user:ResUserData'...");
    
    wsRouter.subscribe('user', 'ResUserData', (data) => {
      console.log("✅ [Listener] Dados recebidos com sucesso!");
      callback(data as UserProfile);
    });
  },

    // Adicione este método ao WsListeners
    onRegistrationFinalized: (callback: (profile: UserProfile) => void) => {
    wsRouter.subscribe('user', 'RegistrationFinalized', (data) => {
      // Aqui fazemos o cast para garantir que o dado siga a interface
      callback(data as UserProfile);
    });
  },

  onUpdateContactRequired: (callback: () => void) => {
    wsRouter.subscribe('user', 'UpdateContactRequired', () => {
      callback();
    });
  }

};