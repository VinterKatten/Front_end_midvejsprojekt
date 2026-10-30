const createTrainerForm = document.getElementById('createTrainerform');
const messageElement = document.getElementById('trainerMessage');

createTrainerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // 1. Trækker værdierne ud fra alle 3 felter
    const trainerName = document.getElementById('trainerName').value;
    const trainerAge = document.getElementById('trainerAge').value;
    const trainerHometown = document.getElementById('trainerHometown').value;
    // 2. Sender alle 3 værdier afsted i body
    fetch('http://localhost:3000/add_trainer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            trainer_name: trainerName,
            age: trainerAge,
            hometown: trainerHometown
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log("Svar fra serveren:", data);
            messageElement.textContent = "Trainer created!";
            loadTrainers();
        });
});

const addPokemonForm = document.getElementById('createPokemonForm');
const addPokemonMessage = document.getElementById('addPokemonMessage');

addPokemonForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const trainerName = document.getElementById('assignTrainerName').value;
    const pokemonName = document.getElementById('PokemonName').value;

    console.log("Add", pokemonName, "to", trainerName);

    fetch('http://localhost:3000/add_pokemonToTrainer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            trainer_name: trainerName,
            pokemon_name: pokemonName
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log("Answer from server:", data);
            addPokemonMessage.textContent = trainerName + " caught a " + pokemonName + "!";
        });
});

function loadTrainers() {
    fetch('http://localhost:3000/trainer')
        .then(res => res.json())
        .then(trainers => {
            const trainerList = document.getElementById('trainerList');
            const trainerSelect = document.getElementById('trainerSelect');

            trainerList.innerHTML = ''; // Tømmer listen først, så der ikke kommer dubletter
            trainerSelect.innerHTML = '<option value="">-- Select a trainer --</option>';

            trainers.forEach(trainer => {
                const option = document.createElement('option');
                option.value = trainer.trainer_name;
                option.textContent = trainer.trainer_name;
                trainerSelect.appendChild(option);
            });
        });
}

loadTrainers();

const viewPokemonBtn = document.getElementById('viewPokemonBtn');
const trainerSelect = document.getElementById('trainerSelect');

viewPokemonBtn.addEventListener('click', () => {
    const selectedTrainer = trainerSelect.value;

    if (!selectedTrainer) {
        alert("Please select a trainer first!");
        return;
    }

    // Kald backend med den valgte træner
    fetch(`http://localhost:3000/trainer/pokemon?trainer=${encodeURIComponent(selectedTrainer)}`)
        .then(res => res.json())
        .then(pokemonList => {
            const resultsContainer = document.getElementById('trainerPokemonResults');
            resultsContainer.innerHTML = ''; // Tøm kassen først
            if (pokemonList.length === 0) {
                resultsContainer.innerHTML = `<p>${selectedTrainer} has no Pokémon yet.</p>`;
                return;
            }
            // Lav en overskrift
            resultsContainer.innerHTML = `<h3>${selectedTrainer}'s Pokémon:</h3>`;
            // Løb igennem hver Pokémon og vis dem
            pokemonList.forEach(pokemon => {
                const p = document.createElement('p');
                p.textContent = `#${pokemon.pokedex_number} - ${pokemon.name} (${pokemon.primary_type}${pokemon.secondary_type ? ' / ' + pokemon.secondary_type : ''})`;
                resultsContainer.appendChild(p);
            });
        });
});
