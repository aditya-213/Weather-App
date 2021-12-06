const path = require("path");
const express = require("express");
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname); // tells directory name
console.log(path.join(__dirname, "../public"));

const app = express(); // starting app

// Define Path for Express Config
const publicdirPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname ,"../templates/views")
const partialPath = path.join(__dirname , "../templates/partials")

app.set("view engine", "hbs"); // using handlebrs to render dynamic content
app.set('views' , viewPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicdirPath))    

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Aditya",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    name: "Aditya",
    title: 'About'
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is the help text",
    title: "Help",
    name: "Aditya"
  });
});

app.get("/weather", (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  }

  geocode(req.query.address , (error , {latitude , longitude , location} = {}) => {
    if(error) {
      return res.send({ error })
    }

    forecast(latitude , longitude , (error , forecastData) => {
      if(error) {
        return res.send({error})
      }

      res.send({
        forecast : forecastData ,
        location ,
        address : req.query.address
      })
    })

  })
})

// If path doesn't exist
app.get('*' , (req , res) => {
    res.send('404 Not Found')
})

app.listen(3000, () => {
  console.log("server is up on the port 3000");
});
