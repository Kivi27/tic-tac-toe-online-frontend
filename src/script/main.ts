import { io } from 'socket.io-client';
import { Room } from './types/room.type';
import { RoomCard } from './room-card/room-card';
import { Player } from './types/player.types';
import { JoinRoom } from './types/joinRoom.types';
import { TicTacToeView } from './tic-tac-toe/tic-tac-toe-view';
import { TicTacToe } from './types/ticTacToe.types';

const socket = io('http://localhost:3000');

let roomCards: RoomCard[] = [];
let currentPlayer: Player;
const ticTacToe = new TicTacToeView();

socket.on('getPlayer', (player: Player) => {
    currentPlayer = player;
});

socket.on('updateRooms', (dtoRooms: Room[]) => {
    const roomContainer = document.querySelector('.rooms');

    if (!roomContainer) return;

    roomContainer.replaceChildren();
    roomCards = [];

    dtoRooms.forEach((dtoRoom: Room) => {
        const roomCard = new RoomCard(dtoRoom);
        roomContainer.appendChild(roomCard.getView());
        roomCard.setClickJoin(() => {

            const joinRoomDto: JoinRoom = {
                player: currentPlayer,
                room: dtoRoom,
            };
           socket.emit('joinPlayer', joinRoomDto);
        });

        roomCards.push(roomCard);
    });
});

socket.on('showTicTacToe', (ticTacToeDto: TicTacToe) => {
    console.log(ticTacToeDto);
    showTicTacToe();
});

function showTicTacToe() {
    const container = document.querySelector('.wrapper__container');

    if (!container) return;

    container.replaceChildren();
    container.appendChild(ticTacToe.getView());
}