const express = require('express');

const https  = require('https')
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

app.post('/', (req,res)=>{
    console.log('The request is received')


    const query = req.body.cityName
    const apiKey = '2ce8a43c83464e90006311228075fd92'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`
    https.get(url, (response)=>{
      //  console.log(response.statusCode);
    response.on('data', (data)=>{
      //  console.log(data);
      const weatherData = JSON.parse(data)
      //console.log(weatherData)
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description
      //console.log(temp)

      res.write(`<h1>Temperature at ${query} is ${temp} degree Celsius</h1>`);
      res.write(`<p> Weather description is ${description}</p>`)
    })
    })
    
})

app.listen(3000, ()=>{
    console.log(`our server is running on port 3000`)
})