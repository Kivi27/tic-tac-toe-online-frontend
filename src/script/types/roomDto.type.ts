import { PlayerDto } from './playerDto.types';

export type RoomDto = {
    id: string;
    name: string;
    players: PlayerDto[];
    maxCountPlayer: number;
}