const baseUrl = "https://kitsu.io/api/edge/anime?"
const LoadPopular = () => {
    const sortByPopularty = "sort=popularityRank"
    fetch(baseUrl + sortByPopularty)
    .then( response => response.json())
    .then(data => {
        const popularArray = data.data
        console.log(popularArray)
        for (let i = 0; i < popularArray.length ; i++) {
            popularArray[i]
        }
    })
}



document.querySelector("button").addEventListener("click", LoadPopular)

