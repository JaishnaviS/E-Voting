document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const votingForm = document.getElementById('votingForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate authentication (in real scenario, you should validate with server)
            window.location.href = 'voting.html';
        });
    }

    if (votingForm) {
        votingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const candidate = document.getElementById('candidate').value;
            // Save vote to local storage (in real scenario, you should send to server)
            let votes = JSON.parse(localStorage.getItem('votes')) || {};
            votes[candidate] = (votes[candidate] || 0) + 1;
            localStorage.setItem('votes', JSON.stringify(votes));
            alert('Vote submitted successfully!');
            window.location.href = 'results.html';
        });
    }

    const resultsCanvas = document.getElementById('resultsChart');
    if (resultsCanvas) {
        const votes = JSON.parse(localStorage.getItem('votes')) || {};
        const labels = Object.keys(votes);
        const data = labels.map(candidate => votes[candidate]);

        new Chart(resultsCanvas, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: '# of Votes',
                    data: data,
                    backgroundColor: 'rgba(0, 123, 255, 0.5)',
                    borderColor: 'rgba(0, 123, 255, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
});
