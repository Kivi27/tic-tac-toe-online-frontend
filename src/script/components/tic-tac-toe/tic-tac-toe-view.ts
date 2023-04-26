
export class TicTacToeView {
    private readonly view: HTMLElement;

    private readonly countRow = 3;
    private readonly countColumn = 3;


    public getView(): HTMLElement {
        return this.view;
    }
    constructor() {
        this.view = this.createView();
    }

    private createView(): HTMLElement {
        const container = document.createElement('div');
        container.classList.add('tic-tac-toe');

        for (let i = 0; i < this.countRow; i++) {
            for (let j = 0; j < this.countColumn; j++) {
                const cell = document.createElement('button');
                cell.classList.add('tic-tac-toe__cell');
                container.appendChild(cell);
            }
        }

        return container;
    }
}