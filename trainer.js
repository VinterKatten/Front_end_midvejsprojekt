const API_BASE = 'http://localhost:3000';

const createTrainerForm = document.getElementById('createTrainerform');
const createTrainerButton = createTrainerForm.querySelector('button[type="submit"]');
const trainerMessage = document.getElementById('trainerMessage');

const addPokemonForm = document.getElementById('createPokemonForm');
const addPokemonButton = addPokemonForm.querySelector('button[type="submit"]');
const addPokemonMessage = document.getElementById('addPokemonMessage');
const pokemonNameInput = document.getElementById('PokemonName');
const pokemonDatalist = document.getElementById('pokemonDatalist');

const trainerList = document.getElementById('trainerList');
const trainerSelect = document.getElementById('trainerSelect');
const assignTrainerSelect = document.getElementById('assignTrainerSelect');
const trainerPokemonResults = document.getElementById('trainerPokemonResults');
const viewPokemonBtn = document.getElementById('viewPokemonBtn');

let currentTrainerId = null;

async function requestJson(url, options) {
    const response = await fetch(url, options);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.error || `Request failed (${response.status})`);
    }

    return data;
}

function showMessage(element, text) {
    element.textContent = text;
}

function addSelectOption(select, value, label) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    select.appendChild(option);
}

async function loadTrainers() {
    const selectedTrainer = trainerSelect.value;
    const selectedAssignTrainer = assignTrainerSelect.value;

    try {
        const trainers = await requestJson(`${API_BASE}/trainer`);

        trainerList.textContent = '';
        trainerSelect.textContent = '';
        assignTrainerSelect.textContent = '';

        addSelectOption(trainerSelect, '', '-- Select a trainer --');
        addSelectOption(assignTrainerSelect, '', '-- Select a trainer --');

        trainers.forEach((trainer) => {
            const count = Number(trainer.pokemon_count) || 0;

            const p = document.createElement('p');
            p.textContent = `${trainer.trainer_name} — Age: ${trainer.age ?? 'Unknown'} — City: ${trainer.hometown ?? 'Unknown'} — ${count} Pokémon`;
            trainerList.appendChild(p);

            addSelectOption(trainerSelect, String(trainer.trainer_id), trainer.trainer_name);
            addSelectOption(assignTrainerSelect, String(trainer.trainer_id), trainer.trainer_name);
        });

        // Keep the current selections if those trainers still exist.
        if ([...trainerSelect.options].some((option) => option.value === selectedTrainer)) {
            trainerSelect.value = selectedTrainer;
        }
        if ([...assignTrainerSelect.options].some((option) => option.value === selectedAssignTrainer)) {
            assignTrainerSelect.value = selectedAssignTrainer;
        }
    } catch (error) {
        trainerList.textContent = '';
        const p = document.createElement('p');
        p.textContent = `Could not load trainers: ${error.message}`;
        trainerList.appendChild(p);
    }
}

async function loadPokemon() {
    try {
        const pokemonList = await requestJson(`${API_BASE}/pokemon`);
        pokemonDatalist.textContent = '';

        pokemonList.forEach((pokemon) => {
            const option = document.createElement('option');
            option.value = pokemon.name;
            option.dataset.pokedexNumber = pokemon.pokedex_number;
            pokemonDatalist.appendChild(option);
        });
    } catch (error) {
        showMessage(addPokemonMessage, `Could not load Pokémon: ${error.message}`);
    }
}

function getSelectedTrainer() {
    const trainerId = Number(trainerSelect.value);
    const trainerName = trainerSelect.selectedOptions[0]?.textContent ?? '';
    return { trainerId, trainerName };
}

