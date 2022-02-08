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
    for (let i = 0; i < popularArray.length ; i++) {
        const newCard = document.createElement("div");
        newCard.className = "box";
        newCard.style.background = "url(" + popularArray[i].attributes.posterImage.medium + ")"
        const dataEl = document.createElement("div");
        dataEl.className = "data";
        const newTitle = document.createElement("h1");
        newTitle.innerText = popularArray[i].attributes.canonicalTitle;
        newCard.append(dataEl, newTitle);
        const parentDiv = document.querySelector(".wrap");
        console.log(newTitle, parentDiv);
        parentDiv.append(newCard);

    }
}


document.querySelector("button").addEventListener("click", LoadPopular)

