let output = document.querySelector('#output');
console.log(output);

const baseUrl ='https://api.themoviedb.org/3/';
const SearchTv = 'search/tv?';
const apiKey = 'api_key=5701452ce6549db75dc9491e8c2d4c21&';
const initialLanguage = "language=en-US&";
const query = "query=GET&page=";
let initialPage = "page=1";

function getTvShows(page) {
    if (!arguments[0]) page = initialPage;
    output.innerHTML = '';

    let ul = document.createElement('ul');
    output.appendChild(ul);

    let url = ''.concat(baseUrl,SearchTv,apiKey,initialLanguage,query,page);
    fetch(url).then(response => response.json())
        .then((data)=>{
            JSON.stringify(data);
            for (let i = 0; i < data.results.length; i++ ) {
                let li = document.createElement('li');
                li.innerHTML = data.results[i].original_name;
                li.id = i + 1;
                ul.appendChild(li);
            }
            drawPaginator(data)
        });
}

function createButton(className) {
    let button = document.createElement("button");
    button.className = className;
    button.textContent = className;
    return button
}

function onPaginatorClickPrev(data) {
    console.log(data.page);
    if ((data.page <= data.total_pages) && (data.page > 0)) {
        getTvShows(data.page - 1)
    }
}

function onPaginatorClickNext(data) {
    console.log(data.page);
    if (data.page < data.total_pages) {
        getTvShows(data.page + 1)
    }
}

function drawPaginator (data) {
    let paginator = document.createElement('div');
    paginator.className = 'paginator';
    let nextButton = createButton('Next');
    nextButton.addEventListener('click', ()=>{onPaginatorClickNext(data)});
    let prevButton = createButton('Prev');
    prevButton.addEventListener('click', ()=>{onPaginatorClickPrev(data)});
    let span = document.createElement('span');
    span.innerHTML = `${data.page}/${data.total_pages}`;

    paginator.appendChild(prevButton);
    paginator.appendChild(nextButton);
    paginator.appendChild(span);
    output.appendChild(paginator)
}


getTvShows();


