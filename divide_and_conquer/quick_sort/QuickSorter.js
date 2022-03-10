import { asyncSetTimeout, wait } from "../../helpers.js";

export class QuickSorter {
  constructor(quickSortArrayVisualController) {
    this.origin = quickSortArrayVisualController;
  }

  async sort(startIndex, endIndex) {
    const pivot = this.origin.array[startIndex];
    await this.origin.setPivotItem(startIndex);
    await wait();

    let lowIndex = startIndex + 1;
    let highIndex = endIndex;
    let tmp = 0;
    await this.origin.setLowItem(lowIndex);
    await this.origin.setHighItem(highIndex);

    while (lowIndex <= highIndex) {
      while (lowIndex <= endIndex && this.origin.array[lowIndex] <= pivot) {
        lowIndex++;
        await this.origin.setLowItem(lowIndex);
      }
      await wait();
      await this.origin.setFocusedItem(lowIndex);
      await wait();

      while (highIndex >= startIndex && this.origin.array[highIndex] > pivot) {
        highIndex--;
        await this.origin.setHighItem(highIndex);
      }

      await wait();
      await this.origin.setFocusedItem(highIndex);
      await wait();

      if (lowIndex < highIndex) {
        tmp = this.origin.array[lowIndex];
        this.origin.array[lowIndex] = this.origin.array[highIndex];
        this.origin.array[highIndex] = tmp;

        await this.origin.swapItems(lowIndex, highIndex);
      }
      await this.origin.setInactiveItem(lowIndex);
      await this.origin.setInactiveItem(highIndex);
    }

    this.origin.array[startIndex] = this.origin.array[highIndex];
    this.origin.array[highIndex] = pivot;

    await this.origin.swapItems(startIndex, highIndex);
    await this.origin.setFixedItem(highIndex);

    return highIndex;
  }

  async startSort(startIndex = 0, endIndex = this.origin.array.length - 1) {
    if (startIndex < endIndex) {
      const pivot = await this.sort(startIndex, endIndex);

      // await this.origin.addPivot(pivot);
      await this.origin.devideGroup(startIndex, pivot, endIndex);

      await this.startSort(startIndex, pivot - 1);
      await this.startSort(pivot + 1, endIndex);

      await this.origin.combineGroup(startIndex, pivot, pivot + 1, endIndex);
    } else {
      await this.origin.setFixedItem(startIndex);
    }
  }
}
