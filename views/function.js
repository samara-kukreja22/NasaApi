function getDailyImage(){
  //return the link and Description
  return fetch("https://api.nasa.gov/planetary/apod?api_key=sO5IxzzW7mtK9uXAITFi5RXRRO3eJeljRYlsKmkU")
  .then(response=>response.json());
/*  .then(data=>{
    url: data["hdurl"],
    explanation: data["explanation"]
  });*/
}
