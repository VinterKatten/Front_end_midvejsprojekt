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