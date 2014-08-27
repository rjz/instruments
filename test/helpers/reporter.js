function hasName (name, entry) {
  return entry.name === name;
}

module.exports = function Reporter () {

  this.entries = [];

  this.push = this.entries.push.bind(this.entries);

  this.filterByName = function (name) {
    return this.entries.filter(hasName.bind(this, name));
  };
};

