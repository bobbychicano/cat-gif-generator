import './styles.css';

const image = document.querySelector('img');
const randomCat = document.querySelector('.cat-button');
const searchBar = document.getElementById('search-bar');
const searchButton = document.getElementById('search-button');
const remainingChars = document.getElementById('remaining-chars');
const MAX_CHARS = 25;

//Replace with pointer events once application is complete
//'Click' and 'touch' event listeners for new cat gif button
randomCat.addEventListener('click', getGif);
randomCat.addEventListener('touchend', getGif);

//'Click' and 'touch' event listeners for search button
searchButton.addEventListener('click', newSearch);
searchButton.addEventListener('touchend', newSearch);

//I also need to implement 'enter' key functinality

searchBar.addEventListener('input', countCharacters);

//Function using async/await keywords
async function getGif() {
  try {
    const response = await fetch('https://api.giphy.com/v1/gifs/translate?api_key=R2fM03OGxksXmCZt53eKw9HwTp39uoQN&s=cats', {mode: 'cors'});

    const json = await response.json();

    image.src = json.data.images.original.url;
  } catch (error) {
    console.log("There was an error" + error);
  }
}

getGif();

//Function to use search bar
async function newSearch() {
  let saveInput = searchBar.value;

  try {
    const customQuery = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=R2fM03OGxksXmCZt53eKw9HwTp39uoQN&s=${saveInput}`, {mode: 'cors'});

    const customGif = await customQuery.json();

    image.src = customGif.data.images.original.url;
  } catch (err) {
    console.log("There was an error and we couldn't find any gifs of your search", err);
  }

  searchBar.value = '';
}

// Let's implement a small character counter under the input field
function countCharacters() {
  const remaining = MAX_CHARS - searchBar.value.length;

  remainingChars.textContent = remaining + ' characters remaining';
}
