class Course {
    static all = [];

    constructor(data) {
        this.data = data;
        this.constructor.all.push(this);
    }

    static add(course) {
        new Course(course);
    }

    static renderIndex() {
        const courseCard = document.createElement("div");
        courseCard.classList.add("card");
        
        const courseName = document.createElement("div");
        courseName.classList.add("card-title");
        courseName.innerHTML = `${this.name}`;
        courseCard.appendChild(courseName);
        
        const courseDescription = document.createElement("div");
        courseDescription.classList.add("card-text");
        courseDescription.innerHTML = `${this.description}`;
        courseCard.appendChild(courseDescription);

        // const courseButton = document.createElement("a");
        // // const courseLink
        // courseButton.classList.add("btn btn-primary");
        // courseButton.innerHTML = `${this.name}`;
        // courseCard.appendChild(courseButton);

        document.getElementById("main").appendChild(courseCard);
    }

    static getCourses() {
        api.getCourses().then(courses => {
            courses.forEach(course => Course.add(course));
            this.renderIndex();
        })
    }

}