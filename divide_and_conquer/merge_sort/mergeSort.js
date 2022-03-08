import { GraphItem } from "../graph/GraphItem.js";

const list = [10, 34, 21, 12, 33, 11, 23, 9];
const graphRatio = 7;

const targetElement = document.querySelector("#mergeSort");
targetElement.style.height = `${Math.max(...list) * graphRatio + 20}px`;

class MergeSortWrapper {
  constructor(array, targetElement, graphRatio = 7) {
    this.activeGroupIndex = 0;
    this.groups = [];
    this.groupGap = 20;
    this.graphRatio = graphRatio;
    this.array = array;

    this.targetElement = targetElement;

    this.groups[0] = { startIndex: 0, endIndex: array.length - 1 };

    this.items = [];

    for (let i = 0; i < this.array.length; i++) {
      this.items[i] = new GraphItem(this.array[i], i, 0, this.graphRatio);
      this.targetElement.appendChild(this.items[i].element);
    }
  }

  onGroupChange() {
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
    console.log("current group list:", this.groups);
  }

  devideGroup(startIndex, endIndex) {
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
    console.log(tmpGroups);
    this.groups = [...tmpGroups];

    this.onGroupChange();
    return midIndex;
  }
}
const mergeSortWrapper = new MergeSortWrapper(list, targetElement, graphRatio);

async function devide() {
  let mid = 7;
  await setTimeout(() => {
    mid = mergeSortWrapper.devideGroup(0, mid);
  }, 500);

  await setTimeout(() => {
    mid = mergeSortWrapper.devideGroup(0, mid);
  }, 1000);
  await setTimeout(() => {
    mid = mergeSortWrapper.devideGroup(4, 7);
  }, 1000);
}

devide();

// const divs = [];

// for (let i = 0; i < list.length; i++) {
//   divs[i] = new GraphItem(list[i], i, 0, graphRatio);

//   targetElement.appendChild(divs[i].element);
// }

// setTimeout(() => {
//   divs[2].setIndex(1);
//   divs[1].setIndex(2);
// }, 1000);
