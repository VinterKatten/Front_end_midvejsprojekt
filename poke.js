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

BtnForAll.addEventListener("click", ()=> {
    getPokemon("http://localhost:3000/pokemon")
})

btnForType.addEventListener("click",()=>{
    const type = inputForType.value
    getPokemon(`http://localhost:3000/filter/type?type=${encodeURIComponent(type)}`)
})

btnForAttack.addEventListener("click",()=>{
    const attack = inputForAttack.value
    getPokemon(`http://localhost:3000/filter/minATK?attack=${encodeURIComponent(attack)}`)
})

btnForName.addEventListener("click",()=>{
    const name = inputForName.value
    getPokemon(`http://localhost:3000/filter/name?char=${encodeURIComponent(name)}`)
})
