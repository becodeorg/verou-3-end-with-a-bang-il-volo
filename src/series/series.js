import data from "../../config/config.js";

const scrollResult = document.getElementById("scrollResult");

const search = (e) => {
    e.preventDefault(); 
    scrollResult.innerHTML = "";
    const searchBar = document.getElementById("searchBar");
    let searchQuery = searchBar.value.toLowerCase();

    //API for the search engine
    fetch("https://api.themoviedb.org/3/search/tv?api_key=" + data.key + "&query=" + searchQuery +"&language=en-US&page=1&include_adult=false")
        .then(response => response.json())
        .then(search => {
            console.log(search);

            searchResult(search)
        })
}

//API for general information
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

// Search results 
const searchResult = (search) => {
    for (let x = 0; x < 20; x++) {
        
        const resultSearched = search.results[x];
        
        const seriesSearched = document.createElement("div");
        seriesSearched.classList.add("seriesSearched");
        scrollResult.appendChild(seriesSearched);

        const searchImg = document.createElement("img");
        searchImg.classList.add("searchImg");
        searchImg.src = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2" + resultSearched.poster_path;
        searchImg.setAttribute("alt", resultSearched.name);
        seriesSearched.appendChild(searchImg);

        const extraDetail = document.createElement("p");
        extraDetail.innerHTML = search.results[x].name;
        const moreDetail = document.createElement("a");
        moreDetail.href = "https://www.themoviedb.org/tv/" + search.results[x].id;
        moreDetail.target = "_blank";
        moreDetail.innerHTML = "More info"
        seriesSearched.appendChild(extraDetail);
        seriesSearched.appendChild(moreDetail);
    }
}

//Cards for popular and top rated series
const creatingCards = (info, result) => {
    const firstHeader = document.getElementById("firstHeader");
    const secondHeader = document.getElementById("secondHeader");

    for (let i = 0; i < 5; i++) {


        //Top 5 most popular
        const firstSection = document.getElementById("firstSection")
        firstHeader.appendChild(firstSection);

        const firstSeriesCard = document.createElement("div");
        firstSeriesCard.classList.add("seriesCard");
        firstSection.appendChild(firstSeriesCard);

        const firstImage = document.createElement("img")
        firstImage.src = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2" + info.results[i].poster_path;
        firstImage.setAttribute("alt", info.results[i].name);
        firstSeriesCard.appendChild(firstImage);

        const firstSeriesInfo = document.createElement("div");
        firstSeriesInfo.classList.add("seriesInfo");
        firstSeriesCard.appendChild(firstSeriesInfo);

        const firstTitle = document.createElement("h3");
        firstTitle.innerHTML = info.results[i].name;
        firstSeriesInfo.appendChild(firstTitle);
        const firstCountry = document.createElement("p");
        firstCountry.innerHTML = "Country: " + info.results[i].origin_country[0];
        firstSeriesInfo.appendChild(firstCountry);

        const firstSeriesDetail = document.createElement("div");
        firstSeriesDetail.classList.add("seriesDetail");
        firstSeriesInfo.appendChild(firstSeriesDetail);

        const firstSeriesYear = document.createElement("p");
        firstSeriesYear.innerHTML = "Release Year: " + info.results[i].first_air_date;
        firstSeriesDetail.appendChild(firstSeriesYear);

        const moreInfoOne = document.createElement("a");
        moreInfoOne.href = "https://www.themoviedb.org/tv/" + info.results[i].id;
        moreInfoOne.target = "_blank";
        moreInfoOne.innerHTML = "More info";
        firstSeriesDetail.appendChild(moreInfoOne);

        //Top 5 top rated
        const secondSection = document.getElementById("secondSection");
        secondHeader.appendChild(secondSection);

        const secondSeriesCard = document.createElement("div");
        secondSeriesCard.classList.add("seriesCard");
        secondSection.appendChild(secondSeriesCard);

        const secondImage = document.createElement("img")
        secondImage.src = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2" + result.results[i].poster_path;
        secondImage.setAttribute("alt", result.results[i].name);
        secondSeriesCard.appendChild(secondImage);

        const secondSeriesInfo = document.createElement("div");
        secondSeriesInfo.classList.add("seriesInfo");
        secondSeriesCard.appendChild(secondSeriesInfo);

        const secondTitle = document.createElement("h3");
        secondTitle.innerHTML = result.results[i].name;
        secondSeriesInfo.appendChild(secondTitle);
        const secondCountry = document.createElement("p");
        secondCountry.innerHTML = "Country: " + result.results[i].origin_country[0];
        secondSeriesInfo.appendChild(secondCountry);

        const secondSeriesDetail = document.createElement("div");
        secondSeriesDetail.classList.add("seriesDetail");
        secondSeriesInfo.appendChild(secondSeriesDetail);

        const secondSeriesYear = document.createElement("p");
        secondSeriesYear.innerHTML = "Release Year: " + result.results[i].first_air_date;
        secondSeriesDetail.appendChild(secondSeriesYear);

        const moreInfoTwo = document.createElement("a");
        moreInfoTwo.href = "https://www.themoviedb.org/tv/" + result.results[i].id;
        moreInfoTwo.target = "_blank";
        moreInfoTwo.innerHTML = "More info";
        secondSeriesDetail.appendChild(moreInfoTwo);
    }
}

//Event for the search button
const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', search);
window.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        search();
    }
});