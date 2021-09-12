class Card {
    static all = [];

    constructor(data) {
        this.data = data;
        this.constructor.all.push(this);
    }

    renderCard = () => {
        const {phrase, definition, id} = this.data;
        document.getElementById("card-row").innerHTML += `
        <div class="col-sm-4">
            <div class="card-card">
                <div class="card-body">
                    <div class="card-title">${phrase}</div>
                    <div class="card-text">${definition}</div>
                    <a href="#" id="view-card" data-id="${id}" class="btn btn-primary">Flip</a>
                </div>
            </div>
        </div>`
        document.querySelectorAll(`[data-id]`).forEach(button => {
            button.addEventListener("click", Card.handleIndexClick);
        });
    }

    static find = (id) => this.all.find(card => card.data.id == id);

    static handleIndexClick = (e) => {
        const id = e.target.dataset.id;
        this.find(id).renderShow();
    }

    static renderContainer = () => {
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("card-container");

        const cardRow = document.createElement("div");
        cardRow.classList.add("row");
        cardRow.id = "card-row";
        cardContainer.appendChild(cardRow);
        
        const main = document.getElementById("main");
        main.appendChild(cardContainer);
        this.all.forEach(card => card.renderCard());
    }

    static getCards = () => {
        api.getCards().then(cards => {
            cards.forEach(card => new Card(card));
            this.renderContainer();
        })
    }

}