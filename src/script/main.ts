import { io } from 'socket.io-client';
import { RoomDto } from './types/roomDto.type';
import { RoomCard } from './room-card/room-card';
import { PlayerDto } from './types/playerDto.types';
import { JoinRoomDto } from './types/joinRoomDto.types';

const socket = io('http://localhost:3000');

let roomCards: RoomCard[] = [];
let currentPlayer: PlayerDto;

socket.on('getPlayer', (player: PlayerDto) => {
    currentPlayer = player;
});

socket.on('updateRooms', (dtoRooms: RoomDto[]) => {
    const roomContainer = document.querySelector('.rooms');

    if (!roomContainer) return;

    roomContainer.replaceChildren();
    roomCards = [];

    dtoRooms.forEach((dtoRoom: RoomDto) => {
        const roomCard = new RoomCard(dtoRoom);
        roomContainer.appendChild(roomCard.getView());
        roomCard.setClickJoin(() => {

            const joinRoomDto: JoinRoomDto = {
                player: currentPlayer,
                room: dtoRoom,
            };

           socket.emit('joinPlayer', joinRoomDto);
        });

        roomCards.push(roomCard);

    });
});
