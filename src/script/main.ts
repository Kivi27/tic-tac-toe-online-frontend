import { io } from 'socket.io-client';
import { RoomDto } from './types/roomDto.type';
import { RoomCard } from './room-card/room-card';
import { PlayerDto } from './types/playerDto.types';
import { JoinRoomDto } from './types/joinRoomDto.types';
import { TicTacToe } from './tic-tac-toe/tic-tac-toe';
import { TicTacToeDto } from './types/ticTacToeDto.types';

const socket = io('http://localhost:3000');

let roomCards: RoomCard[] = [];
let currentPlayer: PlayerDto;
const ticTacToe: TicTacToe = new TicTacToe();

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

socket.on('showTicTacToe', (ticTacToeDto: TicTacToeDto) => {
    console.log(ticTacToeDto);
    showTicTacToe();
});

function showTicTacToe() {
    const container = document.querySelector('.wrapper__container');

    if (!container) return;

    container.replaceChildren();
    container.appendChild(ticTacToe.getView());
}