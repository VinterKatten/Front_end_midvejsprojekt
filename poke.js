const btnForSearch = document.querySelector("#searchBtn")

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
                                <th>Img</th>
                                <th>Name</th>
                                <th>speed</th>
                                <th>Sp def</th>
                                <th>Sp atk</th>
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
                                <td><img class="pokemonPicture" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.pokedex_number}.png"></td>
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

function getTypes() {
    fetch("http://localhost:3000/pokemon/diffTypes")
        .then(response => response.json())
        .then(data=>{
            data.forEach(pickType =>{
                inputForType.innerHTML +=`
                <option value = "${pickType.primary_type}">
                ${pickType.primary_type}
                </option>
                `
            })
        })
        .catch(error=> console.log ("Error: ", error))
}

btnForSearch.addEventListener("click", ()=>{
    const type = inputForType.value
    const attack = inputForAttack.value
    const name = inputForName.value

    if (type){
        getPokemon(`http://localhost:3000/pokemon/type?type=${encodeURIComponent(type)}`)
    } else if (attack){
        getPokemon(`http://localhost:3000/pokemon/minATK?attack=${encodeURIComponent(attack)}`)
    } else if (name){
        getPokemon(`http://localhost:3000/pokemon/name?char=${encodeURIComponent(name)}`)
    } else{
        getPokemon("http://localhost:3000/pokemon")
    }
})

getTypes()
getPokemon("http://localhost:3000/pokemon")
