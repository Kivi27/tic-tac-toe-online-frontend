import { TicTacToe } from '../../types/ticTacToe.types';

export class TicTacToeComponent {
    private readonly id: string;
    private readonly view: HTMLElement;
    private readonly countRow: number = 3;
    private readonly countColumn: number = 3;

    constructor(
        private readonly ticTacToeDto: TicTacToe,
        private readonly click: (xCoordinate: number, yCoordinate: number) => void,
    ) {
        this.id = ticTacToeDto.id;
        this.view = this.createView(ticTacToeDto);
    }

    public getView(): HTMLElement {
        return this.view;
    }

    public getId(): string {
        return this.id;
    }

    private createView(ticTacToe: TicTacToe): HTMLElement {
        const container = document.createElement('div');
        container.classList.add('tic-tac-toe');

        for (let i = 0; i < this.countRow; i++) {
            for (let j = 0; j < this.countColumn; j++) {
                const buttonCell = document.createElement('button');
                buttonCell.textContent = ticTacToe.field[i][j];
                buttonCell.classList.add('tic-tac-toe__cell');

                buttonCell.addEventListener('click', () => {
                   this.click(i, j);
                });

                container.appendChild(buttonCell);
            }
        }

        return container;
    }
}