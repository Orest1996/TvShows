
export function createElementDetails(data) {
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
        li.addEventListener('click', () => createSeasonDetails(data,data.seasons[i], i));
        li.className = 'list-detail-item';
        ul.appendChild(li)
    }
}


export function createSeasonDetails(data, seasonDetails, id) {
    let output = document.querySelector('#output');
    output.innerHTML = '';

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
    imgContainer.innerHTML = `<img src="https://image.tmdb.org/t/p/w154/${seasonDetails.poster_path}" alt="${seasonDetails.name}"/>`;
    imgContainer.className = 'imgContainer';
    topContainer.appendChild(imgContainer);

    let description = document.createElement('div');
    if(seasonDetails.overview){
        description.textContent = seasonDetails.overview;
    } else {
        description.textContent = 'There is no description for this season'
    }
    description.className = 'description';
    topContainer.appendChild(description);

    let counters = document.createElement('div');
    counters.innerHTML = `<span>Season: ${seasonDetails.season_number}</span><span>Episodes: ${seasonDetails.episode_count}</span>`;
    counters.className = 'counters';
    containerElements.appendChild(counters);

    let ul = document.createElement('ul');
    containerElements.appendChild(ul);
    fetch(`https://api.themoviedb.org/3/tv/${data.id}/season/${id}?api_key=5701452ce6549db75dc9491e8c2d4c21`)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.episodes.length; i++) {
                let li = document.createElement('li');
                    li.textContent = data.episodes[i].name;
                    li.className = 'list-detail-item';
                    li.addEventListener('click', () => createEpisodeDetails(data.episodes[i]));
                    ul.appendChild(li)
            }
        })
}

function createEpisodeDetails(data) {
    let output = document.querySelector('#output');
    output.innerHTML = '';

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
    imgContainer.innerHTML = `<img src="https://image.tmdb.org/t/p/w154/${data.still_path}" alt="${data.name}"/>`;
    imgContainer.className = 'imgContainer';
    topContainer.appendChild(imgContainer);


    let description = document.createElement('div');
    let descriptionText = document.createElement('p');
    if(data.overview){
        descriptionText.textContent = data.overview;
    } else {
        descriptionText.textContent = 'There is no description for this season'
    }
    description.className = 'description';
    description.appendChild(descriptionText);
    topContainer.appendChild(description);

    let counters = document.createElement('div');
    counters.innerHTML = `<span>Espisode № ${data.episode_number}</span><span>Season № ${data.season_number}</span>`;
    counters.className = 'counters';
    containerElements.appendChild(counters);
}
