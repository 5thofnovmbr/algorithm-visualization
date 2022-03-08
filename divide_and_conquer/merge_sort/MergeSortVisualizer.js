import { MergeSortGroupManager } from "./MergeSortGroupManager.js";
import { asyncSetTimeout, wait } from "../../helpers.js";

export class MergeSortVisualizer {
  constructor(mergeSortGroupManager, tmpArrayGroupManager) {
    this.origin = mergeSortGroupManager;
    this.tmp = tmpArrayGroupManager;
    this.counters = {};
    this.pos = [0, 0, 0];
  }

  async compare() {
    while (
      this.counters.first <= this.pos[1] &&
      this.counters.second <= this.pos[2]
    ) {
      this.origin.setActiveItem(this.counters.first);
      await this.origin.setActiveItem(this.counters.second);

      if (
        this.origin.array[this.counters.first] <=
        this.origin.array[this.counters.second]
      ) {
        await this.origin.setWinnerItem(this.counters.first);

        await this.tmp.setItemValue(
          this.counters.result,
          this.origin.array[this.counters.first]
        );

        await this.origin.setInactiveItem(this.counters.first);
        this.counters.result++;
        this.counters.first++;
      } else {
        await this.origin.setWinnerItem(this.counters.second);

        await this.tmp.setItemValue(
          this.counters.result,
          this.origin.array[this.counters.second]
        );

        await this.origin.setInactiveItem(this.counters.second);
        this.counters.result++;
        this.counters.second++;
      }
    }
  }

  async moveRemainings() {
    if (this.counters.first <= this.pos[1]) {
      for (
        this.counters.remain = this.counters.first;
        this.counters.remain <= this.pos[1];
        this.counters.remain++
      ) {
        await this.origin.setRemainingItem(this.counters.remain);

        await this.tmp.setItemValue(
          this.counters.result,
          this.origin.array[this.counters.remain]
        );

        await this.origin.setInactiveItem(this.counters.remain);
        this.counters.result++;
      }
    }
    if (this.counters.second <= this.pos[2]) {
      for (
        this.counters.remain = this.counters.second;
        this.counters.remain <= this.pos[2];
        this.counters.remain++
      ) {
        await this.origin.setRemainingItem(this.counters.remain);

        await this.tmp.setItemValue(
          this.counters.result,
          this.origin.array[this.counters.remain]
        );

        await this.origin.setInactiveItem(this.counters.remain);
        this.counters.result++;
      }
    }
  }

  async copyTmpToOrizinal() {
    for (let i = this.pos[0]; i <= this.pos[2]; i++) {
      this.tmp.setCopyItem(i);
      await this.origin.setCopyItem(i);

      await this.origin.setItemValue(i, this.tmp.items[i].value);

      this.origin.setInactiveItem(i);
      await this.tmp.setInactiveItem(i);
    }
  }

  async merge() {
    this.counters = {
      first: this.pos[0],
      second: this.pos[1] + 1,
      result: this.pos[0],
      remain: 0,
    };

    await this.compare();
    await this.moveRemainings();
    await this.copyTmpToOrizinal();
  }

  async mergeSort(startIndex = 0, endIndex = this.origin.array.length - 1) {
    if (startIndex !== endIndex) {
      await this.origin.devideGroup(startIndex, endIndex);
      const middleIndex = Math.floor((startIndex + endIndex) / 2);
      await this.mergeSort(startIndex, middleIndex);
      await this.mergeSort(middleIndex + 1, endIndex);

      this.pos = [startIndex, middleIndex, endIndex];
      await this.merge();

      await this.origin.combineGroup(
        startIndex,
        middleIndex,
        middleIndex + 1,
        endIndex
      );
    }
    await this.tmp.setGroups(this.origin.groups);
  }
}
