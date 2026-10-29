const createTrainerForm = document.getElementById('createTrainerform');
const messageElement = document.getElementById('trainerMessage');

createTrainerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    messageElement.textContent = "Trainer created!";


});

