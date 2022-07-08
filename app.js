const express = require("express");


const PORT = 4000;

// Importing all the pokemon for our data file
const allPokemon = require("./data");
const { application } = require("express");

const app = express();
app.use(express.json())


// -- Define your route listeners here! --

app.get('/pokemon', (req, res) => {
    console.log(req)
    res.send(allPokemon)
})

app.get('/pokemon/:id', (req, res) => {
    const { id } = req.params
    res.send(allPokemon[id])
})


app.get('/search', (req, res) => {
    const pokeName = req.query["name"]
    const pokeType = req.query["type"]

    const foundPoke = allPokemon.find(poke => poke.name === pokeName)
    let pokesArray = []

    allPokemon.map(poke => {
        if (poke.types.includes(pokeType)) {
            pokesArray.push(poke)
            return pokesArray
        }
    })

    if (pokeName === undefined) {
        res.send(pokesArray)
    } else if (pokeType === undefined) {
        res.send(foundPoke)
    }
})

app.post('/pokemon', (req, res) => {
    let body = req.body
    allPokemon.push(body)
    res.send(body)
})

app.put('/pokemon/:id', (req, res) => {
    const { id } = req.params
    let body = req.body
    res.send(allPokemon[id] = body)
})

app.delete('/pokemon/:id', (req, res) => {
    const { id } = req.params
    res.send(allPokemon[id])
})

app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
