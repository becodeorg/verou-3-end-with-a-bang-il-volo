import data from "../../config/config.js";
const apiUrl = "https://api.themoviedb.org/3/movie/76341?api_key=";
const apiPop = "https://api.themoviedb.org/3/movie/popular?api_key=";


const slider = document.querySelector('.container-movies');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', e => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', _ => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mouseup', _ => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mousemove', e => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const SCROLL_SPEED = 3;
  const walk = (x - startX) * SCROLL_SPEED;
  slider.scrollLeft = scrollLeft - walk;
});


const getPop = () =>{
    fetch(apiPop + data.key)
    .then(response => response.json())
    .then(data => {
        for(let i = 0; i < 10 ; i++){
            let groupData = data.results[i];
            //console.log(groupData);
            getMovie(groupData);       
        };
        
    }
    )
    };

const getMovie = (groupData) =>{
    const movieId = groupData.id;
    fetch("https://api.themoviedb.org/3/movie/" + movieId + "?api_key="+ data.key)
    .then(response => response.json())
    .then(info =>{
        const information = info.genres;
        const movieDuration = info.runtime;
        //console.log(movieDuration);
        //console.log(information);
        cardCreater(groupData,information,movieDuration);
        timeConvert(movieDuration);
        return [information, movieDuration];
        
    })

};

const timeConvert = (duration) => {
    var num = duration;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return num + " minutes = " + rhours + " hour(s) and " + rminutes + " minute(s).";
    }

const cardCreater = (groupData,genreList,duration) =>{
    
    const getWrapper = document.querySelector(".container-movies");
    const makeCard = document.createElement("div");
    makeCard.classList.add("box");
    getWrapper.appendChild(makeCard);

    const makeImg = document.createElement("img");
    makeImg.src="https://image.tmdb.org/t/p/original/" + groupData.poster_path;
    makeCard.appendChild(makeImg);

    const makeDescription = document.createElement("div");
    makeDescription.classList.add("descriptions");
    makeCard.appendChild(makeDescription);

    const makeMovieTitle = document.createElement("h1");
    makeMovieTitle.innerText = groupData.title;
    makeDescription.appendChild(makeMovieTitle);

    const runTime = duration;
    console.log(runTime);

    const makeReleaseDate = document.createElement("h4");
    makeReleaseDate.innerText = "Release date:" + " " + groupData.release_date;
    makeDescription.appendChild(makeReleaseDate);

    const makeGenrelist = document.createElement("div");
    makeGenrelist.classList.add("genrelist");
    makeDescription.appendChild(makeGenrelist);
    for(let i = 0; i < genreList.length ; i++){
    const makeGenres = document.createElement("h4");
    makeGenres.innerHTML = genreList[i].name;
    makeGenrelist.appendChild(makeGenres);
    }

    const makeSummary = document.createElement("p");
    makeSummary.innerText = groupData.overview;
    makeDescription.appendChild(makeSummary);

    const makeATag = document.createElement("a");
    makeATag.href= "https://www.themoviedb.org/movie/"+ groupData.id;
    makeATag.target = "_blank"
    makeATag.innerText = "Read More...";
    makeDescription.appendChild(makeATag);




};

getPop();
getMovie();