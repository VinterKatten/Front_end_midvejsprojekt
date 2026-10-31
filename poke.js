const btnForSearch = document.querySelector("#searchBtn")

const inputForType = document.querySelector("#typeInput")
const inputForAttack = document.querySelector("#attackInput")
const inputForName = document.querySelector("#nameInput")

const dataForPokemon = document.querySelector("#pokemonData")

// Tabellen over pokemon
function getPokemon(url){
    fetch(url)
        .then(response=>response.json())
        .then(data => {

            dataForPokemon.innerText = ""

            data.forEach(pokemon => {
                const row = document.createElement("tr")

                const idCell = document.createElement("td")
                idCell.innerText = pokemon.pokedex_number
                row.appendChild(idCell)

                const imgCell = document.createElement("td") // Er vores img celle
                const picToImg = document.createElement("img") // Er hvor selve vores billede lægger i
                picToImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.pokedex_number}.png`
                picToImg.alt = `Picture of ${pokemon.name}`

                imgCell.appendChild(picToImg)
                row.appendChild(imgCell)

                const nameCell = document.createElement("td")
                nameCell.innerText = pokemon.name
                row.appendChild(nameCell)

                const speedCell = document.createElement("td")
                speedCell.innerText = pokemon.speed
                row.appendChild(speedCell)

                const spDefCell = document.createElement("td")
                spDefCell.innerText = pokemon.special_defence
                row.appendChild(spDefCell)

                const spAtkCell = document.createElement("td")
                spAtkCell.innerText = pokemon.special_attack
                row.appendChild(spAtkCell)

                const defCell = document.createElement("td")
                defCell.innerText = pokemon.defence
                row.appendChild(defCell)

                const atkCell = document.createElement("td")
                atkCell.innerText = pokemon.attack
                row.appendChild(atkCell)

                const hpCell = document.createElement("td")
                hpCell.innerText = pokemon.hp
                row.appendChild(hpCell)

                const priTypeCell = document.createElement("td")
                priTypeCell.innerText = pokemon.primary_type
                row.appendChild(priTypeCell)

                const secTypeCell = document.createElement("td")
                secTypeCell.innerText = pokemon.secondary_type
                row.appendChild(secTypeCell)

                dataForPokemon.appendChild(row)
            })
        })
        .catch(error => {
            console.log("Error: ", error)
        });
}

// Drop down for filtrering af primary type
function getTypes() {
    fetch("http://localhost:3000/pokemon/diffTypes")
        .then(response => response.json())
        .then(data => {
            data.forEach(pickType => {
                const dropDownOption = document.createElement("option")
                dropDownOption.value = `${pickType.primary_type}`
                dropDownOption.innerText = `${pickType.primary_type}`

                inputForType.appendChild(dropDownOption)
            })
        })
        .catch(error => console.log("Error: ", error))
}


// Når man klikker på search knappen, så filtre den
btnForSearch.addEventListener("click", () => {
    const type = inputForType.value
    const attack = inputForAttack.value
    const name = inputForName.value

    if (type) {
        getPokemon(`http://localhost:3000/pokemon/type?type=${encodeURIComponent(type)}`)
    } else if (attack) {
        getPokemon(`http://localhost:3000/pokemon/minATK?attack=${encodeURIComponent(attack)}`)
    } else if (name) {
        getPokemon(`http://localhost:3000/pokemon/name?char=${encodeURIComponent(name)}`)
    } else {
        getPokemon("http://localhost:3000/pokemon")
    }
})

getTypes()
getPokemon("http://localhost:3000/pokemon")