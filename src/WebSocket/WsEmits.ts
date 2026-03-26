// src/WebSocket/WsEmits.ts
import { socketService } from './WsConfig';


// Definimos a interface do que o perfil espera receber
export interface UpdateProfileDTO {
  nome: string;
  telefone: string;
  password?: string;
}

export const WsEmits = {
  getUserProfile: () => {
    // ADICIONADO: O objeto vazio {} para cumprir o contrato do payload
    socketService.emit('user', 'getUserData', {});
  },

  updateProfile: (data: UpdateProfileDTO) => {
    // O TS agora aceita 'data' como o terceiro argumento (payload)
    socketService.emit('user', 'updateProfile', data);
  }
};
