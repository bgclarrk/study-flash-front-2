class Card {
    static all = [];

    constructor(data) {
        this.data = data;
        this.constructor.all.push(this);
    }

    flipCard = (e) => {
        let card = Card.all.find(card => card.data.id == e.target.dataset.id)
        if (e.target.innerHTML === "Click to See Definition") {
            e.target.innerHTML = `${card.data.definition}`;
        } else {
            e.target.innerHTML = "Click to See Definition";
        }
        e.target.addEventListener("click")
    }

    renderCard = () => {
        const {phrase, definition, id} = this.data;
        document.getElementById("card-row").innerHTML += `
        <div class="col-sm-4">
            <div class="card-card">
                <div class="card-body">
                    <div class="card-title">${phrase}</div>
                    <div class="card-text definition" data-id="${id}">
                        Click to See Definition
                    </div>
                </div>
            </div>
        </div>`
        document.querySelectorAll(`.definition`).forEach(definition => {
            definition.addEventListener("click", Card.handleFlipClick);
        });
    }

    static find = (id) => this.all.find(card => card.data.id == id);

    static handleFlipClick = (e) => {
        const id = e.target.dataset.id;
        this.find(id).flipCard(e);
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
        if (Card.all.length == 0) {
            api.getCards().then(cards => {
                cards.forEach(card => new Card(card));
                this.renderContainer();
            })
        } else {
            this.renderContainer();
        }
    }

}