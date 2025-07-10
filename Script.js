const searchBox = document.querySelector(".input-box");
const searchButton = document.getElementById("search");
const photoContainer = document.querySelector(".image-container");
const showMore = document.getElementById("show-more");
const toggleContainer = document.querySelector(".toggle-container");

let page = 1;
let previousText = "";

searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (previousText === "") {
        searchPhotos(searchBox.value);
        previousText = searchBox.value;
    }
    else if (previousText !== searchBox.value){
        photoContainer.innerHTML = "";
        searchPhotos(searchBox.value);
        previousText = searchBox.value;
    }
    toggleContainer.style.display = "flex";
});

const apiUrl = "https://api.unsplash.com/search/photos?";
const apiKey = "QjsgCU6sHfNeHsrObWKc_5Zm0kXLwiRNglQrPupT1Ww";

async function searchPhotos(keyword) {
    const response = await fetch(`${apiUrl}page=${page}&query=${keyword}&client_id=${apiKey}&per_page=12`);
    const data = await response.json();

    const results = data.results;
    console.log(results);

    results.map((result) => {
        const image = document.createElement("img");
        image.classList.add("image");
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.appendChild(image);
        photoContainer.appendChild(imageLink);
    });
}

showMore.addEventListener("click", (e) => {
    page++;
    searchPhotos(searchBox.value);
});