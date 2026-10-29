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
                    resultsForPoke.innerHTML = `
                        <table>
                            <tr> 
                                <th>ID</th>
                                <th>Name</th>
                                <th>speed</th>
                                <th>Sp_defence</th>
                                <th>Sp_attack</th>
                                <th>Defence</th>
                                <th>Attack</th>
                                <th>HP</th>
                                <th>Primary type</th>
                                <th>Secondary type</th>
                            </tr>
                        </table>
                                `

                    data.forEach(pokemon =>{
                        resultsForPoke.querySelector("table").innerHTML +=`
                            <tr>
                                <td>${pokemon.pokedex_number}</td>
                                <td>${pokemon.name}</td>
                                <td>${pokemon.speed}</td>
                                <td>${pokemon.special_defence}</td>
                                <td>${pokemon.special_attack}</td>
                                <td>${pokemon.defence}</td>
                                <td>${pokemon.attack}</td>
                                <td>${pokemon.hp}</td>
                                <td>${pokemon.primary_type}</td>
                                <td>${pokemon.secondary_type}</td>
                            </tr>
                            `
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
    getPokemon(`http://localhost:3000/pokemon/type?type=${encodeURIComponent(type)}`)
})

btnForAttack.addEventListener("click",()=>{
    const attack = inputForAttack.value
    getPokemon(`http://localhost:3000/pokemon/minATK?attack=${encodeURIComponent(attack)}`)
})

btnForName.addEventListener("click",()=>{
    const name = inputForName.value
    getPokemon(`http://localhost:3000/pokemon/name?char=${encodeURIComponent(name)}`)
})
