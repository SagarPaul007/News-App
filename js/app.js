const apikey = "05dac44cbf90473b972713f74ae624ab"; // don't use the same api key

// variables
let newsItem;

let newsEl = document.querySelector(".news");
let searchBtn = document.querySelector(".btn");
let bbc = document.querySelector(".bbc");
let toi = document.querySelector(".toi");
let gn = document.querySelector(".gn");
let th = document.querySelector(".th");

// events

bbc.addEventListener("click", () => {
    getNewsBySource("bbc-news");
});
toi.addEventListener("click", () => {
    getNewsBySource("the-times-of-india");
});
gn.addEventListener("click", () => {
    getNewsBySource("google-news");
});
th.addEventListener("click", () => {
    getNewsBySource("the-hindu");
});

// utility function

function useData(data) {
    newsItem = "";
    let articles = data.articles;
    articles.forEach(item => {
        let {
            title,
            description,
            content,
            url,
            urlToImage
        } = item;
        let source = item.source.name;
        newsItem += `
            <div class="item">
                <div class="item-content">
                    <h2 class="title">${title}</h2>
                    <h3 class="description">${description}</h3>
                    <h4 class="source">${source}</h4>
                    <p class="content">${content} <a
                            href="${url}">Read
                            More</a></p>
                </div>
                <div class="item-img">
                    <img src="${urlToImage}"
                        alt="">
                </div>
            </div>`;
    });

    newsEl.innerHTML = newsItem;
}

// get top headlines

function getNews() {
    fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${apikey}`).then(res => res.json()).then(data => {
        useData(data);
    });
}


// search news

searchBtn.addEventListener("click", () => {
    let q = document.querySelector(".input").value;
    fetch(`https://newsapi.org/v2/everything?q=${q}&apiKey=${apikey}`).then(res => res.json()).then(data => {
        useData(data);
    });
});

// get news by source

function getNewsBySource(source) {
    fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apikey}`).then(res => res.json()).then(data => {
        useData(data);
    });
}


// function call

getNews();
