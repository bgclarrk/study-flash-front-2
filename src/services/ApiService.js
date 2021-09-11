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
}