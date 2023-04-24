import { RoomDto } from '../types/roomDto.type';

export class RoomCard {
    private readonly view: HTMLElement;
    private room: RoomDto;

    constructor(room: RoomDto) {
        this.room = room;
        this.view = this.createCard();
    }

    public createCard(): HTMLElement {
        const room = document.createElement('div');
        room.classList.add('room');
        const titleRoom = document.createElement('p');
        titleRoom.classList.add('room__title');
        titleRoom.textContent = this.room.name
        const labelCountPlayer = document.createElement('p');
        labelCountPlayer.classList.add('room__room__count-player');
        labelCountPlayer.textContent = `${this.room.players.length} / ${this.room.maxCountPlayer}`;
        const joinButton = document.createElement('button');
        joinButton.textContent = 'Join';
        joinButton.classList.add('room__join');
        room.append(titleRoom, labelCountPlayer, joinButton);

        return room;
    }

    public getView(): HTMLElement {
        return this.view;
    }
}