import { MergeSortGroupManager } from "./MergeSortGroupManager.js";
import { asyncSetTimeout, wait } from "../../helpers.js";

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

  const array = [10, 34, 21, 12, 33, 11, 23, 9];
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
  async function merge(array, startIndex, middleIndex, endIndex) {
    const tmpArray = [...array]; //copy

    // tmpArrayGroupManager.setGroups(mergeSortGroupManager.groups);

    let firstArrayCounter = startIndex;
    let secondArrayCounter = middleIndex + 1;
    let resultArrayCounter = startIndex;
    let remainingCounter = 0;

    while (firstArrayCounter <= middleIndex && secondArrayCounter <= endIndex) {
      mergeSortGroupManager.setActiveItem(firstArrayCounter);
      await mergeSortGroupManager.setActiveItem(secondArrayCounter);

      await wait(500);

      if (array[firstArrayCounter] <= array[secondArrayCounter]) {
        await mergeSortGroupManager.setWinnerItem(firstArrayCounter);

        await tmpArrayGroupManager.setItemValue(
          resultArrayCounter,
          array[firstArrayCounter]
        );

        await mergeSortGroupManager.setInactiveItem(firstArrayCounter);

        tmpArray[resultArrayCounter++] = array[firstArrayCounter++];
      } else {
        await mergeSortGroupManager.setWinnerItem(secondArrayCounter);

        await tmpArrayGroupManager.setItemValue(
          resultArrayCounter,
          array[secondArrayCounter]
        );

        await mergeSortGroupManager.setInactiveItem(secondArrayCounter);

        tmpArray[resultArrayCounter++] = array[secondArrayCounter++];
      }
    }

    await wait(500);

    if (firstArrayCounter <= middleIndex) {
      for (
        remainingCounter = firstArrayCounter;
        remainingCounter <= middleIndex;
        remainingCounter++
      ) {
        await mergeSortGroupManager.setRemainingItem(remainingCounter);

        await tmpArrayGroupManager.setItemValue(
          resultArrayCounter,
          array[remainingCounter]
        );

        await mergeSortGroupManager.setInactiveItem(remainingCounter);
        tmpArray[resultArrayCounter++] = array[remainingCounter];
      }
    }
    if (secondArrayCounter <= endIndex) {
      for (
        remainingCounter = secondArrayCounter;
        remainingCounter <= endIndex;
        remainingCounter++
      ) {
        await mergeSortGroupManager.setRemainingItem(remainingCounter);

        await tmpArrayGroupManager.setItemValue(
          resultArrayCounter,
          array[remainingCounter]
        );

        await mergeSortGroupManager.setInactiveItem(remainingCounter);
        tmpArray[resultArrayCounter] = array[remainingCounter];
      }
    }

    await wait(500);

    for (let i = startIndex; i <= endIndex; i++) {
      array[i] = tmpArray[i];
      tmpArrayGroupManager.setCopyItem(i, tmpArray[i]);
      await mergeSortGroupManager.setCopyItem(i, tmpArray[i]);
      await wait(500);

      await mergeSortGroupManager.setItemValue(i, tmpArray[i]);

      mergeSortGroupManager.setInactiveItem(i, tmpArray[i]);
      await tmpArrayGroupManager.setInactiveItem(i, tmpArray[i]);
      await wait(500);
    }
  }

  async function mergeSort(array, startIndex, endIndex) {
    if (startIndex !== endIndex) {
      await mergeSortGroupManager.devideGroup(startIndex, endIndex);

      const middleIndex = Math.floor((startIndex + endIndex) / 2);

      await mergeSort(array, startIndex, middleIndex);

      await mergeSort(array, middleIndex + 1, endIndex);
      await merge(array, startIndex, middleIndex, endIndex);

      await mergeSortGroupManager.combineGroup(
        startIndex,
        middleIndex,
        middleIndex + 1,
        endIndex
      );
    }
    await tmpArrayGroupManager.setGroups(mergeSortGroupManager.groups);
  }

  await mergeSort(array, 0, array.length - 1);
});
