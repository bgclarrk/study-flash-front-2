class Card {
    static all = [];

    constructor(data) {
        this.data = data;
        this.constructor.all.push(this);
    }

    // Render a flash card
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
                    <div class="text-center">
                        <a id="delete-card" data-id="${id}" class="btn btn-danger" href="#">Delete Flash Card</a>
                    </div>
                </div>
            </div>
        </div>`
        document.querySelectorAll(".definition").forEach(definition => {
            definition.addEventListener("click", Card.handleFlipClick);
        });
        document.querySelectorAll(`#delete-card`).forEach(deleteButton => {
            deleteButton.addEventListener("click", Card.handleDeleteClick);
        });
    }

    // Modal to create a new flash card
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

    // Flip card to show either phrase or definition
    flipCard = (e) => {
        let card = Card.all.find(card => card.data.id == e.target.dataset.id)
        if (e.target.innerHTML === "Click to See Definition") {
            e.target.innerHTML = `${card.data.definition}`;
        } else {
            e.target.innerHTML = "Click to See Definition";
        }
    }

    deleteCard = (id) => {
        let card = Card.all.find(card => card.data.id == id);
        api.deleteCourseCard(card.data);
        alert("Flash Card deleted successfully");
        Course.renderIndex();
    }

    // Handle the flash card delete button
    static handleDeleteClick = (e) => {
        e.preventDefault();
        const id = e.target.dataset.id;
        this.find(id).deleteCard(id);
    }

    // Find a specific flash card
    static find = (id) => this.all.find(card => card.data.id == id);

    // Used to find the card that needs to be 'flipped'
    static handleFlipClick = (e) => {
        const id = e.target.dataset.id;
        this.find(id).flipCard(e);
    }

    // Used to create a new flash card and save to the DB
    static handleNewCard = (e) => {
        e.preventDefault();
        const newCard = {
            phrase: e.target.phrase.value,
            definition: e.target.definition.value,
            course_id: parseInt(e.target.course_id.value)
        };
        api.createCourseCard(newCard).then(card => {
            new Card(card).renderCard();
        });
        modal.close();
        e.target.reset();
    }

    // Creates the necessary elements to display the flash cards
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

    // Fetch only the cards for a specific course
    static getCards = (course_id) => {
        api.getCourseCards(course_id).then(cards => {
            cards.forEach(card => new Card(card));
            this.renderContainer();
        })
    }

    // Helper function just to clear out #main
    static clearMain = () => {
        let main = document.getElementById("main");
        main.innerHTML = "";
        this.renderContainer();
    }

    // Function to get every flash card regardless of course
    static getAllCards = () => {
        Card.all = [];
        api.getCards().then(cards => {
            cards.forEach(card => new Card(card));
            this.clearMain();
        })
    }
}