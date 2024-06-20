const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require ("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/" ,  function(req ,res){
res.sendFile(__dirname + "/index.html")

});

app.post("/" , function(req,res){

const query = req.body.cityName;
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=49afb214d50131c6c3fc991c1f629429&units=metric"

https.get(url,function(response){
  // console.log(response.statusCode);
  
  response.on("data" ,function(data){
    const weatherData = JSON.parse(data)
    // console.log(weatherData);
    const temp = weatherData.main.temp;
    // console.log(temp);

    const weatherDescription = weatherData.weather[0].description;
    // console.log(weatherDescription);
    res.write("<h1>The temperature in " + query+ " is " + temp + " degree celcius</h1>");
    res.write("The weather is currently " + weatherDescription);

    const icon =  weatherData.weather[0].icon
    const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png" ;
    res.write("<img src=" + imageURL +"> ");
  } )
})

// res.send("server is up and running") we can send only one res.send instead use res.write


})


app.listen(3000 ,function(){
    console.log("server started on port 3000");
} )

