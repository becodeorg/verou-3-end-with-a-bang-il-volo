import data from "../../config/config.js";
const apiUrl = "https://api.themoviedb.org/3/movie/76341?api_key=";
const apiPop = "https://api.themoviedb.org/3/movie/popular?api_key=";


const getPop = () =>{
    fetch(apiPop + data.key)
    .then(response => response.json())
    .then(data => {
        for(let i = 0; i < 5; i++){
            let groupData = data.results[i];
            console.log(groupData);
            cardCreater(groupData,i);
           
        };
        
    }
    )
    };



const cardCreater = (groupData,i) =>{
    console.log(groupData);
    
    const getWrapper = document.querySelector(".wrapper");
    const makeCard = document.createElement("div");
    makeCard.classList.add("card");
    getWrapper.appendChild(makeCard);
    const makeImg = document.createElement("img");
    makeImg.src="https://image.tmdb.org/t/p/original/" + groupData.poster_path;
    makeCard.appendChild(makeImg);

};

getPop();