import { Player } from './player.types';

export type Room = {
    id: string;
    name: string;
    players: Player[];
    maxCountPlayer: number;
}