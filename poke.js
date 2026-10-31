// For filtering
const btnForSearch = document.querySelector("#searchBtn")

const inputForType = document.querySelector("#typeInput")
const inputForAttack = document.querySelector("#attackInput")
const inputForName = document.querySelector("#nameInput")

// Pagination
const prevBtn = document.querySelector("#previousBtn")
const pageNumb = document.querySelector("#pageNumber")
const nextpageBtn = document.querySelector("#nextBtn")

let currentPage = 1
let pokemonprPage = 20
let pokemons = []


// for tabellen
const dataForPokemon = document.querySelector("#pokemonData")

// Tabellen over pokemon (+ pagination, since they are connected)
function getPokemon(url){
    fetch(url)
        .then(response=>response.json())
        .then(data => {
            // For pagination
            dataForPokemon.innerText = ""


            pokemons = data
            const start = (currentPage - 1) * pokemonprPage
            const end = start + pokemonprPage

            for (let i = start; i < end; i++){
                const pokemon = pokemons[i]

                const row = document.createElement("tr")

                const idCell = document.createElement("td")
                idCell.innerText = pokemon.pokedex_number
                row.appendChild(idCell)

                const pokemonCell = document.createElement("td") // Er vores img celle
                const picToPokemon = document.createElement("img") // Er hvor selve vores billede lægger i
                picToPokemon.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.pokedex_number}.png`
                picToPokemon.alt = `Picture of ${pokemon.name}`

                pokemonCell.appendChild(picToPokemon)
                row.appendChild(pokemonCell)

                const nameCell = document.createElement("td")
                nameCell.innerText = pokemon.name
                row.appendChild(nameCell)

                const priTypeCell = document.createElement("td")
                const priTypeLabel = document.createElement("span")
                priTypeLabel.innerText = pokemon.primary_type
                priTypeLabel.classList.add(pokemon.primary_type) // Gives the types a class

                priTypeCell.appendChild(priTypeLabel)
                row.appendChild(priTypeCell)

                const secTypeCell = document.createElement("td")
                if (pokemon.secondary_type){
                const secTypeLabel = document.createElement("span")
                secTypeLabel.innerText = pokemon.secondary_type
                    secTypeLabel.classList.add(pokemon.secondary_type)

                secTypeCell.appendChild(secTypeLabel)
                } // If there is a secondary type, will it get added
                row.appendChild(secTypeCell)

                const hpCell = document.createElement("td")
                hpCell.innerText = pokemon.hp
                row.appendChild(hpCell)

                const speedCell = document.createElement("td")
                speedCell.innerText = pokemon.speed
                row.appendChild(speedCell)

                const atkCell = document.createElement("td")
                atkCell.innerText = pokemon.attack
                row.appendChild(atkCell)

                const defCell = document.createElement("td")
                defCell.innerText = pokemon.defence
                row.appendChild(defCell)

                const spDefCell = document.createElement("td")
                spDefCell.innerText = pokemon.special_defence
                row.appendChild(spDefCell)

                const spAtkCell = document.createElement("td")
                spAtkCell.innerText = pokemon.special_attack
                row.appendChild(spAtkCell)

                dataForPokemon.appendChild(row)
            }

            // So it will show us the current page on our table/site
            pageNumb.innerText = currentPage

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

prevBtn.addEventListener("click",()=>{
    if (currentPage >1){
        currentPage--

        // Needed to copy paste this in again so even if we clicked next page would it keep our filters
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
    }
})

nextpageBtn.addEventListener("click", ()=>{
    if (currentPage < Math.ceil(pokemons.length/pokemonprPage)) { /* Divides how many pokemons we have in our
        database, with how many we want pr. page. Math.Ceil is so it will round up the number */
        currentPage++

        // Needed to copy paste this in again so even if we clicked next page would it keep our filters
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
    }
})

getTypes()
getPokemon("http://localhost:3000/pokemon")
