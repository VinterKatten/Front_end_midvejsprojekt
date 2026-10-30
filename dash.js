fetch('http://localhost:3000/pokemon/balancedStats')
.then(response => response.json())
.then(data => {
    console.log(data);

    const names = data.map(pokemon => pokemon.name);
    const differences = data.map(pokemon => pokemon.stat_difference);
    const ctx = document.getElementById('balancedChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: names,
            datasets: [{
                label: 'Stat Difference',
                data: differences
            }]
        },
        options: {
            indexAxis: 'y'
        }
    });
});

fetch('http://localhost:3000/pokemon/typeDistribution')
.then(response => response.json())
.then(data => {
    console.log(data);

    const types = data.map(pokemon => pokemon.primary_type);
    const totals = data.map(pokemon => pokemon.total);
    const ctx = document.getElementById('typeChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: types,
            datasets: [{
                label: 'Number of Pokémon',
                data: totals
            }]
        }
    });
});

fetch('http://localhost:3000/pokemon/avgAttackByType')
    .then(response => response.json())
    .then(data => {
        console.log(data);

        const types = data.map(pokemon => pokemon.primary_type);
        const attacks = data.map(pokemon => pokemon.avg_attack);
        const ctx = document.getElementById('attackChart');

        new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Average Attack by Type',
                    data: data.map((pokémon, index) => ({
                        x: pokémon.avg_attack,
                        y: index
                    }))
                }]
            },
            options: {
                scales: {
                    y: {
                        type: 'linear',
                        ticks: {
                            stepSize: 1,
                            callback: function (value) {
                                return types [value] ?? '';
                            }
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Average Attack'
                        }
                    }
                }
            }
        });
});