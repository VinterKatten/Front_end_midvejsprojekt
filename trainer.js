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

            trainerList.textContent = ''; // Tømmer listen sikkert
            trainerSelect.textContent = ''; // Tømmer dropdown sikkert

            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = '-- Select a trainer --';
            trainerSelect.appendChild(defaultOption);

            trainers.forEach(trainer => {
                // Tilføj til listen under "All Trainers"
                const p = document.createElement('p');
                p.textContent = trainer.trainer_name + " - Age: " + (trainer.age || "Unknown") + " - City: " + (trainer.hometown || "Unknown");
                trainerList.appendChild(p);

                // Tilføj til dropdown-menuen
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
