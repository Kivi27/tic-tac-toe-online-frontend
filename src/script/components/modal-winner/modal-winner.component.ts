export class ModalWinnerComponent {
    private readonly view: HTMLElement;
    private readonly clickButton: () => void;

    constructor(winText: string, buttonLabel: string, clickButton: () => void) {
        this.view = this.createView(winText, buttonLabel);
        this.clickButton = clickButton;
    }

    public getView(): HTMLElement {
        return this.view;
    }

    private createView(winText: string, buttonLabel: string): HTMLElement {
        const modal = document.createElement('div');
        const content = document.createElement('div');
        const text = document.createElement('p');
        const okButton = document.createElement('button');

        modal.classList.add('modal');
        content.classList.add('modal__content');
        okButton.classList.add('modal__button');

        content.append(text, okButton);
        modal.append(content);

        text.textContent = winText;
        okButton.textContent = buttonLabel;

        okButton.addEventListener('click', () => this.clickButton());

        return modal;
    }
}