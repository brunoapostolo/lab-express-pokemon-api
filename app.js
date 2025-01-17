const express = require("express");
const { nextTick } = require("process");

const PORT = 4000;
let allPokemon = require("./data");
const app = express();

const cors = require("cors");
app.use(cors("http://localhost:4000"));
app.use(express.json());

// Importing all the pokemon for our data file
app.get("/pokemon", (req, res, next) => {
  return res.status(200).json(allPokemon);
});

app.get("/pokemon/:id", (req, res) => {
  const { id } = req.params;
  const specificPokemon = allPokemon.filter((element) => {
    return Number(element.id) === Number(id);
  });
  return res.status(201).json(specificPokemon);
});

const extra = {
  id: 999,
  name: "Pokemano",
  types: ["water"],
  height: 9,
  weight: 140,
  sprite:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/223.png",
};

app.post("/pokemon", (req, res) => {
  allPokemon.push(extra);
  return res.status(201).json(allPokemon);
});

app.put("/pokemon/:id", (req, res) => {
  const { id } = req.params;
  allPokemon.forEach((pokemon, index) => {
    if (pokemon.name == id) {
      allPokemon[index] = { ...pokemon, ...req.body };
    }
  });
});
app.delete("/pokemon/:id", (req, res) => {
  const { id } = req.params;
  const deletando = allPokemon.filter((pokemon) => {
    return pokemon.id != id;
  });
  allPokemon = deletando;
  return res.status(200).json(deletando);
});

// -- Define your route listeners here! --
app.get("/search", (req, res, next) => {
  let foundPokemon = [];
  if (req.query.name) {
    allPokemon.forEach((pokemon) => {
      if (pokemon.name === req.query.name) {
        foundPokemon.push(pokemon);
      }
    });
  }
  if (req.query.types) {
    allPokemon.forEach((pokemon) => {
      if (pokemon.types.includes(req.query.types)) {
        foundPokemon.push(pokemon);
      }
    });
  }
  return res.status(200).json(foundPokemon);
});

app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
