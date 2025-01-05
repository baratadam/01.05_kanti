document.getElementById('user-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const usernames = document.getElementById('username').value.split(',').map(name => name.trim());
    const userDataDiv = document.getElementById('user-data');

    usernames.forEach(username => {
        // Ellenőrizzük, hogy a felhasználó már létezik-e
        if (!document.querySelector(`.user-card[data-username="${username}"]`)) {
            fetch(`https://www.codewars.com/api/v1/users/${username}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Nem létezik ilyen felhasználó: ${username}`);
                    }
                    return response.json();
                })
                .then(data => {
                    displayUserData(data);
                })
                .catch(error => {
                    alert(error.message);
                    console.error('Error:', error);
                });
        } else {
            alert(`A felhasználó már megjelenítve: ${username}`);
        }
    });
});

function displayUserData(user) {
    const userDataDiv = document.getElementById('user-data');
    const userCard = document.createElement('div');
    userCard.className = 'user-card';
    userCard.setAttribute('data-username', user.username);

    userCard.innerHTML = `
        <h2>${user.username}</h2>
        <p><strong>Név:</strong> ${user.name || 'Nincs megadva'}</p>
        <p><strong>Klán:</strong> ${user.clan || 'Nincs megadva'}</p>
        <p><strong>Nyelvek:</strong> ${(user.skills && user.skills.languages && user.skills.languages.length > 0) ? user.skills.languages.join(', ') : 'Nincs megadva'}</p>
        <p><strong>JavaScript rang:</strong> ${(user.ranks && user.ranks.languages && user.ranks.languages.javascript) ? user.ranks.languages.javascript.rank : 'Nincs megadva'}</p>
    `;
    userDataDiv.appendChild(userCard);
}
