const baseUrl = "https://kitsu.io/api/edge/anime?"
const loadAnime = () => {
    const sortByPopularty = "sort=popularityRank"
    fetchList(sortByPopularty)
    const sortByRating = "sort=-averageRating&page[limit]=20"
    fetchList(sortByRating)
    const sortByGenre = "filter[categories]=adventure&page[limit]=20&page[offset]=2&sort=popularityRank"
    fetchList(sortByGenre)
}

const fetchList = (whattofetch) => {
    fetch(baseUrl + whattofetch)
    .then( response => response.json())
    .then(data => {
        let parent = document.querySelector(".wrap");
        const dataArray = data.data
        console.log(dataArray)
        if ( whattofetch === "sort=-averageRating&page[limit]=20") {
            parent = document.querySelectorAll(".wrap")[1]
        } else if (whattofetch.includes("filter[categories]=")) {
            parent = document.querySelectorAll(".wrap")[2]
        }
        generateCards(dataArray, parent)
        })
}

const generateCards = (popularArray, parent) => {
    let x = 5;
    if (parent === document.querySelectorAll(".wrap")[2]) {
        x = 15;
    }
    for (let i = 0; parent.children.length != x ; i++) {
        if ( checkforDemonSlayer(popularArray, i) === 1 ) {
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
        if ( ratingBadge.innerHTML < 80) {
            ratingBadge.style.backgroundColor = "orange";
        }
        newCard.append(dateEl, newTitle, ratingBadge);
        console.log(newTitle, parent);
        parent.append(newCard);
        let description = popularArray[i].attributes.description;
        let anchorTag = '<br> <a href="'+ "https://kitsu.io/anime/"+ popularArray[i].id +'" class="tippyButton">Visit Website</a>'
        tippy(newCard, {
            placement: "right",
            interactive: true,
            allowHTML: true,
            arrow: true,
            theme: "light-border",
            content: description + anchorTag,
        })
    }
}
const checkforDemonSlayer = (popularArray, i) => {
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

const dropdown = document.getElementById("genres");
dropdown.addEventListener("change", () => {
    console.log(dropdown.value)
    const parent = document.querySelectorAll(".wrap")[2]
    parent.innerHTML = ""
    const sortByGenre = "filter[categories]=" + dropdown.value + "&page[limit]=20&page[offset]=2&sort=popularityRank";
    fetchList(sortByGenre)
})



