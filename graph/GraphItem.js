import { wait } from "../helpers.js";

export class GraphItem {
  constructor(value, index, offset = 0, ratio = 8) {
    this.index = index;
    this.offset = offset;
    this.width = 30;
    this.gap = 2;
    this.value = value;
    this.ratio = ratio;

    this.element = document.createElement("div");

    this.element.style.background = "lightGray";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = value * this.ratio + 17 + "px";
    this.element.style.textAlign = "center";
    this.element.style.bottom = 0;
    this.element.style.position = "absolute";
    this.element.style.transform = `translate(${index * 32}px, 0)`;

    this.element.innerHTML = this.value;
    this.element.className = "transition rounded graph-item";
  }

  replaceSelf() {
    this.element.style.transform = `translate(${
      this.offset + this.index * (this.width + this.gap)
    }px, 0)`;
  }

  setOffset(offset) {
    this.offset = offset;
    this.replaceSelf();
  }

  setIndex(index) {
    this.index = index;
    this.replaceSelf();
  }

  setBg(bgColor) {
    this.element.style.background = bgColor;
  }

  setValue(value) {
    this.value = value;
    this.element.style.height = this.value * this.ratio + 17 + "px";
    this.element.innerHTML = this.value;
    this.element.style.background = "pink";
  }
}