async function showTrainerPokemon(trainerId, trainerName) {
    currentTrainerId = trainerId;
    trainerPokemonResults.textContent = '';

    const loading = document.createElement('p');
    loading.textContent = 'Loading...';
    trainerPokemonResults.appendChild(loading);

    try {
        const pokemonList = await requestJson(
            `${API_BASE}/trainer/pokemon?trainer_id=${encodeURIComponent(trainerId)}`
        );
        trainerPokemonResults.textContent = '';

        if (pokemonList.length === 0) {
            const emptyMessage = document.createElement('p');
            emptyMessage.textContent = `${trainerName} doesn't have any Pokémon yet.`;
            trainerPokemonResults.appendChild(emptyMessage);
            return;
        }

        const heading = document.createElement('h3');
        heading.textContent = `${trainerName}'s Pokémon:`;
        trainerPokemonResults.appendChild(heading);

        pokemonList.forEach((pokemon) => {
            const p = document.createElement('p');
            const types = pokemon.secondary_type
                ? `${pokemon.primary_type} / ${pokemon.secondary_type}`
                : pokemon.primary_type;
            p.textContent = `#${pokemon.pokedex_number} - ${pokemon.name} (${types})`;
            trainerPokemonResults.appendChild(p);
        });
    } catch (error) {
        trainerPokemonResults.textContent = '';
        const p = document.createElement('p');
        p.textContent = `Could not load ${trainerName}'s Pokémon: ${error.message}`;
        trainerPokemonResults.appendChild(p);
    }
}

createTrainerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const trainerName = document.getElementById('trainerName').value.trim();
    const ageValue = document.getElementById('trainerAge').value.trim();
    const hometown = document.getElementById('trainerHometown').value.trim();

    createTrainerButton.disabled = true;
    showMessage(trainerMessage, '');

    try {
        const trainer = await requestJson(`${API_BASE}/add_trainer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                trainer_name: trainerName,
                age: ageValue === '' ? null : Number(ageValue),
                hometown: hometown
            })
        });

        showMessage(trainerMessage, `Trainer ${trainer.trainer_name} created!`);
        createTrainerForm.reset();
        await loadTrainers();

        // Make the new trainer ready to receive a Pokémon straight away.
        assignTrainerSelect.value = String(trainer.trainer_id);
    } catch (error) {
        showMessage(trainerMessage, `Could not create trainer: ${error.message}`);
    } finally {
        createTrainerButton.disabled = false;
    }
});

addPokemonForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const trainerId = Number(assignTrainerSelect.value);
    const trainerName = assignTrainerSelect.selectedOptions[0]?.textContent ?? '';
    const typedName = pokemonNameInput.value.trim();
    const pokemonOption = [...pokemonDatalist.options].find(
        (option) => option.value.toLowerCase() === typedName.toLowerCase()
    );

    if (!trainerId) {
        showMessage(addPokemonMessage, 'Please select a trainer first.');
        return;
    }
    if (!pokemonOption) {
        showMessage(addPokemonMessage, 'Please pick a Pokémon from the list.');
        return;
    }

    addPokemonButton.disabled = true;
    showMessage(addPokemonMessage, '');

    try {
        const pokemon = await requestJson(`${API_BASE}/add_pokemonToTrainer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                trainer_id: trainerId,
                pokedex_number: Number(pokemonOption.dataset.pokedexNumber)
            })
        });

        showMessage(addPokemonMessage, `${trainerName} caught a ${pokemon.pokemon_name}!`);
        pokemonNameInput.value = '';
        await loadTrainers();

        if (currentTrainerId === trainerId) {
            await showTrainerPokemon(trainerId, trainerName);
        }
    } catch (error) {
        showMessage(addPokemonMessage, `Could not add Pokémon: ${error.message}`);
    } finally {
        addPokemonButton.disabled = false;
    }
});

viewPokemonBtn.addEventListener('click', () => {
    const { trainerId, trainerName } = getSelectedTrainer();

    if (!trainerId) {
        trainerPokemonResults.textContent = '';
        const p = document.createElement('p');
        p.textContent = 'Please select a trainer first.';
        trainerPokemonResults.appendChild(p);
        return;
    }

    showTrainerPokemon(trainerId, trainerName);
});

loadTrainers();
loadPokemon();
