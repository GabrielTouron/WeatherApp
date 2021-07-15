const weatherIcons= {

    "Rain": "wi wi-rain-day",
    "Clouds": "wi wi-day-cloudy",
    "Clear": "wi wi-day-sunny",
    "Snow": "wi wi-day-snow",
    "Mist": "wi wi-day-fog",
    "Drizzle": "wi wi-day-sleet",

}

function capitalize(str){
    return str[0].toUpperCase()+ str.slice(1);
}

async function main(withIp=true){
let city;
    if(withIp){

        //je souhaite récuperer l'adresse ip de l'ordinateur qui ouvre la page météo pour ensuite la localiser
         const ip =  await fetch ("https://api.ipify.org?format=json")
              .then(result => result.json())
              .then(json => console.log(json.ip))
       
        // Je souhaite ensuite localiser l'adresse ip de l'ordinateur qui ouvre la page afin de lui proposer directement la météo en fonction de sa localisation 
         city =  await fetch(`http://api.ipstack.com/${ip}?access_key =bdc96e5d850cf67ad077e4cda43a74d0`)
              .then (result => result.json())
              .then(json => json.city) 
            
        

    }

    else {
      city= document.querySelector("#city").textContent;
    }
        // Ensuite je récupère les informations météo de la ville où se situe le serveur auquel l'ordinateur est connecté pour afficher une météo prédéfinie
         const weather= await fetch (`http://api.openweathermap.org/data/2.5/weather?q=${city}}&appid=b33619dd025b8a13c7fff23aae59afb7&lang=fr&units=metric`)
              .then(result => result.json())
              .then(json => json)

        // J'affiche les informations météo sur la page
         displayWeatherInfos(meteo)
}


// Ici je souhaite afficher les données pertinentes seulement 

function displayWeatherInfos(data){

   const name= data.name;
   const min_temp= data.main.temp_min;
   const max_temp= data.main.temp_max;
   const temperature= data.main.temp;
   const conditions = data.weather[0].main;
   const description= data.weather[0].description;


document.querySelector("#city").textContent= name;
document.querySelector("#temperature").textContent= temp;
Math.round(temperature);
Math.round(max_temp);
Math.round(min_temp);
document.querySelector("#description").textContent= description;
document.querySelector("i.wi").className= weatherIcons[conditions];

document.body.className= conditions.ToLowerCase();

}

const ville= querySelector("#city");

ville.addEventListener("click", ()=> {
    ville.contentEditable =true;
});

ville.addEventListener("keydown", (e) =>{
if( e.keyCode === 13)
  e.preventDefault();
  main(false);

});










              
            
    









