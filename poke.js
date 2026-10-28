const BtnForAll = document.querySelector("#allBtn")
const btnForType = document.querySelector("#typeBtn")
const btnForAttack = document.querySelector("#attackBtn")
const btnForName = document.querySelector("#nameBtn")

const inputForType = document.querySelector("#typeInput")
const inputForAttack = document.querySelector("#attackInput")
const inputForName = document.querySelector("#nameInput")

const resultsForPoke = document.querySelector("#pokemonResults")



fetch("http://localhost:3000/pokemon")
    .then(response => response.json())
    .then(data => {
        console.log(data);
});
