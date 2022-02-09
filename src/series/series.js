import data from "./config.js";

const seriesSection = document.getElementById("seriesSection");

const creatingCards = (info) => {
    for (let i = 0; i < 10; i++) {
        let popSeries = info.results[i].name;

        const everySeriesCard = document.createElement("div");
        everySeriesCard.classList.add("seriesCard");
        seriesSection.appendChild(everySeriesCard);

        const image = document.createElement("img")
        image.src = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2" + info.results[i].backdrop_path;
        everySeriesCard.appendChild(image);

        const everySeriesInfo = document.createElement("div");
        everySeriesInfo.classList.add("seriesInfo");
        everySeriesCard.appendChild(everySeriesInfo);
        
        const title = document.createElement("h3");
        title.innerHTML = info.results[i].name;
        everySeriesInfo.appendChild(title);
        const overview = document.createElement("p");
        overview.innerHTML = info.results[i].overview;
        everySeriesInfo.appendChild(overview);

        const seriesDetail = document.createElement("div");
        seriesDetail.classList.add("seriesDetail");
        everySeriesInfo.appendChild(seriesDetail);
        // const seriesGender = document.createElement("p");
        // seriesGender.src = 
        // const seriesYear = document.createElement("p");
        // seriesYear.i

    }
}

fetch("https://api.themoviedb.org/3/tv/popular?api_key=" + data.key + "&language=en-US")
    .then(response => response.json())
    .then(info => {
        console.log(info);
        creatingCards(info);
    })