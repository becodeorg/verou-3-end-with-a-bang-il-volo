const baseUrl = "https://kitsu.io/api/edge/anime?"
const loadAnime = () => {
    const sortByPopularty = "sort=popularityRank"
    fetchList(sortByPopularty)
    const sortByRating = "sort=-averageRating"
    fetchList(sortByRating)
}

const fetchList = (whattofetch) => {
    fetch(baseUrl + whattofetch)
    .then( response => response.json())
    .then(data => {
        let popParent = document.querySelector(".wrap");
        const dataArray = data.data
        console.log(dataArray)
        if ( whattofetch === "sort=-averageRating") {
            popParent = document.querySelectorAll(".wrap")[1]
        }
        generateCards(dataArray, popParent)
        })
}

const generateCards = (popularArray, parent) => {
    for (let i = 0; i < 5 ; i++) {
        const newCard = document.createElement("div");
        newCard.className = "box";
        newCard.style.background = "url(" + popularArray[i].attributes.posterImage.medium + ")"
        const dateEl = document.createElement("div");
        dateEl.className = "date";
        dateEl.innerHTML = "<h4>Released: "+ popularArray[i].attributes.startDate +"</h4>"
        const newTitle = document.createElement("h1");
        newTitle.innerText = popularArray[i].attributes.canonicalTitle;
        const ratingBadge = document.createElement("div");
        ratingBadge.innerText = Math.round(popularArray[i].attributes.averageRating)
        ratingBadge.className = "rating";
        newCard.append(dateEl, newTitle, ratingBadge);
        console.log(newTitle, parent);
        parent.append(newCard);
    }
}


//event listeners

window.onload = () => {
    loadAnime()
}

