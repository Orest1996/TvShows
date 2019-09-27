import {getTopRated, getTvShows} from "./main.js";


export function onPaginatorClickPrev(data) {
    if ((data.page <= data.total_pages) && (data.page > 0)) {
        getTvShows(data.page - 1)
    }
}

export function onPaginatorClickNext(data) {
    if (data.page < data.total_pages) {
        getTvShows(data.page + 1)
    }
}

export function onPaginatorClickNextRated(data) {
    if (data.page < data.total_pages) {
        getTopRated(data.page + 1)
    }
}

export function onPaginatorClickPrevRated(data) {
    if ((data.page <= data.total_pages) && (data.page > 0)) {
        getTopRated(data.page - 1)
    }
}
