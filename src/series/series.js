import data from "./config.js";

fetch("https://api.themoviedb.org/3/tv/popular?api_key=" + data.key + "&language=en-US")
.then(response => response.json())
.then(info => console.log(info));