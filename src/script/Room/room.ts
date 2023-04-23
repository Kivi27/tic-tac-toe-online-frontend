import { Player } from '../Player/player';

export class Room {
    private readonly view: HTMLElement;
    private readonly id: string;
    private readonly name: string;
    private players: Player[];
    private readonly MAX_COUNT_PLAYER = 2;

    constructor(id, name, players) {
        this.id = id;
        this.name = name;
        this.players = players;
        this.view = this.createView();
    }

    public getView() {
        return this.view;
    }

    private createView(): HTMLElement {
        const room = document.createElement('div');
        room.classList.add('room');
        const titleRoom = document.createElement('p');
        titleRoom.classList.add('room__title');
        titleRoom.textContent = this.name;
        const labelCountPlayer = document.createElement('p');
        labelCountPlayer.classList.add('room__room__count-player');
        labelCountPlayer.textContent = `${this.players.length} / ${this.MAX_COUNT_PLAYER}`;
        const joinButton = document.createElement('button');
        joinButton.textContent = 'Join';
        joinButton.classList.add('room__join');
        room.append(titleRoom, labelCountPlayer, joinButton);

        return room;
    }
}