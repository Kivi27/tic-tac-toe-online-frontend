import { RoomDto } from './roomDto.type';
import { PlayerDto } from './playerDto.types';

export type JoinRoomDto = {
    room: RoomDto;
    player: PlayerDto;
}