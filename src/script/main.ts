import { io } from 'socket.io-client'
import { Room } from './Room/room';

const socket = io('http://localhost:3000');

socket.on('initial_room', (dtoRooms) => {
    const roomsContainer = document.querySelector('.rooms');

    if (!roomsContainer) return;

    const rooms:Room[] = initRooms(dtoRooms);

    rooms.forEach((room: Room) => {
        roomsContainer.append(room.getView());
    });
});

function initRooms(dtoRooms): Room[] {
    const rooms: Room[] = [];
    dtoRooms.forEach((dtoRoom) => {
        const room = new Room(dtoRoom.id, dtoRoom.name, dtoRoom.players);
        rooms.push(room);
    });

    return rooms;
}
