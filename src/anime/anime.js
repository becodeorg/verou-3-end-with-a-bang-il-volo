const baseUrl = "https://kitsu.io/api/edge/anime?"
const loadAnime = () => {
    const sortByPopularty = "sort=popularityRank"
    fetchList(sortByPopularty)
    const sortByRating = "sort=-averageRating&page[limit]=20"
    fetchList(sortByRating)
}

const fetchList = (whattofetch) => {
    fetch(baseUrl + whattofetch)
    .then( response => response.json())
    .then(data => {
        let popParent = document.querySelector(".wrap");
        const dataArray = data.data
        console.log(dataArray)
        if ( whattofetch === "sort=-averageRating&page[limit]=20") {
            popParent = document.querySelectorAll(".wrap")[1]
        }
        generateCards(dataArray, popParent)
        })
}

const generateCards = (popularArray, parent) => {
    for (let i = 0; parent.children.length != 5 ; i++) {
        if ( CheckDoubleAnimes(popularArray, i) === 1 ) {
            continue;
        }
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
        let description = popularArray[i].attributes.description;
        tippy(newCard, {
            placement: "bottom",
            arrow: true,
            content: description,
            
        })
    }
}

const CheckDoubleAnimes = (popularArray, i) => {
    if (popularArray[i].attributes.canonicalTitle.includes("Kimetsu")) {
        return 1;
    } else {
        return 0;
    }

}

//event listeners
window.onload = () => {
    loadAnime()
}

