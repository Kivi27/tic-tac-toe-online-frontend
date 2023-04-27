import { Room } from '../../types/room.type';

export class RoomCardComponent {
    private readonly view: HTMLElement;
    private room: Room;
    private clickJoin: () => void;

    constructor(room: Room) {
        this.room = room;
        this.clickJoin = () => {};
        this.view = this.createView();
    }

    public setClickJoin(callBack: () => void): void {
        this.clickJoin = callBack;
    }

    public createView(): HTMLElement {
        const room = document.createElement('div');
        const titleRoom = document.createElement('p');
        const labelCountPlayer = document.createElement('p');
        const joinButton = document.createElement('button');

        room.append(titleRoom, labelCountPlayer, joinButton);

        room.classList.add('room');
        titleRoom.classList.add('room__title');
        labelCountPlayer.classList.add('room__room__count-player');
        joinButton.classList.add('room__join');

        titleRoom.textContent = this.room.name;
        labelCountPlayer.textContent = `${this.room.players.length} / ${this.room.maxCountPlayer}`;
        joinButton.textContent = 'Join';

        joinButton.addEventListener('click', () => this.clickJoin());

        return room;
    }

    public getView(): HTMLElement {
        return this.view;
    }
}