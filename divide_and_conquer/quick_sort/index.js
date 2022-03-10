import { QuickSortVisualController } from "./QuickSortVisualController.js";
import { QuickSorter } from "./QuickSorter.js";

const maxValue = 35;
const arrayLength = 9;
const graphRatio = 5;

const sortStartButton = document.querySelector("#sort-button");
const targetElement = document.querySelector("#sort-target");
targetElement.style.height = `${maxValue * graphRatio + 20}px`;
targetElement.style.width = `${arrayLength * 32 + 150}px`;

const codeElement = document.querySelector("#sort-code");
codeElement.innerHTML = "";

sortStartButton.addEventListener("click", async () => {
  while (targetElement.hasChildNodes()) {
    targetElement.removeChild(targetElement.firstChild);
  }

  const array = [13, 13, 25, 24, 37, 10, 22, 30];
  for (let i = 0; i < arrayLength; i++) {
    array[i] = Math.ceil(Math.random() * maxValue);
  }

  const quickSortVisualController = new QuickSortVisualController(
    array,
    targetElement,
    graphRatio
  );

  const quickSorter = new QuickSorter(quickSortVisualController);

  await quickSorter.startSort();
  console.log(quickSortVisualController.array);
});
