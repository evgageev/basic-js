const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement chainMaker object according to task description
 * 
 */
const chainMaker = {
  arr: [],
  getLength() {
    return this.arr.length;
  },
  addLink(value = '') {
    this.arr.push(`( ${value} )~~`)
    return this;
  },
  removeLink(position) {
    if ((typeof position !== 'number') || (position % 1 !== 0) || (position < 1  || position > this.arr.length)) {
      this.arr = []
      throw new Error("You can't remove incorrect link!")
    }
    this.arr.splice(position-1, 1);
    return this
  },
  reverseChain() {
    // const tempVar = this.arr[this.arr.length-2]
    // this.arr[this.arr.length-2] = this.arr[this.arr.length-1]
    // this.arr[this.arr.length-1] = tempVar

    this.arr = this.arr.reverse();
    return this;
  },
  finishChain() {
    const lastArrElem = this.arr[this.arr.length-1].slice(0, -2)
    this.arr[this.arr.length-1] = lastArrElem
    const str = this.arr.join('')
    this.arr = []
    return str
  }
};

module.exports = {
  chainMaker
};
