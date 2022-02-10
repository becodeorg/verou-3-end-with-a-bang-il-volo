import data from "../../config/config.js";

const sliders = document.querySelector("carouselbox")
let scrollPerClick;
let ImagePadding = 20;

showMovieData()


async function showMovieData(){
    const api_key = data.key
    
    fetch("https://api.themoviedb.org/3/discover/movie?api_key="+
    api_key +
    "&sort_by=popularity.desc")
    .then(response=>response.json)
    .then(info =console.log(info))

};
