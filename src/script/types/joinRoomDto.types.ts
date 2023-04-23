import { PlayerDto } from './playerDto.types';

export type JoinRoomDto = {
    roomId: string;
    player: PlayerDto;
}