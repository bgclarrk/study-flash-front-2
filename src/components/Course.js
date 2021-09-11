class Course {
    static all = [];

    constructor(data) {
        this.data = data;
        this.constructor.all.push(this);
    }

    renderShow = () => {
        const {name, description, id} = this.data;
        document.getElementById("main").innerHTML = `
        <div class="show">
            <h1>${name}</h1>
            <p>${description}</p>
            <a href="#" id="back" class="btn btn-primary">Back</a>
        </div>
        `
        document.getElementById("back").addEventListener("click", Course.renderIndex);
    }

    renderCard = () => {
        const {name, description, id} = this.data;
        document.getElementById("course-row").innerHTML += `
        <div class="col-sm-4">
            <div class="course-card">
                <div class="card-body">
                    <div class="card-title">${name}</div>
                    <div class="card-text">${description}</div>
                    <a href="#" id="view-course" data-id="${id}" class="btn btn-primary">View Course</a>
                </div>
            </div>
        </div>`
        document.querySelectorAll(`[data-id]`).forEach(button => {
            button.addEventListener("click", Course.handleIndexClick);
        });
    }

    static openHouseForm = () => {
        modal.main.innerHTML = "";
        modal.main.innerHTML += `
        <h3 class="text-center">Create a new course</h3>
        <form>
            <div class="form-group">
                <input type="text" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Course name...">
            </div>
            <div class="form-group">
                <input type="password" class="form-control" id="description" placeholder="Course description...">
            </div>
            <div class="text-center">
                <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </form>
        `
        modal.open();
    }

    static find = (id) => this.all.find(course => course.data.id == id);

    static handleIndexClick = (e) => {
        const id = e.target.dataset.id;
        this.find(id).renderShow();
    }

    static renderIndex = () => {
        const courseContainer = document.createElement("div");
        courseContainer.classList.add("course-container");

        const courseRow = document.createElement("div");
        courseRow.classList.add("row");
        courseRow.id = "course-row";
        courseContainer.appendChild(courseRow);
        
        const main = document.getElementById("main");
        main.innerHTML = "";
        main.appendChild(courseContainer);
        this.all.forEach(course => course.renderCard());
    }

    static getCourses = () => {
        api.getCourses().then(courses => {
            courses.forEach(course => new Course(course));
            this.renderIndex();
        })
    }

}