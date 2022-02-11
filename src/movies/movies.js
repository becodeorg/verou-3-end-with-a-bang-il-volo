import data from "../../config/config.js";

const apiPop = "https://api.themoviedb.org/3/movie/popular";
const apiTop = "https://api.themoviedb.org/3/movie/top_rated";
const apiGenre = "https://api.themoviedb.org/3/discover/movie";
const withGenre = "&with_genres=";

const getFromApi = (apiUrl, sectionKey,queryParameter="") => {
    const section = document.getElementById(sectionKey);
    const getWrapper = getMovieContainer(section);
    getWrapper.innerHTML="";
    fetch(apiUrl+ "?api_key=" + data.key + queryParameter)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < 10; i++) {
                let groupData = data.results[i];
                //console.log(groupData);
                getMovie(section, groupData, i);
            };

        })
};

const getMovie = (section, groupData, i) => {
    const movieId = groupData.id;
    fetch("https://api.themoviedb.org/3/movie/" + movieId + "?api_key=" + data.key)
        .then(response => response.json())
        .then(info => {
            const information = info.genres;
            const movieDuration = info.runtime;
            //console.log(movieDuration);
            //console.log(information);
            cardCreater(section, groupData, information, movieDuration, i);
        })

};

const dropDown = document.getElementById("genres");


const getValue = () =>{
    const result = dropDown.value;
    console.log(result);
    getFromApi(apiGenre, "genre", withGenre + result);
}
const getMovieContainer =(section) =>{
    return section.getElementsByClassName("container-movies")[0];

}
dropDown.addEventListener("change", getValue);

const cardCreater = (section, groupData, genreList) => {

    const getWrapper = getMovieContainer(section);
    const makeCard = document.createElement("div");
    makeCard.classList.add("box");
    getWrapper.appendChild(makeCard);

    const makeImg = document.createElement("img");
    makeImg.src = "https://image.tmdb.org/t/p/original/" + groupData.poster_path;
    makeCard.appendChild(makeImg);

    const makeDescription = document.createElement("div");
    makeDescription.classList.add("descriptions");
    makeCard.appendChild(makeDescription);

    const makeMovieTitle = document.createElement("h1");
    makeMovieTitle.innerText = groupData.title;
    makeDescription.appendChild(makeMovieTitle);

    const makeReleaseDate = document.createElement("h4");
    makeReleaseDate.innerText = "Release date:" + " " + groupData.release_date;
    makeDescription.appendChild(makeReleaseDate);

    const makeGenrelist = document.createElement("div");
    makeGenrelist.classList.add("genrelist");
    makeDescription.appendChild(makeGenrelist);
    for (let i = 0; i < genreList.length; i++) {
        const makeGenres = document.createElement("h4");
        makeGenres.innerHTML = genreList[i].name;
        makeGenrelist.appendChild(makeGenres);
    }

    const makeSummary = document.createElement("p");
    makeSummary.innerText = groupData.overview;
    makeDescription.appendChild(makeSummary);

    const makeATag = document.createElement("a");
    makeATag.href = "https://www.themoviedb.org/movie/" + groupData.id;
    makeATag.target = "_blank"
    makeATag.innerText = "Read More...";
    makeDescription.appendChild(makeATag);

    tippy(makeCard, {
        placement: "bottom",
        interactive: true,
        arrow: true,
        theme: "light-border",
        content: makeDescription,
    })
};
getFromApi(apiPop, "popular");
getFromApi(apiTop, "top_rated");

