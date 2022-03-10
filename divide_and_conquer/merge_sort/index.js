import { ArrayVisualController } from "./../../graph/ArrayVisualController.js";
import { MergeSorter } from "./MergeSorter.js";

const maxValue = 35;
const arrayLength = 9;
const graphRatio = 5;

const sortStartButton = document.querySelector("#sort-button");
const targetElement = document.querySelector("#sort-target");
targetElement.style.height = `${maxValue * graphRatio + 20}px`;
targetElement.style.width = `${arrayLength * 32 + 150}px`;

const tmpArrayElement = document.querySelector("#sort-tmpArray");
tmpArrayElement.style.height = `${maxValue * graphRatio + 20}px`;

const codeElement = document.querySelector("#sort-code");
codeElement.innerHTML = "";

sortStartButton.addEventListener("click", async () => {
  while (targetElement.hasChildNodes()) {
    targetElement.removeChild(targetElement.firstChild);
  }
  while (tmpArrayElement.hasChildNodes()) {
    tmpArrayElement.removeChild(tmpArrayElement.firstChild);
  }

  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = 0; i < arrayLength; i++) {
    array[i] = Math.ceil(Math.random() * maxValue);
  }

  const arrayVisualController = new ArrayVisualController(
    array,
    targetElement,
    graphRatio
  );

  const tmpArrayVisualController = new ArrayVisualController(
    [...array],
    tmpArrayElement,
    graphRatio
  );

  const mergeSorter = new MergeSorter(
    arrayVisualController,
    tmpArrayVisualController
  );

  await mergeSorter.startSort();
});
