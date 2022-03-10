import { asyncSetTimeout, wait } from "../../helpers.js";

export class MergeSorter {
  constructor(arrayVisualController, tmpArrayVisualController) {
    this.origin = arrayVisualController;
    this.tmp = tmpArrayVisualController;
    this.count = {};
    this.focusedPos = {};
  }

  async compare() {
    while (
      this.count.first <= this.focused.mid &&
      this.count.second <= this.focused.end
    ) {
      this.origin.setCompareItem(this.count.first);
      await this.origin.setCompareItem(this.count.second);

      if (
        this.origin.array[this.count.first] <=
        this.origin.array[this.count.second]
      ) {
        await this.origin.setWinnerItem(this.count.first);

        await this.tmp.setItemValue(
          this.count.result,
          this.origin.array[this.count.first]
        );

        await this.origin.setInactiveItem(this.count.first);
        this.count.result++;
        this.count.first++;
      } else {
        await this.origin.setWinnerItem(this.count.second);

        await this.tmp.setItemValue(
          this.count.result,
          this.origin.array[this.count.second]
        );

        await this.origin.setInactiveItem(this.count.second);
        this.count.result++;
        this.count.second++;
      }
    }
  }

  async moveRemainings() {
    if (this.count.first <= this.focused.mid) {
      for (
        this.count.remain = this.count.first;
        this.count.remain <= this.focused.mid;
        this.count.remain++
      ) {
        await this.origin.setRemainingItem(this.count.remain);

        await this.tmp.setItemValue(
          this.count.result,
          this.origin.array[this.count.remain]
        );

        await this.origin.setInactiveItem(this.count.remain);
        this.count.result++;
      }
    }
    if (this.count.second <= this.focused.end) {
      for (
        this.count.remain = this.count.second;
        this.count.remain <= this.focused.end;
        this.count.remain++
      ) {
        await this.origin.setRemainingItem(this.count.remain);

        await this.tmp.setItemValue(
          this.count.result,
          this.origin.array[this.count.remain]
        );

        await this.origin.setInactiveItem(this.count.remain);
        this.count.result++;
      }
    }
  }

  async copyTmpToOrizinal() {
    for (let i = this.focused.start; i <= this.focused.end; i++) {
      this.tmp.setCopyItem(i);
      await this.origin.setCopyItem(i);

      await this.origin.setItemValue(i, this.tmp.items[i].value);

      this.origin.setInactiveItem(i);
      await this.tmp.setInactiveItem(i);
    }
  }

  async merge() {
    this.count = {
      first: this.focused.start,
      second: this.focused.mid + 1,
      result: this.focused.start,
      remain: 0,
    };

    await this.compare();
    await this.moveRemainings();
    await this.copyTmpToOrizinal();
  }

  async startSort(startIndex = 0, endIndex = this.origin.array.length - 1) {
    if (startIndex !== endIndex) {
      await wait();
      await this.origin.devideGroupToHalf(startIndex, endIndex);
      const middleIndex = Math.floor((startIndex + endIndex) / 2);
      await this.startSort(startIndex, middleIndex);
      await this.startSort(middleIndex + 1, endIndex);

      this.focused = { start: startIndex, mid: middleIndex, end: endIndex };
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
