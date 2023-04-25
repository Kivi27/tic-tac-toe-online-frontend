import { Room } from './room.type';
import { Player } from './player.types';

export type JoinRoom = {
    room: Room;
    player: Player;
}