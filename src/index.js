// write your code here
const form = document.querySelector("form");
form.addEventListener("submit", submitHandle)

function submitHandle(e) {
    e.preventDefault();
    let menuObj = {
        name: e.target["new-name"].value,
        restaurant: e.target["new-restaurant"].value,
        image: e.target["new-image"].value,
        rating: e.target["new-rating"].value,
        comment: e.target["new-comment"].value
    }
    renderOneMenu(menuObj)
    addRamen(menuObj)
}

function initialize() {
    getRamen();
}

function getRamen() {
    fetch("http://localhost:3000/ramens")
    .then(resp => resp.json())
    .then(data => data.forEach(item => renderOneMenu(item)))
}

function renderOneMenu(item) {
    let parentDiv = document.querySelector("#ramen-menu");
    let image = document.createElement("img");
    image.addEventListener("click", () => displayImageInfo(item.id))
    image.src = item.image
    parentDiv.append(image)
}

function displayImageInfo(id) {
    fetch(`http://localhost:3000/ramens/${id}`)
    .then(resp => resp.json())
    .then(data => {
        let detailSection = document.querySelector("#ramen-detail");
        let rating = document.querySelector("#rating-display");
        let comment = document.querySelector("#comment-display")

        detailSection.innerHTML = `
        <img class="detail-image" src="${data.image}" alt="Insert Name Here"/>
        <h2 class="name">${data.name}</h2>
        <h3 class="restaurant">${data.restaurant}</h3>
        `;
        rating.textContent = `${data.rating}`;
        comment.textContent = `${data.comment}`
    })
}

function addRamen(menu) {
    fetch("http://localhost:3000/ramens", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body:JSON.stringify(menu)
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
}

initialize()