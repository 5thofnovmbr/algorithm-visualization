import { MergeSortGroupManager } from "./MergeSortGroupManager.js";
import { MergeSortVisualizer } from "./MergeSortVisualizer.js";

const maxValue = 35;
const arrayLength = 8;
const graphRatio = 5;

const sortStartButton = document.querySelector("#mergeSort-button");
const targetElement = document.querySelector("#mergeSort");
targetElement.style.height = `${maxValue * graphRatio + 20}px`;
targetElement.style.width = `${arrayLength * 32 + 150}px`;

const tmpArrayElement = document.querySelector("#mergeSort-tmpArray");
tmpArrayElement.style.height = `${maxValue * graphRatio + 20}px`;

const codeElement = document.querySelector("#mergeSort-code");
codeElement.innerHTML = "";

sortStartButton.addEventListener("click", async () => {
  while (targetElement.hasChildNodes()) {
    targetElement.removeChild(targetElement.firstChild);
  }
  while (tmpArrayElement.hasChildNodes()) {
    tmpArrayElement.removeChild(tmpArrayElement.firstChild);
  }

  const array = [1, 2, 3, 4, 5, 6, 7, 8];
  for (let i = 0; i < arrayLength; i++) {
    array[i] = Math.ceil(Math.random() * maxValue);
  }

  const mergeSortGroupManager = new MergeSortGroupManager(
    array,
    targetElement,
    graphRatio
  );

  const tmpArrayGroupManager = new MergeSortGroupManager(
    [...array],
    tmpArrayElement,
    graphRatio
  );

  const mergeSorter = new MergeSortVisualizer(
    mergeSortGroupManager,
    tmpArrayGroupManager
  );

  await mergeSorter.mergeSort();
});
