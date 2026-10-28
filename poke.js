const BtnForAll = document.querySelector("#allBtn")
const btnForType = document.querySelector("#typeBtn")
const btnForAttack = document.querySelector("#attackBtn")
const btnForName = document.querySelector("#nameBtn")

const inputForType = document.querySelector("#typeInput")
const inputForAttack = document.querySelector("#attackInput")
const inputForName = document.querySelector("#nameInput")

const resultsForPoke = document.querySelector("#pokemonResults")

function getPokemon(url){
        fetch(url)
            .then(response=>response.json())
            .then(data => {
                    resultsForPoke.innerHTML = "";

                    data.forEach(pokemon =>{
                        const p = document.createElement("p")
                        p.textContent = pokemon.name
                        resultsForPoke.appendChild(p)
                    });
            })
            .catch(error => {
                console.log("Error: ", error)
            });
}




fetch("http://localhost:3000/pokemon")
    .then(response => response.json())
    .then(data => {
        console.log(data);
});
