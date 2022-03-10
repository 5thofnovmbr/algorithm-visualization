import { GraphItem } from "./GraphItem.js";
import { asyncSetTimeout, wait } from "../helpers.js";

export class ArrayVisualController {
  constructor(array, targetElement, graphRatio = 7) {
    this.activeGroupIndex = 0;
    this.groups = [{ startIndex: 0, endIndex: array.length - 1 }];
    this.groupGap = 20;
    this.graphRatio = graphRatio;
    this.array = array;

    this.targetElement = targetElement;

    this.items = [];

    for (let i = 0; i < this.array.length; i++) {
      this.items[i] = new GraphItem(this.array[i], i, 0, this.graphRatio);
      this.targetElement.appendChild(this.items[i].element);
    }
  }

  async replaceItems() {
    for (let i = 0; i < this.groups.length; i++) {
      const currentGroup = this.groups[i];

      for (let j = currentGroup.startIndex; j <= currentGroup.endIndex; j++) {
        this.items
          .find((item) => item.index === j)
          .setOffset(i * this.groupGap);
      }
    }

    await wait();
  }

  sortItems() {
    this.itmes = this.items.sort(function (first, second) {
      if (first.index > second.index) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  devideGroup(startIndex, point, endIndex) {
    let tmpGroups = [];
    this.groups.map((group) => {
      if (group.startIndex === startIndex && group.endIndex === endIndex) {
        tmpGroups = tmpGroups.concat({ startIndex, endIndex: point });
        tmpGroups = tmpGroups.concat({ startIndex: point + 1, endIndex });
      } else {
        tmpGroups = tmpGroups.concat(group);
      }
    });

    console.log(tmpGroups);
    if (tmpGroups[tmpGroups.length - 1].endPoint < this.array.length - 1) {
      tmpGroups = tmpGroups.concat({
        startIndex: tmpGroups[tmpGroups.length - 1].endPoint + 1,
        endIndex: this.array.length - 1,
      });
    }
    console.log(tmpGroups);

    this.groups = [...tmpGroups];

    this.replaceItems();
    return wait();
  }

  devideGroupToHalf(startIndex, endIndex) {
    if (startIndex === endIndex) return;

    let midIndex = Math.floor((startIndex + endIndex) / 2);
    this.devideGroup(startIndex, midIndex, endIndex);
  }

  setGroups(groups) {
    this.groups = [...groups];
    this.replaceItems();
    return wait();
  }

  combineGroup(startIndexA, endIndexA, startIndexB, endIndexB) {
    let tmpGroups = [];
    this.groups.map((group) => {
      if (group.startIndex === startIndexA && group.endIndex === endIndexA) {
        tmpGroups = tmpGroups.concat({
          startIndex: startIndexA,
          endIndex: endIndexB,
        });
      } else {
        if (group.startIndex !== startIndexB && group.endIndex !== endIndexB) {
          tmpGroups = tmpGroups.concat(group);
        }
      }
    });

    this.groups = [...tmpGroups];
    this.replaceItems();
    return wait();
  }

  setArray(array) {
    this.array = [...array];

    for (let i = 0; i < this.array.length; i++) {
      this.items[i] = new GraphItem(this.array[i], i, 0, this.graphRatio);
      this.targetElement.appendChild(this.items[i].element);
    }
    this.groups = [{ startIndex: 0, endIndex: array.length - 1 }];
  }

  setItemValue(itemIndex, value) {
    this.items[itemIndex].setValue(value);
    this.array[itemIndex] = value;
    return wait();
  }

  async swapItems(i, j) {
    if (i === j) return;
    const itemI = this.items.find((item) => item.index === i);
    const itemJ = this.items.find((item) => item.index === j);
    const tmp = itemI.index;

    itemI.index = itemJ.index;
    itemJ.index = tmp;

    await this.replaceItems();
  }

  async setItemColor(itemIndex, color) {
    const target = this.items.find((item) => item.index === itemIndex);
    if (target) {
      target.setBg(color);
      await wait();
    }
  }

  setCompareItem(itemIndex) {
    this.setItemColor(itemIndex, "blue");
  }

  setFocusedItem(itemIndex) {
    this.setItemColor(itemIndex, "red");
  }

  setWinnerItem(itemIndex) {
    this.setItemColor(itemIndex, "green");
  }

  setCopyItem(itemIndex) {
    this.setItemColor(itemIndex, "orange");
  }

  setRemainingItem(itemIndex) {
    this.setItemColor(itemIndex, "skyblue");
  }

  setInactiveItem(itemIndex) {
    this.setItemColor(itemIndex, "lightGray");
  }
}
