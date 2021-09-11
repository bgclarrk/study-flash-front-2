class Modal {

    constructor() {
        this.addCloseEventListener();
    }
    
    // Returns the modal element from index
    get modal() {
        return document.querySelector("#myModal");
    }

    // Returns the main content for the modal
    get main() {
        return document.getElementById("modal-main");
    }

    // Sets display to block and shows modal
    open = () => {
        this.modal.style.display = "block";
    }

    // Sets display to none and closes modal
    close = () => {
        this.modal.style.display = "none";
    }

    // Closes modal if the user clicks the x or outside of the modal
    addCloseEventListener = () => {
        this.modal.addEventListener("click", (e) => {
            if (e.target.classList.contains("close") || e.target.id == "myModal" ) {
                this.close();
            }
        });
    }

}