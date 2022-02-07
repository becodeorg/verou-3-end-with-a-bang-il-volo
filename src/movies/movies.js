import data from "../../config/config.js"

fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=" + data.key)
.then(response => response.json())
.then(data => console.log(data));