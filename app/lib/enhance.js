String.prototype.firstUpperCase = function () {
  return this.toString()[0].toUpperCase() + this.toString().slice(1);
};
