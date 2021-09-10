class ApiService {
    
    constructor(api) {
        this.api = api;
    }

    getCourses = fetch(this.api + "/courses").then(resp => resp.json())

}