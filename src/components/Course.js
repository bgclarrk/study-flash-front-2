class Course {
    static all = [];

    constructor(data) {
        this.data = data;
        this.constructor.all.push(this);
    }

    renderCard = () => {
        const {name, description, id} = this.data;
        document.getElementById("course-row").innerHTML += `
        <div class="col-sm-4">
            <div class="course-card">
                <div class="card-body">
                    <div class="card-title">${name}</div>
                    <div class="card-text">${description}</div>
                    <a href="#" class="btn btn-primary">View Course</a>
                </div>
            </div>
        </div>`
    }

    static renderIndex() {
        const courseContainer = document.createElement("div");
        courseContainer.classList.add("course-container");

        const courseRow = document.createElement("div");
        courseRow.classList.add("row");
        courseRow.id = "course-row";
        courseContainer.appendChild(courseRow);
        
        document.getElementById("main").appendChild(courseContainer);
        this.all.forEach(course => course.renderCard());
    }

    static getCourses() {
        api.getCourses().then(courses => {
            courses.forEach(course => new Course(course));
            this.renderIndex();
        })
    }

}