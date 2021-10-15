let resultsList;


const buttonEl = document.getElementById('search-button');
const inputEl = document.getElementById('search-input');
const resultsEl = document.getElementById('results');

buttonEl.addEventListener('click', handleClick);
inputEl.addEventListener('focus', handleReset);




function handleReset() {
    resultsEl.innerHTML = "";
}

function handleClick() {
    const userInput = inputEl.value;
    if (!userInput) return;

    fetch('/haikus/search?title=' + userInput)
        .then(response => response.json())
        .then(data => {
            resultsList = data;
            inputEl.value = ""
            render();
        });
}




function render() {
    let resultsHTML;

    if (resultsList.length) {
        resultsHTML = resultsList.map(result => {
            return `<li stytes='text-transform: capitalized'><a href="/haikus/${result._id}">${result.title} by ${result.author}</a></li>`;
        }).join('');
    } else {
        resultsHTML = '<li>Sorry No Results Found</li>'
    }

    resultsEl.innerHTML = resultsHTML;
}