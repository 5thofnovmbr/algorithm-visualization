export class GraphItem {
  constructor(value, index, offset = 0, ratio = 8) {
    this.index = index;
    this.offset = offset;
    this.width = 30;
    this.gap = 2;

    this.element = document.createElement("div");

    this.element.style.background = "lightGray";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = value * ratio + "px";
    this.element.style.bottom = 0;
    this.element.style.position = "absolute";
    this.element.style.transform = `translate(${index * 32}px, 0)`;

    this.element.innerHTML = value + "<br/>(" + this.index + ")";
    this.element.className = "transition rounded graph-item";
  }

  setOffset(offset) {
    this.offset = offset;
    this.element.style.transform = `translate(${
      this.offset + this.index * (this.width + this.gap)
    }px, 0)`;
    console.log(this.index, this.offset);
  }

  onIndexChange() {
    this.element.style.transform = `translate(${
      this.offset + this.index * (this.width + this.gap)
    }px, 0)`;
  }

  setIndex(index) {
    this.index = index;
    this.onIndexChange();
  }

  setBg(bgColor) {
    this.element.style.background = bgColor;
  }

  setActive() {
    this.setBg("blue");
  }

  setInactive() {
    this.setBg("lightGray");
  }
}
