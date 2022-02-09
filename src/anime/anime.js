const baseUrl = "https://kitsu.io/api/edge/anime?"
const LoadPopular = () => {
    const sortByPopularty = "sort=popularityRank"
    fetch(baseUrl + sortByPopularty)
    .then( response => response.json())
    .then(data => {
        const popularArray = data.data
        console.log(popularArray)
        generateCards(popularArray)
        })
}

const generateCards = (popularArray) => {
    for (let i = 0; i < 4 ; i++) {
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
        const parentDiv = document.querySelector(".wrap");
        console.log(newTitle, parentDiv);
        parentDiv.append(newCard);
        

    }
}


//event listeners

window.onload = () => {
    LoadPopular()
}

