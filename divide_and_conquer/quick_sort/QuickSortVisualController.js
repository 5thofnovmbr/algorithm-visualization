import { ArrayVisualController } from "../../graph/ArrayVisualController.js";
import { asyncSetTimeout, wait } from "../../helpers.js";

export class QuickSortVisualController extends ArrayVisualController {
  constructor(array, targetElement, graphRatio = 7) {
    super(array, targetElement, graphRatio);

    this.pivots = [];
  }

  checkGroupValidity(groups) {
    let tmpGroups = [];

    if (groups[0].startIndex !== 0) {
      groups = [
        { startIndex: 0, endIndex: groups[0].startIndex - 1 },
        ...groups,
      ];
    }

    if (groups[groups.length - 1].endIndex !== this.array.length - 1) {
      groups = [
        ...groups,
        {
          startIndex: groups[groups.length - 1].endIndex + 1,
          endIndex: this.array.length - 1,
        },
      ];
    }

    groups.map((group, index) => {
      if (
        groups[index + 1] &&
        group.endIndex !== groups[index + 1].startIndex - 1
      ) {
        tmpGroups = tmpGroups.concat(group);

        tmpGroups = tmpGroups.concat({
          startIndex: group.endIndex + 1,
          endIndex: groups[index + 1].startIndex - 1,
        });
      } else {
        tmpGroups = tmpGroups.concat(group);
      }
    });

    return tmpGroups;
  }

  async groupPivots() {
    let tmpGroups = [];
    let i = 0;
    while (i < this.pivots.length) {
      let startIndex = this.pivots[i];

      while (this.pivots[i] + 1 === this.pivots[i + 1]) {
        i++;
      }

      let endIndex = this.pivots[i];
      tmpGroups = tmpGroups.concat({ startIndex, endIndex });

      i++;
    }

    tmpGroups = this.checkGroupValidity(tmpGroups);
    this.groups = [...tmpGroups];

    await this.replaceItems();

    console.log(this.groups);
  }

  async setPivotItem(itemIndex) {
    await this.setItemColor(itemIndex, "pink");
  }

  async setFixedItem(itemIndex) {
    await this.setItemColor(itemIndex, "gray");
  }

  async setLonelyColorItem(itemIndex, color) {
    this.items.map((item) => {
      if (item.index === itemIndex) {
        item.setBg(color);
      } else if (item.element.style.background === color) {
        item.setBg("lightgray");
      }
    });
    await wait();
  }

  async setLowItem(itemIndex) {
    await this.setLonelyColorItem(itemIndex, "skyblue");
  }

  async setHighItem(itemIndex) {
    await this.setLonelyColorItem(itemIndex, "yellow");
  }

  async setPivotItem(itemIndex) {
    await this.items.find((item) => item.index === itemIndex).setBg("pink");
  }

  async addPivot(newPivot) {
    this.pivots = [...new Set([...this.pivots, newPivot].sort())];

    await this.groupPivots();

    return wait();
  }
}
