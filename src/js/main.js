"use strict";
import { onPaginatorClickPrev, onPaginatorClickNext, onPaginatorClickNextRated, onPaginatorClickPrevRated } from './events.js'
import {createElementDetails} from "./creating.js";
let output = document.querySelector('#output');


const baseUrl ='https://api.themoviedb.org/3/';
const SearchTv = 'tv/popular?';
const apiKey = 'api_key=5701452ce6549db75dc9491e8c2d4c21&';
const topRated = 'tv/top_rated?';
const initialLanguage = 'language=en-US&';
const query = 'query=GET&page=';
let initialPage = 'page=1';


export function getTopRated(page) {
    if (!arguments[0]) page = initialPage;
    output.innerHTML = '';

    let wrapper = document.createElement('div');
    wrapper.id = 'wrapper';
    output.appendChild(wrapper);

    let title = document.createElement("h2");
    title.textContent = "Rated TV shows";
    let toPopular = document.createElement('button');
    toPopular.className = "toPopular";
    toPopular.textContent= "watch popular tv shows";
    toPopular.addEventListener('click', () => {getTvShows()});

    wrapper.appendChild(title);

    let ul = document.createElement('ul');
    wrapper.appendChild(ul);

    let url = ''.concat(baseUrl,topRated,apiKey,initialLanguage,query,page);
    fetch(url).then(response => response.json())
        .then((data)=>{
            for (let i = 0; i < data.results.length; i++ ) {
                let li = document.createElement('li');
                li.innerHTML = data.results[i].original_name;
                li.addEventListener('click',() => getShowDetails(data.results[i].id));
                ul.appendChild(li);
            }
            drawPaginator(data,[onPaginatorClickPrevRated,onPaginatorClickNextRated])
        });
    wrapper.appendChild(toPopular);
}

export function getTvShows(page) {
    if (!arguments[0]) page = initialPage;
    output.innerHTML = '';

    let wrapper = document.createElement('div');
    wrapper.id = 'wrapper';
    output.appendChild(wrapper);


    let title = document.createElement("h2");
    title.textContent = "popular TV shows";
    let toRatedTv = document.createElement('button');
    toRatedTv.className = "toRated";
    toRatedTv.textContent= "watch rated tv shows";
    toRatedTv.addEventListener('click', () => {getTopRated()});

    wrapper.appendChild(title);

    let ul = document.createElement('ul');
    wrapper.appendChild(ul);

    let url = ''.concat(baseUrl,SearchTv,apiKey,initialLanguage,query,page);
    fetch(url).then(response => response.json())
        .then((data)=>{
            JSON.stringify(data);
            for (let i = 0; i < data.results.length; i++ ) {
                let li = document.createElement('li');
                li.innerHTML = data.results[i].original_name;
                li.addEventListener('click',() => getShowDetails(data.results[i].id));
                ul.appendChild(li);
            }
            drawPaginator(data,[onPaginatorClickPrev,onPaginatorClickNext])
        });
    wrapper.appendChild(toRatedTv);
}

function createButton(className) {
    let button = document.createElement("button");
    button.className = className;
    button.textContent = className;
    return button
}

function drawPaginator (data,events) {
    let paginator = document.createElement('div');
    paginator.className = 'paginator';
    let nextButton = createButton('Next');
    nextButton.addEventListener('click', ()=>{events[1](data)});
    let prevButton = createButton('Prev');
    prevButton.addEventListener('click', ()=>{events[0](data)});
    let span = document.createElement('span');
    span.innerHTML = `${data.page}/${data.total_pages}`;

    paginator.appendChild(prevButton);
    paginator.appendChild(nextButton);
    paginator.appendChild(span);
    let wrapper = document.querySelector('#wrapper');
    wrapper.appendChild(paginator);
}

function getShowDetails(id) {
    output.innerHTML = '';

    let url = `https://api.themoviedb.org/3/tv/${id}?api_key=5701452ce6549db75dc9491e8c2d4c21&language=en-US`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
           createElementDetails(data)
        })
}

getTvShows();


