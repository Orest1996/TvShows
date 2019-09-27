
export function createElementDetails(data) {
    console.log(data);
    let output = document.querySelector('#output');

    let containerElements = document.createElement('div');
    containerElements.className = 'containerElements';
    output.appendChild(containerElements);

    let title = document.createElement('h2');
    title.textContent = data.name;
    containerElements.appendChild(title);

    let topContainer = document.createElement('div');
    topContainer.className = 'topContainer';
    containerElements.appendChild(topContainer);

    let imgContainer = document.createElement('span');
    imgContainer.innerHTML = `<img src="https://image.tmdb.org/t/p/w154/${data.poster_path}" alt="${data.name}"/>`;
    imgContainer.className = 'imgContainer';
    topContainer.appendChild(imgContainer);


    let description = document.createElement('div');
    description.textContent = data.overview;
    description.className = 'description';
    topContainer.appendChild(description);
    
    let counters = document.createElement('div');
    counters.innerHTML = `<span>Episodes: ${data.number_of_episodes}</span><span>Seasons: ${data.number_of_seasons}</span>`;
    counters.className = 'counters';
    containerElements.appendChild(counters);

    let ul = document.createElement('ul');
    containerElements.appendChild(ul);

    for (let i = 0; i < data.seasons.length; i++) {
        let li = document.createElement('li');
        li.textContent = data.seasons[i].name;
        li.className = 'list-detail-item';
        ul.appendChild(li)
    }
}

