fetch('http://localhost:3000/pokemon/balancedStats')
.then(response => response.json())
.then(data => {
    console.log(data);
});

fetch('http://localhost:3000/pokemon/typeDistribution')
.then(response => response.json())
.then(data => {
    console.log(data);
});

fetch('http://localhost:3000/pokemon/avgAttackByType')
    .then(response => response.json())
    .then(data => {
        console.log(data);
});