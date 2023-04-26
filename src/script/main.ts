import { io } from 'socket.io-client';
import { Room } from './types/room.type';
import { RoomCardComponent } from './components/room-card/room-card.component';
import { Player } from './types/player.types';
import { JoinRoom } from './types/joinRoom.types';
import { TicTacToeComponent } from './components/tic-tac-toe/tic-tac-toe.component';
import { TicTacToe } from './types/ticTacToe.types';
import { ClickCell } from './types/clickCell';

const socket = io('http://localhost:3000');

let roomCards: RoomCardComponent[] = [];
let currentRoomId: string;
let currentPlayer: Player;

socket.on('getPlayer', (player: Player) => {
    currentPlayer = player;
});

socket.on('updateRooms', (dtoRooms: Room[]) => {
    const roomContainer = document.querySelector('.rooms');

    if (!roomContainer) return;

    roomContainer.replaceChildren();
    roomCards = [];

    dtoRooms.forEach((dtoRoom: Room) => {
        const roomCard = new RoomCardComponent(dtoRoom);
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

socket.on('createOrUpdateTicTacToe', (ticTacToeDto: TicTacToe) => {
    createOrUpdateTicTacToe(ticTacToeDto);
});

socket.on('getCurrentRoom', (currentRoom) => {
    currentRoomId = currentRoom;
});

socket.on('winner', (player: Player) => {
   console.log(player);
});

socket.on('playerExitLobby', () => location.reload());

function createOrUpdateTicTacToe(ticTacToeDto: TicTacToe) {
    const container = document.querySelector('.wrapper__container');

    if (!container) return;

    const ticTacToe = new TicTacToeComponent(ticTacToeDto, (selectedRow: number, selectedColumn: number) => {
        const clickCell: ClickCell = {
            ticTacToeId: ticTacToe.getId(),
            playerId: currentPlayer.id,
            roomId: currentRoomId,
            selectRow: selectedRow,
            selectColumn: selectedColumn,
        };

        socket.emit('clickCell', clickCell);
    });

    container.replaceChildren();
    container.appendChild(ticTacToe.getView());
}