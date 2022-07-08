const express = require("express");
const bodyParser = require("body-parser")

const PORT = 4000;

// Importing all the pokemon for our data file
const allPokemon = require("./data");
const { application } = require("express");

const app = express();
app.use(bodyParser.json())

// -- Define your route listeners here! --
app.get('/pokemon', (req, res) => {
    console.log(req)
    res.send(allPokemon)
})

app.get('/pokemon/:id', (req, res) => {
    const {id} = req.params
    res.send(allPokemon[id])
})


app.get('/search', (req, res) => {
    const name = req.query["name"]
    const foundPoke = allPokemon.find(poke => poke.name === name)
    res.send(foundPoke)    
})




app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
