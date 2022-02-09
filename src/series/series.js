import data from "./config.js";

const creatingCards = (info, result) => {
    const cardSection = document.getElementById("cardSection");

    for (let i = 0; i < 5; i++) {
        let popSeries = info.results[i].name;

        //Top 5 most popular
        const firstSection = document.getElementById("firstSection")
        cardSection.appendChild(firstSection);

        const firstSeriesCard = document.createElement("div");
        firstSeriesCard.classList.add("seriesCard");
        firstSection.appendChild(firstSeriesCard);

        const firstImage = document.createElement("img")
        firstImage.src = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2" + info.results[i].poster_path;
        firstSeriesCard.appendChild(firstImage);

        const firstSeriesInfo = document.createElement("div");
        firstSeriesInfo.classList.add("seriesInfo");
        firstSeriesCard.appendChild(firstSeriesInfo);

        const firstTitle = document.createElement("h3");
        firstTitle.innerHTML = info.results[i].name;
        firstSeriesInfo.appendChild(firstTitle);
        const firstOverview = document.createElement("p");
        firstOverview.innerHTML = info.results[i].overview;
        firstSeriesInfo.appendChild(firstOverview);

        const firstSeriesDetail = document.createElement("div");
        firstSeriesDetail.classList.add("seriesDetail");
        firstSeriesInfo.appendChild(firstSeriesDetail);

        const firstSeriesYear = document.createElement("p");
        firstSeriesYear.innerHTML = "Release Year: " + info.results[i].first_air_date;
        firstSeriesDetail.appendChild(firstSeriesYear);

        //Top 5 top rated
        const secondSection = document.getElementById("secondSection");
        cardSection.appendChild(secondSection);

        const secondSeriesCard = document.createElement("div");
        secondSeriesCard.classList.add("seriesCard");
        secondSection.appendChild(secondSeriesCard);

        const secondImage = document.createElement("img")
        secondImage.src = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2" + result.results[i].poster_path;
        secondSeriesCard.appendChild(secondImage);

        const secondSeriesInfo = document.createElement("div");
        secondSeriesInfo.classList.add("seriesInfo");
        secondSeriesCard.appendChild(secondSeriesInfo);

        const secondTitle = document.createElement("h3");
        secondTitle.innerHTML = result.results[i].name;
        secondSeriesInfo.appendChild(secondTitle);
        const secondOverview = document.createElement("p");
        secondOverview.innerHTML = result.results[i].overview;
        secondSeriesInfo.appendChild(secondOverview);

        const secondSeriesDetail = document.createElement("div");
        secondSeriesDetail.classList.add("seriesDetail");
        secondSeriesInfo.appendChild(secondSeriesDetail);

        const secondSeriesYear = document.createElement("p");
        secondSeriesYear.innerHTML = "Release Year: " + result.results[i].first_air_date;
        secondSeriesDetail.appendChild(secondSeriesYear);
    }
}


fetch("https://api.themoviedb.org/3/tv/popular?api_key=" + data.key + "&language=en-US")
    .then(response => response.json())
    .then(info => {
        console.log(info);

        fetch("https://api.themoviedb.org/3/tv/top_rated?api_key=" + data.key + "&language=en-US&page=1")
        .then(response => response.json())
        .then(result => {
            console.log(result);

        creatingCards(info, result);
    })
})