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
            addPokemonMessage.textContent = trainerName + " caught a " + pokemonName + "!";        });
});

function loadTrainers() {
    fetch('http://localhost:3000/trainer')
        .then(res => res.json())
        .then(trainers => {
            console.log("Liste over trainers:", trainers);
        });
}

// Kører funktionen med det samme siden indlæses
loadTrainers();
