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

    static openCardForm = (e) => {
        let course_id = e.target.dataset.id
        modal.main.innerHTML = `
        <h3 class="text-center">Create a new card</h3>
        <form>
            <div class="form-group">
                <input type="text" class="form-control" id="phrase" placeholder="Phrase...">
            </div>
            <div class="form-group">
                <input type="text" class="form-control" id="definition" placeholder="Definition...">
            </div>
            <div class="form-group">
                <input type="hidden" class="form-control" id="course_id" value="${course_id}">
            </div>
            <div class="text-center">
                <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </form>
        `;
        document.querySelector("form").addEventListener("submit", this.handleNewCard);
        modal.open();
    }

    static find = (id) => this.all.find(card => card.data.id == id);

    static handleFlipClick = (e) => {
        const id = e.target.dataset.id;
        this.find(id).flipCard(e);
    }

    static handleNewCard = (e) => {
        e.preventDefault();
        const newCard = {
            phrase: e.target.phrase.value,
            definition: e.target.definition.value,
            course_id: parseInt(e.target.course_id.value)
        };
        debugger;
        api.createCourseCard(newCard).then(card => {
            new Card(card).renderCard();
        });
        modal.close();
        e.target.reset();
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

    static getCards = (course_id) => {
        api.getCourseCards(course_id).then(cards => {
            cards.forEach(card => new Card(card));
            this.renderContainer();
        })
    }

}