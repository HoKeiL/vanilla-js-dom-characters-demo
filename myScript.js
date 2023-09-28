//Modern browsers support ES5 modules with import/export as normal
import { getElementByIdOrFail } from "./utils.js";
// import { characters } from "./characters.js";
// import { antiHeroes } from "./antiheroes.js";

const myButton = getElementByIdOrFail("myButton1");
const focusedCharacterPara = getElementByIdOrFail("focusedCharacterPara");
const myList = getElementByIdOrFail("charactersUL");

myButton.addEventListener("click", () => {
  const searchTerm = prompt("input search term");
  focusedCharacterPara.outerHTML = "You said: " + searchTerm;
});

async function fetchEpisodes() {
  const url = "https://api.tvmaze.com/shows/83/episodes";
  const response = await fetch(url);
  const episodes = await response.json();

  return episodes;
}
let episodes = await fetchEpisodes();

function makeLiElementsForCharacters() {
  return episodes.map((episode) => {
    //Not yet attached to any point in the DOM tree
    const element = document.createElement("li");
    element.innerHTML =
      episode.name +
      " from  season" +
      episode.season +
      " episode " +
      episode.number;

    element.addEventListener("click", () => {
      alert(episode.summary);
    });
    element.addEventListener("mouseover", () => {
      focusedCharacterPara.innerText = episode.name + ": " + episode.summary;
    });

    return element;
  });
}
const characterLiElements = makeLiElementsForCharacters();

for (const li of characterLiElements) {
  myList.appendChild(li);
}
