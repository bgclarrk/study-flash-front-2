class ApiService {
    
    constructor(api) {
        this.api = api;
    }

    // Getting courses and creating courses

    getCourses = () => fetch(this.api + "/courses").then(resp => resp.json());

    createCourse = (newCourse) => {
        return fetch(this.api + "/courses", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCourse),
        })
        .then(resp => resp.json())
    }

    // Getting cards and creating cards

    getCards = () => fetch(this.api + "/cards").then(resp => resp.json());

    createCards = (newCard) => {
        return fetch(this.api + "/cards", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCard),
        })
        .then(resp => resp.json())
    }

    // Getting nested cards and creating nested cards

    getCourseCards = (course_id) => fetch(this.api + "/courses/" + course_id + "/cards").then(resp => resp.json());

    createCourseCard = (newCard) => {
        return fetch(this.api + "/courses/" + newCard.course_id + "/cards", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCard),
        })
        .then(resp => resp.json())
    }

    deleteCourseCard = (card) => {
        return fetch(this.api + "/courses/" + card.course_id + "/cards/" + card.id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(card),
        })
        .then(resp => resp.json())
    }

}