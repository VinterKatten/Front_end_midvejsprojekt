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

function loadPokemon() {
    fetch('http://localhost:3000/pokemon')
        .then(res => res.json())
        .then(pokemonList => {
            const datalist = document.getElementById('pokemonDatalist');
            datalist.textContent = '';

            pokemonList.forEach(pokemon => {
                const option = document.createElement('option');
                option.value = pokemon.name;
                datalist.appendChild(option);
            });
        });
}

loadPokemon();
        });
});

const addPokemonForm = document.getElementById('createPokemonForm');
const addPokemonMessage = document.getElementById('addPokemonMessage');

addPokemonForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const trainerName = document.getElementById('assignTrainerSelect').value;
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
            const assignTrainerSelect = document.getElementById('assignTrainerSelect');

            trainerList.textContent = '';
            trainerSelect.textContent = '';
            assignTrainerSelect.textContent = '';

            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = '-- Select a trainer --';
            trainerSelect.appendChild(defaultOption);

            const assignDefaultOption = document.createElement('option');
            assignDefaultOption.value = '';
            assignDefaultOption.textContent = '-- Select a trainer --';
            assignTrainerSelect.appendChild(assignDefaultOption);

            trainers.forEach(trainer => {
                // Tilføj til listen under "All Trainers"
                const p = document.createElement('p');
                p.textContent = trainer.trainer_name + " - Age: " + (trainer.age || "Unknown") + " - City: " + (trainer.hometown || "Unknown");
                trainerList.appendChild(p);

                // Tilføj til "Trainer's Pokémon" dropdown
                const option = document.createElement('option');
                option.value = trainer.trainer_name;
                option.textContent = trainer.trainer_name;
                trainerSelect.appendChild(option);

                // Tilføj også til "Add Pokémon" dropdown
                const assignOption = document.createElement('option');
                assignOption.value = trainer.trainer_name;
                assignOption.textContent = trainer.trainer_name;
                assignTrainerSelect.appendChild(assignOption);
            });
        });
}

loadTrainers();

function loadPokemon() {
    fetch('http://localhost:3000/pokemon')
        .then(res => res.json())
        .then(pokemonList => {
            const datalist = document.getElementById('pokemonDatalist');
            datalist.textContent = '';

            pokemonList.forEach(pokemon => {
                const option = document.createElement('option');
                option.value = pokemon.name;
                datalist.appendChild(option);
            });
        });
}

loadPokemon();

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
            resultsContainer.textContent = ''; // Tømmer kassen sikkert

            if (pokemonList.length === 0) {
                const emptyMessage = document.createElement('p');
                emptyMessage.textContent = `${selectedTrainer} doesn't have any Pokémon yet.`;
                resultsContainer.appendChild(emptyMessage);
                return;
            }

            // Lav en overskrift
            const heading = document.createElement('h3');
            heading.textContent = `${selectedTrainer}'s Pokémon:`;
            resultsContainer.appendChild(heading);

            // Løb igennem hver Pokémon og vis dem sikkert
            pokemonList.forEach(pokemon => {
                const p = document.createElement('p');
                p.textContent = `#${pokemon.pokedex_number} - ${pokemon.name} (${pokemon.primary_type}${pokemon.secondary_type ? ' / ' + pokemon.secondary_type : ''})`;
                resultsContainer.appendChild(p);
            });
        });
});
