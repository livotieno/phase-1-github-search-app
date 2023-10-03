function displayInformation(gitHubUsers) {
    console.log(gitHubUsers);
    const ul = document.querySelector('#user-list')
    gitHubUsers.items.forEach(user => {
        const li = document.createElement('li')
        li.innerHTML = `
            <h4 style="color: tomato;">${user.login}</h4>
            <img src="${user.avatar_url
            }" alt="avatar" style="height: 50px; width: 50px;"><br>
            <a href="${user.url}">My GitHub</a>
        `
        ul.appendChild(li)
        li.querySelector('h4').addEventListener('click', (e) => {
            showRepos(user)
        })
    });
}

function showRepos(user) {
    //console.log(user.login);
    fetch(`https://api.github.com/users/${user.login}/repos`)
    .then(resp => resp.json())
    .then(repos => {
        const ul = document.querySelector('#repos-list')
        repos.forEach(repo => {
            console.log(repo.name)
            const li = document.createElement('li')
            li.innerHTML = repo.name
            ul.appendChild(li)
        });
    })
}

function searchGitHub(e) {
    e.preventDefault();
    const input = document.querySelector('#search').value
    fetch(`https://api.github.com/search/users?q=${input}`, {
        headers: {
            Accept: 'application/vnd.github.v3+json'
        }
    })
    .then(response => response.json())
    .then(gitHubUsers => {
        displayInformation(gitHubUsers)
    })
}




document.addEventListener('DOMContentLoaded', (e) => {
    document.querySelector('#github-form').addEventListener('submit', searchGitHub)
})