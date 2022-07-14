import { Player } from '../types/api/player';
import { getRequestInstance } from './request';

export namespace PlayerApi {
  export const getPlayer = async (): Promise<Player> => {
    const res = await getRequestInstance().get('api/player');
    return res.data;
  };
}