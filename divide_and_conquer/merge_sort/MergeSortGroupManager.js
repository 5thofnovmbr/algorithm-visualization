import { GraphItem } from "../../graph/GraphItem.js";
import { wait } from "../../helpers.js";

export class MergeSortGroupManager {
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

  replaceItems() {
    let currentGroupIndex = 0;
    for (let i = 0; i < this.items.length; i++) {
      if (!this.groups[currentGroupIndex]) {
        if (i < this.items.length) {
          for (let j = i; j < this.items.length; j++) {
            this.items[j].setOffset(currentGroupIndex * this.groupGap);
          }
        }
        break;
      }

      this.items[i].setOffset(currentGroupIndex * this.groupGap);

      if (this.groups[currentGroupIndex]?.endIndex === i)
        currentGroupIndex += 1;
    }
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

  devideGroup(startIndex, endIndex) {
    if (startIndex === endIndex) return;

    let midIndex = Math.floor((startIndex + endIndex) / 2);
    let tmpGroups = [];
    this.groups.map((group) => {
      if (group.startIndex === startIndex && group.endIndex === endIndex) {
        tmpGroups = tmpGroups.concat({ startIndex, endIndex: midIndex });
        tmpGroups = tmpGroups.concat({ startIndex: midIndex + 1, endIndex });
      } else {
        tmpGroups = tmpGroups.concat(group);
      }
    });
    this.groups = [...tmpGroups];

    this.replaceItems();
    return wait();
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

  setActiveItem(itemIndex) {
    this.items[itemIndex].setBg("blue");
    return wait();
  }

  setFocusedItem(itemIndex) {
    this.items[itemIndex].setBg("red");
    return wait();
  }

  setRemainingItem(itemIndex) {
    this.items[itemIndex].setBg("skyblue");
    return wait();
  }

  setWinnerItem(itemIndex) {
    this.items[itemIndex].setBg("green");
    return wait();
  }

  setCopyItem(itemIndex) {
    this.items[itemIndex].setBg("orange");
    return wait();
  }

  setInactiveItem(itemIndex) {
    this.items[itemIndex].setBg("lightGray");
    return wait();
  }
}
