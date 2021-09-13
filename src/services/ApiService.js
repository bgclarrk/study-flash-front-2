class ApiService {
    
    constructor(api) {
        this.api = api;
    }

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

    getCourseCards = (course_id) => fetch(this.api + "/courses/" + course_id + "/cards").then(resp => resp.json());

}