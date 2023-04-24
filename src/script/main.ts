import { io } from 'socket.io-client';
import { RoomDto } from './types/roomDto.type';
import { RoomCard } from './room-card/room-card';

const socket = io('http://localhost:3000');

let roomCards: RoomCard[] = [];
socket.on('updateRooms', (dtoRooms: RoomDto[]) => {
    const roomContainer = document.querySelector('.rooms');

    if (!roomContainer) return;

    roomContainer.replaceChildren();
    roomCards = [];

    dtoRooms.forEach((dtoRoom: RoomDto) => {
        const roomCard = new RoomCard(dtoRoom);
        roomCards.push(roomCard);
        roomContainer.appendChild(roomCard.getView());
    });
});
